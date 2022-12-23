import axiosClient from "./axiosClient";

const reportApi = {
  getList: async ({ statuses }) => {
    const res = await axiosClient.get(`/Reports?${statuses.map((n, _) => `statuses=${n}`).join("&")}`);
    return res.data;
  },
  delete: async (id: string) => {
    return await axiosClient.put(`/Reports/${id}`, { status: "CANCELLED" });
  },
  getOne: async (id: string) => {
    return await (
      await axiosClient.get(`/Reports/${id}`)
    ).data;
  },
  updateStatus: async (id: string, status: string) => {
    return await axiosClient.put(`/Reports/${id}`, { status: status });
  },
};

export default reportApi;
