import axios from "axios";
import { apiRequestAxios } from "./api";
import { API_ENDPOINTS } from "../config/api.config";

export const loginUser = async (form) => {
    const { username, password } = form;

    try {
        const response = await axios.post(
            "/login",
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

    const requestsEndpoint = isAdmin
        ? API_ENDPOINTS.ADMIN_LEAVE_REQUESTS
        : API_ENDPOINTS.LEAVE_REQUESTS;

    const historyEndpoint = isAdmin
        ? API_ENDPOINTS.ADMIN_LEAVE_REQUESTS_HISTORY
        : API_ENDPOINTS.LEAVE_REQUESTS_HISTORY;

    const pending = await apiRequestAxios({
        endpoint: requestsEndpoint,
        method: 'GET',
    });

    let leave = pending.data.data.find(leave => leave._id === id);

    if (!leave) {
        const history = await apiRequestAxios({
            endpoint: historyEndpoint,
            method: 'GET',
        });
        leave = history.data.data.find(leave => leave._id === id);
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
    const res = await apiRequestAxios({
        endpoint: API_ENDPOINTS.PROFILE,
        method: 'GET',
    })

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