import toast from "react-hot-toast";


export const showSuccessToast = (message) => {
    toast.success(message, {
        style: {
            background: "#fff",
            color: "#333",
            border: "1px solid #3b82f6",
            padding: "12px 18px",
            fontWeight: 500,
            boxShadow: "0 4px 6px rgba(59, 130, 246, 0.3)",
        },
        iconTheme: {
            primary: "#3b82f6",
            secondary: "#fff",
        },
        duration: 1250,
    });
};


export const showErrorToast = (message) => {
    toast.error(message, {
        style: {
            background: "#fff",
            color: "#1c1c1c",
            border: "1px solid #ef4444",
            padding: "12px 18px",
            boxShadow: "0 4px 6px rgba(239, 68, 68, 0.3)",
            fontWeight: 500,
        },
        iconTheme: {
            primary: "#ef4444",
            secondary: "#fff",
        },
        duration: 1250,
    });
};
