import axiosClient from "./axiosClient";

const tagApi = {
  getList: async () => {
    return await (
      await axiosClient.get(`/Tags?page=1&pageSize=20`)
    ).data;
  },
  create: async (title: string) => {
    return await (
      await axiosClient.post("/Tags", { title: title })
    ).data;
  },
};

export default tagApi;
