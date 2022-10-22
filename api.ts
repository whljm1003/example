import axios, { AxiosError } from "axios";

export interface Post {
  data: any[];
  page: number;
  per_page: number;
  support: {
    url: string;
  };
  total: number;
  total_pages: number;
}

const BASE_URL = "https://reqres.in/api";

export const post = (method: string, url: string) => {
  return axios({
    method: method,
    url: `${BASE_URL}${url}`,
  }).then((res) => res.data);
};
// export const post = (method: string, url: string) => {
//   return axios({
//     method: method,
//     url: `${BASE_URL}${url}`,
//   }).then((res) => res.data);
// };

// get => getApi / isTokenGetApi
// put => postApi / isTokenPostApi
// put => isTokenPutApi
//delete => isTokenDeleteApi
