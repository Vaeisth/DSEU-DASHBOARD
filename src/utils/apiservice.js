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
    const pending = await apiRequestAxios({
        endpoint: API_ENDPOINTS.LEAVE_REQUESTS,
        method: 'GET',
    });

    let leave = pending.data.data.find(leave => leave._id === id);

    if (!leave) {
        const history = await apiRequestAxios({
            endpoint: API_ENDPOINTS.LEAVE_REQUESTS_HISTORY,
            method: 'GET',
        });
        leave = history.data.data.find(leave => leave._id === id);
    }

    if (!leave) throw new Error("Leave request not found");

    return leave;
};

export const approveLeave = async (id) => {
    const { data } = await apiRequestAxios({
        endpoint: `${API_ENDPOINTS.LEAVE_REQUEST_APPROVE}/${id}`,
        method: 'PATCH',
        data: { id }
    });
    return data;
};
export const rejectLeave = async ({ id, remarks }) => {
    const { data } = await apiRequestAxios({
        endpoint: `${API_ENDPOINTS.LEAVE_REQUEST_REJECT}/${id}?remarks=${encodeURIComponent(remarks)}`,
        method: 'PATCH',
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