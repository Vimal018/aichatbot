// import axios from "axios";
// export const loginUser = async (email: string, password: string) => {
//   const res = await axios.post("/user/login", { email, password });
//   if (res.status !== 200) {
//     throw new Error("Unable to login");
//   }
//   const data = await res.data;
//   return data;
// };

// export const signupUser = async (
//   name: string,
//   email: string,
//   password: string
// ) => {
//   const res = await axios.post("/user/signup", { name, email, password });
//   if (res.status !== 201) {
//     throw new Error("Unable to Signup");
//   }
//   const data = await res.data;
//   return data;
// };

// export const checkAuthStatus = async () => {
//   const res = await axios.get("/user/auth-status");
//   if (res.status !== 200) {
//     throw new Error("Unable to authenticate");
//   }
//   const data = await res.data;
//   return data;
// };

// export const sendChatRequest = async (message: string) => {
//   const res = await axios.post("/chat/new", { message });
//   if (res.status !== 200) {
//     throw new Error("Unable to send chat");
//   }
//   const data = await res.data;
//   return data;
// };

// export const getUserChats = async () => {
//   const res = await axios.get("/chat/all-chats");
//   if (res.status !== 200) {
//     throw new Error("Unable to send chat");
//   }
//   const data = await res.data;
//   return data;
// };

// export const deleteUserChats = async () => {
//   const res = await axios.delete("/chat/delete");
//   if (res.status !== 200) {
//     throw new Error("Unable to delete chats");
//   }
//   const data = await res.data;
//   return data;
// };

// export const logoutUser = async () => {
//   const res = await axios.get("/user/logout");
//   if (res.status !== 200) {
//     throw new Error("Unable to delete chats");
//   }
//   const data = await res.data;
//   return data;
// };


import axios from "axios";

// Set the base URL (Ensure you set this according to your environment)
axios.defaults.baseURL = import.meta.env.VITE_API_URL || "http://localhost:5000/api/v1";

// Login user
export const loginUser = async (email: string, password: string) => {
  try {
    const { data } = await axios.post("/user/login", { email, password }, { withCredentials: true });  // Include credentials if needed
    return data;  // Return data directly
  } catch (error: any) {
    // Throw error with proper message if status isn't 200
    throw new Error(error.response?.data?.message || "Unable to login");
  }
};

// Signup user
export const signupUser = async (name: string, email: string, password: string) => {
  try {
    const { data } = await axios.post("/user/signup", { name, email, password }, { withCredentials: true });  // Include credentials if needed
    return data;  // Return data directly
  } catch (error: any) {
    // Throw error with proper message if status isn't 201
    throw new Error(error.response?.data?.message || "Unable to sign up");
  }
};

// Check authentication status
export const checkAuthStatus = async () => {
  try {
    const { data } = await axios.get("/user/auth-status", { withCredentials: true });  // Ensure you send cookies (if needed)
    return data;  // Return data directly
  } catch (error: any) {
    // Throw error if the request fails
    throw new Error(error.response?.data?.message || "Unable to authenticate");
  }
};

// Send chat request
export const sendChatRequest = async (message: string) => {
  try {
    const { data } = await axios.post("/chat/new", { message }, { withCredentials: true });  // Include credentials if needed
    return data;  // Return data directly
  } catch (error: any) {
    // Throw error if the status isn't 200
    throw new Error(error.response?.data?.message || "Unable to send chat");
  }
};

// Get user chats
export const getUserChats = async () => {
  try {
    const { data } = await axios.get("/chat/all-chats", { withCredentials: true });  // Include credentials if needed
    return data;  // Return data directly
  } catch (error: any) {
    // Throw error if the status isn't 200
    throw new Error(error.response?.data?.message || "Unable to retrieve chats");
  }
};

// Delete user chats
export const deleteUserChats = async () => {
  try {
    const { data } = await axios.delete("/chat/delete", { withCredentials: true });  // Include credentials if needed
    return data;  // Return data directly
  } catch (error: any) {
    // Throw error if the status isn't 200
    throw new Error(error.response?.data?.message || "Unable to delete chats");
  }
};

// Logout user
export const logoutUser = async () => {
  try {
    const { data } = await axios.post("/user/logout", {}, { withCredentials: true });
 // Include credentials if needed
    return data;  // Return data directly
  } catch (error: any) {
    // Provide a more appropriate error message
    throw new Error(error.response?.data?.message || "Unable to logout");
  }
};
