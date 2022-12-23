import axiosClient from "./axiosClient";

const userApi = {
  getAllUsers: async () => {
    return await (
      await axiosClient.get("/Users")
    ).data;
  },
  getUser: async (id: string) => {
    return await axiosClient.get(`/Users/${id}`);
  },
  delete: async (id: string) => {
    return await axiosClient.delete(`/Users/${id}`);
  },
};

export default userApi;
