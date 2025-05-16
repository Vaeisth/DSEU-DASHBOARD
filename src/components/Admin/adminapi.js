import { apiRequestAxios } from "../../utils/api";

export const markOnDuty = (remarks) => {
  return apiRequestAxios({
    endpoint: 'http://68.183.89.54:8081//attendance/on_duty',
    method: "PUT",
    data: { remarks },
  });
};