import axios from "axios";
import { apiRequest, apiRequestAxios } from "./api";
import { API_BASE_URL, API_ENDPOINTS } from "../config/api.config";

export const loginUser = async (form) => {
    const { username, password } = form;

    try {
        const response = await axios.post(
            `${API_BASE_URL}/login`,
            {
                username,
                password,
            },
            {
                headers: {
                    "Content-Type": "application/x-www-form-urlencoded",
                },
            }
        );
        return response.data;
    } catch (error) {
        const errorMessage =
            error.response?.data?.detail ||
            error.response?.data?.message ||
            error.message ||
            "An unexpected error occurred";
        throw new Error(errorMessage);
    }
};


export const fetchHolidays = async () => {
    const response = await apiRequestAxios({
        endpoint: API_ENDPOINTS.HOLIDAY_CALENDAR,
        method: 'GET'
    });
    return response.data;
};

export const fetchPendingLeaves = async () => {
    const { data } = await apiRequestAxios({
        endpoint: API_ENDPOINTS.LEAVE_REQUESTS,
        method: 'GET'
    });
    return data.data;
};

export const fetchLeaveDetails = async (id) => {
    const role = sessionStorage.getItem("currentRole");
    const isAdmin = role === "admin";

    let requestsEndpoint;
    let historyEndpoint;

    if (isAdmin) {
        requestsEndpoint = API_ENDPOINTS.ADMIN_LEAVE_REQUESTS;
        historyEndpoint = API_ENDPOINTS.ADMIN_LEAVE_REQUESTS_HISTORY;
    } else if (role === "employee") {
        requestsEndpoint = API_ENDPOINTS.EMPLOYEE_PENDING_APPROVALS;
        historyEndpoint = API_ENDPOINTS.EMPLOYEE_LEAVE_HISTORY;
    } else {
        requestsEndpoint = API_ENDPOINTS.LEAVE_REQUESTS;
        historyEndpoint = API_ENDPOINTS.LEAVE_REQUESTS_HISTORY;
    }

    const pending = await apiRequestAxios({
        endpoint: requestsEndpoint,
        method: 'GET',
    });

    let leaves = Array.isArray(pending.data) ? pending.data :
        (pending.data?.data && Array.isArray(pending.data.data)) ? pending.data.data : [];

    let leave = leaves.find(leave => leave._id === id);

    if (!leave) {
        const history = await apiRequestAxios({
            endpoint: historyEndpoint,
            method: 'GET',
        });

        leaves = Array.isArray(history.data) ? history.data :
            (history.data?.data && Array.isArray(history.data.data)) ? history.data.data : [];

        leave = leaves.find(leave => leave._id === id);
    }

    if (!leave) throw new Error("Leave request not found");

    return leave;
};



export const approveLeave = async (id) => {
    const role = sessionStorage.getItem("currentRole");
    const endpoint = role === "admin"
        ? `${API_ENDPOINTS.APPROVE_LEAVE_ADMIN}/${id}`
        : `${API_ENDPOINTS.LEAVE_REQUEST_APPROVE}/${id}`;

    const method = role === "admin"
        ? "POST"
        : "PATCH";

    const { data } = await apiRequestAxios({
        endpoint,
        method,
        data: { id },
    });

    return data;
};


export const rejectLeave = async ({ id, remarks }) => {
    const role = sessionStorage.getItem("currentRole");
    const endpoint = role === "admin"
        ? `${API_ENDPOINTS.REJECT_LEAVE_ADMIN}/${id}?remarks=${encodeURIComponent(remarks)}`
        : `${API_ENDPOINTS.LEAVE_REQUEST_REJECT}/${id}?remarks=${encodeURIComponent(remarks)}`;

    const method = role === "admin"
        ? "POST"
        : "PATCH";

    const { data } = await apiRequestAxios({
        endpoint,
        method,
    });

    return data;
};


export const fetchLeaves = async (type) => {
    const endpoint =
        type === "pending"
            ? API_ENDPOINTS.LEAVE_REQUESTS
            : API_ENDPOINTS.LEAVE_REQUESTS_HISTORY;

    const { data } = await apiRequestAxios({
        endpoint,
        method: 'GET'
    });

    return data.data;
};

export const fetchAllEmployees = async () => {
    const { data } = await apiRequestAxios({
        endpoint: API_ENDPOINTS.ALL_USERS,
        method: "GET",
    });
    return data?.data || [];
};

export const updateProfileImage = async (formData) => {
    const res = await apiRequestAxios({
        endpoint: API_ENDPOINTS.UPLOAD_IMAGE,
        method: 'POST',
        data: formData,
        headers: {
            "Content-Type": "multipart/form-data",
        },
    })

    return res.data;
}

export const getProfile = async () => {
    const role = sessionStorage.getItem("currentRole");

    const res = await apiRequestAxios({
        endpoint: role === "inventory_admin" || role === "icadmin" ? API_ENDPOINTS.GET_CURRENT_USER : API_ENDPOINTS.PROFILE,
        method: 'GET',
    })

    // console.log(res.data);

    return res.data;
}

export const fetchLeavesAdmin = async (type) => {
    const endpoint =
        type === "pending"
            ? API_ENDPOINTS.ADMIN_LEAVE_REQUESTS
            : API_ENDPOINTS.ADMIN_LEAVE_REQUESTS_HISTORY;

    const { data } = await apiRequestAxios({
        endpoint,
        method: 'GET'
    });

    return data.data;
};

export const getActiveHours = async () => {
    const res = await apiRequestAxios({
        endpoint: API_ENDPOINTS.TOTAL_DURATION,
        method: 'GET',
    });

    return res.data;
}

export const fetchLeavesEmployee = async (type) => {
    const endpoint =
        type === "pending"
            ? API_ENDPOINTS.EMPLOYEE_PENDING_APPROVALS
            : API_ENDPOINTS.EMPLOYEE_LEAVE_HISTORY;

    const { data } = await apiRequestAxios({
        endpoint,
        method: 'GET'
    });


    if (Array.isArray(data)) {
        return data;
    }

    if (data?.data && Array.isArray(data.data)) {
        return data.data;
    }

    return [];
};


export const fetchAnnouncements = async () => {
    const role = sessionStorage.getItem("currentRole");

    const endpoint =
        role === "super_admin"
            ? API_ENDPOINTS.ALL_ANNOUNCEMENTS
            : API_ENDPOINTS.ADMIN_ANNOUNCEMENT;

    const response = await apiRequest(endpoint);
    if (!response.ok) {
        throw new Error("Failed to fetch announcements");
    }

    return response.json();
};


export const getCurrentUser = async () => {
    return apiRequestAxios({
        endpoint: API_ENDPOINTS.GET_CURRENT_USER,
        method: 'GET',
    })
}

export const createStock = async (formData) => {
    return apiRequestAxios({
        endpoint: API_ENDPOINTS.CREATE_STOCK,
        method: 'POST',
        data: formData,
        headers: { "Content-Type": "application/json" }
    })
}

export const getAllStocks = async () => {
    const res = apiRequestAxios({
        endpoint: API_ENDPOINTS.GET_ALL_STOCK,
        method: 'GET'
    });

    return (await res).data;
}

export const getStockByGemID = async (gemId) => {
    const res = apiRequestAxios({
        endpoint: `${API_ENDPOINTS.GET_STOCK_BY_GEM_ID}/${gemId}`,
        method: 'GET',
    })

    const data = await res;
    return data.data;
}

export const getAllIssuedItems = async () => {
    const res = apiRequestAxios({
        endpoint: API_ENDPOINTS.GET_ALL_ISSUED_ITEMS,
        method: 'GET',
    })

    const data = await res;
    return data.data;
}

//? All incoming requests of college inventory to 
export const getVcAllRequests = async () => {
    const res = apiRequestAxios({
        endpoint: API_ENDPOINTS.VC_ALL_REQUESTS,
        method: 'GET'
    });

    const data = await res;
    return data.data;
}

//? Approve leave 
export const issueStockItems = async (requestId) => {
    const res = apiRequestAxios({
        endpoint: `${API_ENDPOINTS.ISSUE_ITEMS_BY_REQUEST_ID}/${requestId}`,
        method: 'POST'
    });

    return res;
}