import axios, { AxiosError } from "axios";

// const BASE_URL = "https://test-api.entizen.kr";
const BASE_URL = "api";
const REFRESH_URL = `${BASE_URL}/auth/token`;

// const ACCESS_TOKEN = JSON.parse(localStorage.getItem("ACCESS_TOKEN")!);
const ACCESS_TOKEN =
  // "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJtZW1iZXJJZHgiOjIsIm1lbWJlclR5cGUiOiJVU0VSIiwiaXNTbnNNZW1iZXIiOmZhbHNlLCJpYXQiOjE2NzY4MDYzOTgsImV4cCI6MTY3OTM5ODM5OCwiaXNzIjoiZW50aXplbi5rciJ9.CmnXlZ-JOys8xa8C_f0XzrTOWKXa0e47qLmUKRR2yjE";
  "eyJhbGciOiJaaaa1111IUzI1NiIsInR5cCI6IkpXVCJ9.eyJtZW1iZXJJZHgiOjIsIm1lbWJlclR5cGUiOiJVU0VSIiwiaXNTbnNNZW1iZXIiOmZhbHNlLCJpYXQiOjskE42345E2NzY4MDYzOTgsImV4cCI6MTY3OTM5ODM5OCwiaXNzIjoiZW50aXplbi5rciJ";
// const REFRESH_TOKEN = JSON.parse(localStorage.getItem("REFRESH_TOKEN")!);
const REFRESH_TOKEN =
  "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpYXQiOjE2NzY4MDYzOTgsImV4cCI6MTY3OTM5ODM5OCwiaXNzIjoiZW50aXplbi5rciJ9.a8lt4LhgrZdmDQy84sqQyKcnrWM9nJFMTaGUIpbuRCo";

const instance = axios.create({
  baseURL: BASE_URL,
  headers: {
    "content-type": "application/json;charset=UTF-8",
    accept: "application/json,",
  },
  withCredentials: true,
});

// 요청 interceptor
instance.interceptors.request.use((config) => {
  if (!config.headers) return config;

  let token: string | null = null;
  // refresh token을 호출하는 경우는 refresh 토큰을 찾아서 token 값에 넣어준다.
  if (config.url === REFRESH_URL) {
    token = localStorage.getItem("REFRESH_TOKEN");
  } else {
    token = localStorage.getItem("ACCESS_TOKEN");
  }
  // 토큰이 있으면 토큰을 header에 담아서 서버에 보낸다.
  if (token !== null) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});

// 응답 interceptor
instance.interceptors.response.use(
  (response) => {
    // 아무런 오류 없이 정상적으로 데이터를 받아옴.
    console.log(`⭐️ line: 46, ⭐️ 성공적으로 응답완료`);
    console.log(response);
    return response;
  },
  async (err) => {
    // 요청 실패, 토큰이 만료 로직 처리.
    console.log(`⭐️ line: 52, ⭐️ err 발생: ${err}`);
    const {
      config,
      response: {
        status,
        data: { message, isSuccess, errorCode },
      },
    } = err;

    // 토큰을 담아서 보냈지만 (만료 처리), 로그인 요청이 온다면 로컬스토리지 데이터 제거
    // 회원 탈퇴 or 잘못된 토큰일 경우
    if (!isSuccess && errorCode === 1003) {
      console.log("=========회원 탈퇴========");
      console.log(err);
      // localStorage.removeItem("ACCESS_TOKEN");
      // localStorage.removeItem("REFRESH_TOKEN");
      const ACCESS_TOKEN = await getRfreshToken();
      console.log("ACCESS_TOKEN", ACCESS_TOKEN);
    }
    /** 1 */
    //  에러 발생
    if (config.url === REFRESH_URL || status !== 401 || config.sent) {
      return Promise.reject(err);
    }
    /** 2 */
    // 에세스 토큰이 만료되면 리프레쉬 토큰을 헤더에 담아서 다시 서버로 받아와서 보낸다.
    config.sent = true;
    const ACCESS_TOKEN = await getRfreshToken();
    if (ACCESS_TOKEN) {
      config.headers.Authorization = `Bearer ${ACCESS_TOKEN}`;
    }
    return axios(config);
  }
);

// 응답이 왔는데, 토큰이 만료되어 다시 리프레쉬 토큰으로 토큰 값 호출
const getRfreshToken = async (): Promise<string | void> => {
  try {
    // 리프레쉬 토큰을 얻기 위해 토큰들을 담아서 다시 서버로 요청한다.
    // 유효한 에세스 토큰을 받았다면, 로컬 스토리지에 에세스 토큰을 교체해준다.
    await axios
      .post(REFRESH_URL, {
        // accessToken: ACCESS_TOKEN,
        accessToken:
          "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJtZW1iZXJJZHgiOjIsIm1lbWJlclR5cGUiOiJVU0VSIiwiaXNTbnNNZW1iZXIiOmZhbHNlLCJpYXQiOjE2NzY5ODMxMzMsImV4cCI6MTY3OTU3NTEzMywiaXNzIjoiZW50aXplbi5rciJ9.sxi940Vz7HEH7ffBgMdm7_6Nq11aI8IpVCaiqsVpPvM",
        // refreshToken: REFRESH_TOKEN,
        refreshToken:
          "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpYXQiOjE2NzY5ODMxMzMsImV4cCI6MTY3OTU3NTEzMywiaXNzIjoiZW50aXplbi5rciJ9.dm2Hu3N6jwlBM_C50awzL9cJj1mxHeHOpcpkl3uPDuw",
      })
      .then((res) => {
        const ACCESS_TOKEN = res.data.accessToken;
        localStorage.setItem("ACCESS_TOKEN", ACCESS_TOKEN);
      });
  } catch (e) {
    console.log("실패하엿습니다.");

    // 리프레쉬 토큰을 요청하였는데도 실패가 했다는 건, 리프레쉬 토큰도 만료가 되었다는 것이기에 로그아웃 처리를 진행한다.
    localStorage.removeItem("ACCESS_TOKEN");
    localStorage.removeItem("REFRESH_TOKEN");
  }
};

export default instance;
