import axiosClient from "./axiosClient";

const commentApi = {
  getList: async (id: string) => {
    return await (
      await axiosClient.get(`/Blog/${id}/Comment`)
    ).data;
  },
  //   getOne: async (id: string) => {
  //     return await (
  //       await axiosClient.get(`/Blogs/${id}`)
  //     ).data;
  //   },
};

export default commentApi;
