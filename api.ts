import axios, { AxiosError } from "axios";

// const BASE_URL = "https://test-api.entizen.kr";
const BASE_URL = "api";
const REFRESH_URL = `${BASE_URL}/auth/token`;

// const ACCESS_TOKEN = JSON.parse(localStorage.getItem("ACCESS_TOKEN")!);
// const REFRESH_TOKEN = JSON.parse(localStorage.getItem("REFRESH_TOKEN")!);

const instance = axios.create({
  baseURL: BASE_URL,
  headers: {
    "content-type": "application/json;charset=UTF-8",
    accept: "application/json,",
  },
  withCredentials: true,
});

instance.interceptors.request.use((config) => {
  if (!config.headers) return config;
  console.log(`⭐️ line: 56, ⭐️ error: ${config}`);

  let token: string | null = null;
  if (config.url === REFRESH_URL) {
    // refresh token 일 경우
    token = localStorage.getItem("REFRESH_TOKEN");
  } else {
    // access token 일 경우
    token = localStorage.getItem("ACCESS_TOKEN");
  }

  if (token !== null) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});

const getRfreshToken = async (): Promise<string | void> => {
  try {
    // const {
    //   data: { ACCESS_TOKEN, REFRESH_TOKEN },
    // } = await axios.get<{ ACCESS_TOKEN: string; REFRESH_TOKEN: string | null }>(
    //   REFRESH_URL
    // )

    const data = await axios.post(REFRESH_URL, {
      accessToken:
        "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJtZW1iZXJJZHgiOjIsIm1lbWJlclR5cGUiOiJVU0VSIiwiaXNTbnNNZW1iZXIiOmZhbHNlLCJpYXQiOjE2NzY4MDYzOTgsImV4cCI6MTY3OTM5ODM5OCwiaXNzIjoiZW50aXplbi5rciJ9.CmnXlZ-JOys8xa8C_f0XzrTOWKXa0e47qLmUKRR2yjE",
      refreshToken:
        "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpYXQiOjE2NzY4MDYzOTgsImV4cCI6MTY3OTM5ODM5OCwiaXNzIjoiZW50aXplbi5rciJ9.a8lt4LhgrZdmDQy84sqQyKcnrWM9nJFMTaGUIpbuRCo",
    });

    console.log("data=>", data.data.accessToken);

    const ACCESS_TOKEN = data.data.accessToken;

    localStorage.setItem("ACCESS_TOKEN", ACCESS_TOKEN);

    //   if (REFRESH_TOKEN !== null) {
    //     localStorage.setItem("REFRESH_TOKEN", REFRESH_TOKEN);
    //   }

    //   console.log(`⭐️ line: 53, ⭐️ ACCESS_TOKEN: ${ACCESS_TOKEN}`);
    //   return ACCESS_TOKEN;
  } catch (e) {
    localStorage.removeItem("ACCESS_TOKEN");
    localStorage.removeItem("REFRESH_TOKEN");
  }
};

instance.interceptors.response.use(
  (response) => {
    console.log(`⭐️ line: 63, ⭐️ response: ${response}`);
    return response;
  },

  async (err) => {
    console.log(`⭐️ line: 68, ⭐️ err: ${err}`);

    // const { message, isSuccess, errorCode } = err.response.data;
    const {
      config,
      response: {
        status,
        data: { message, isSuccess, errorCode },
      },
    } = err;

    // 토큰을 담아서 보냈지만, 로그인 요청이 온다면 로컬스토리지 데이터 제거
    if (!isSuccess && errorCode === 1003) {
      localStorage.removeItem("ACCESS_TOKEN");
      // localStorage.removeItem("REFRESH_TOKEN");
    }

    // console.log(config.url);
    // console.log(config.sent);
    // console.log(status);

    /** 1 */
    if (config.url === REFRESH_URL || status !== 401 || config.sent) {
      return Promise.reject(err);
    }

    /** 2 */
    config.sent = true;
    const ACCESS_TOKEN = await getRfreshToken();
    console.log("ACCESS_TOKEN==>", ACCESS_TOKEN);
    if (ACCESS_TOKEN) {
      config.headers.Authorization = `Bearer ${ACCESS_TOKEN}`;
    }
    return axios(config);
  }
);

export default instance;
