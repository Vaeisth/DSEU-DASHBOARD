import { API_ENDPOINTS } from "../../config/api.config";
import { apiRequestAxios } from "../../utils/api";

export const markOnDuty = (remarks) => {
  return apiRequestAxios({
    endpoint: 'http://209.38.121.22:8081/attendance/on_duty',
    method: "PUT",
    data: { remarks },
  });
};

export const getLeaveRequest = () => {
  return apiRequestAxios({
    endpoint: API_ENDPOINTS.ADMIN_LEAVE_REQUESTS,
    method: 'GET'
  });
}

export const getOnDutyEmployees = () => {
  return apiRequestAxios({
    endpoint: API_ENDPOINTS.ADMIN_ON_DUTY,
    method: 'GET'
  })
}