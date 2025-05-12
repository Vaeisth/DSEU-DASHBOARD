import axios from "axios";

export const loginUser = async (form) => {
    const { username, password } = form;

    try {
        const response = await axios.post(
            "/login",
            new URLSearchParams({
                username: username,
                password: password,
            }),
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