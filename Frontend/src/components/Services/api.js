// import axios from "axios"

// const API_URL = "http://localhost:5000/api"

// // Create axios instance
// const api = axios.create({
//   baseURL: API_URL,
//   headers: {
//     "Content-Type": "application/json",
//   },
// })

// // Add request interceptor to add auth token to requests
// api.interceptors.request.use(
//   (config) => {
//     const token = localStorage.getItem("token")
//     if (token) {
//       config.headers.Authorization = `Bearer ${token}`
//     }
//     return config
//   },
//   (error) => Promise.reject(error),
// )

// // Auth services
// export const authService = {
//   register: (userData) => api.post("/auth/register", userData),
//   login: (credentials) => api.post("/auth/login", credentials),
// }

// // User services
// export const userService = {
//   getCurrentUser: () => api.get("/users/me"),
//   getUserByUsername: (username) => api.get(`/users/${username}`),
//   updateUserProfile: (userData) => api.put("/users", userData),
//   uploadProfileImage: (formData) => {
//     return api.put("/users/profile-image", formData, {
//       headers: {
//         "Content-Type": "multipart/form-data",
//       },
//     })
//   },
// }

// export default api
