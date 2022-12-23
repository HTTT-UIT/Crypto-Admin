import axiosClient from "./axiosClient";

const authApi = {
  //   login: async ({ email, password }: any) => {
  //     const {
  //       data: { data, accessToken },
  //     } = await axiosClient.post(url + "/login", { email, password });
  //     return { user: data, accessToken };
  //   },
  //   authenticate: async (accessToken: string) => {
  //     const {
  //       data: { data },
  //     } = await axiosClient.get(url, {
  //       headers: {
  //         Authorization: `Bearer ${accessToken}`,
  //       },
  //     });
  //     return { user: data };
  //   },
  register: async ({ userName, password }) => {
    const data = await axiosClient.post("/identity/signup", { userName, password });
    return data;
  },
  login: ({ userName, password }) => {
    const res = axiosClient.post("/identity/login", { userName, password });
    return res;
  },
  //   updatePassword: async ({ idCompany, password, newPassword }: any) => {
  //     const {
  //       data: { data, accessToken },
  //     } = await axiosClient.patch(`${url}/password/${idCompany}`, { password, newPassword });
  //     return { user: data, accessToken };
  //   },
  //   updateCompany: async ({ idCompany, company }: any) => {
  //     const {
  //       data: { data },
  //     } = await axiosClient.patch(`${url}/${idCompany}`, company);
  //     return { user: data };
  //   },
};

export default authApi;
