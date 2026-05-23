import axios from "axios";

export const baseURL = import.meta.env.VITE_API_URL || "http://localhost:8080";

export const axiosInstance = axios.create({
    baseURL: baseURL,
    withCredentials: true, // Enable cookie support
});

// Axios Interceptor for Authorization Header
axiosInstance.interceptors.request.use((config) => {
    const token = localStorage.getItem("token");
    config.headers = config.headers || {};
    if (token) {
        config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
}, (error) => {
    return Promise.reject(error);
});

export const generateResume = async (description) => {
    const response = await axiosInstance.post("/api/v1/resume/generate", {
         userDescription: description,
    });
    return response.data;
};

export const trackAnalytics = async (action, metadata = {}) => {
    try {
        // Send metadata directly, rely on backend body parser limits
        const safeMetadata = metadata || {};
        
        await axiosInstance.post("/api/v1/analytics", {
            action,
            metadata: safeMetadata
        });
    } catch (err) {
        console.error("Failed to track analytics:", err);
    }
};

export const saveResumeToDB = async (resumeData, atsScore) => {
    const response = await axiosInstance.post("/api/v1/resume/save", {
        data: resumeData,
        atsScore
    });
    return response.data;
};

export const listUserResumes = async () => {
    const response = await axiosInstance.get("/api/v1/resume/list");
    return response.data;
};
