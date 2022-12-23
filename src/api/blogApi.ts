import axiosClient from "./axiosClient";

const blogApi = {
  getList: async ({ page, pageSize, authorId, admin }) => {
    if (admin == "admin") {
      return await axiosClient.get("/Blogs", {
        params: {
          page: page,
          pageSize: pageSize,
        },
      });
    } else {
      return await axiosClient.get("/Blogs", {
        params: {
          page: page,
          pageSize: pageSize,
          authorId: authorId,
        },
      });
    }
  },
  getOne: async (id: string) => {
    return await (
      await axiosClient.get(`/Blogs/${id}`)
    ).data;
  },
  create: async ({ title, content, authorID, tagIDs }) => {
    return await axiosClient.post(
      "/Blogs",
      {
        title: title,
        content: content,
        authorId: authorID,
        tagIds: tagIDs,
        status: 0,
      },
      {
        headers: {
          "content-type": "multipart/form-data",
        },
      },
    );
  },
  delete: (id: string) => {
    return axiosClient.delete(`/Blogs/${id}`);
  },
  update: async ({ id, header, content, authorID, tagIDs }) => {
    return await axiosClient.put(
      `/Blogs`,
      { id, header, content, authorID, tagIDs },
      {
        headers: {
          "content-type": "multipart/form-data",
        },
      },
    );
  },
};

export default blogApi;
