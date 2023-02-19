import React from "react";
import { GoogleLogin, useGoogleLogin } from "@react-oauth/google";
import { googleLogout } from "@react-oauth/google";
type Props = {};

const Google = (props: Props) => {
  const userInfo: any = new Promise((resolve) => {
    const xhr = new XMLHttpRequest();
    xhr.open("GET", `https://www.googleapis.com/oauth2/v3/userinfo`);
    xhr.setRequestHeader(
      "Authorization",
      // `Bearer ${tokenResponse.access_token}`
      `Bearer "eyJhbGciOiJSUzI1NiIsImtpZCI6IjhlMGFjZjg5MWUwOTAwOTFlZjFhNWU3ZTY0YmFiMjgwZmQxNDQ3ZmEiLCJ0eXAiOiJKV1QifQ.eyJpc3MiOiJodHRwczovL2FjY291bnRzLmdvb2dsZS5jb20iLCJuYmYiOjE2NzI0NzczNTMsImF1ZCI6IjYxMjk2Mjc3NDUxMC11bnYwZ29scThwZGp2ajk2bTgwcmloanJkYTlkdG01YS5hcHBzLmdvb2dsZXVzZXJjb250ZW50LmNvbSIsInN1YiI6IjExNjg5MTI5NDk4OTQ5OTcxODkzMiIsImVtYWlsIjoid2hsam0xMDAzQGdtYWlsLmNvbSIsImVtYWlsX3ZlcmlmaWVkIjp0cnVlLCJhenAiOiI2MTI5NjI3NzQ1MTAtdW52MGdvbHE4cGRqdmo5Nm04MHJpaGpyZGE5ZHRtNWEuYXBwcy5nb29nbGV1c2VyY29udGVudC5jb20iLCJuYW1lIjoiSnVuZ21pbiBMZWUiLCJwaWN0dXJlIjoiaHR0cHM6Ly9saDMuZ29vZ2xldXNlcmNvbnRlbnQuY29tL2EvQUVkRlRwNGQ0WjlZWnozV3VaaHVGNXREWXg4WlNKZkdqZGxubElMcUlqQl81QT1zOTYtYyIsImdpdmVuX25hbWUiOiJKdW5nbWluIiwiZmFtaWx5X25hbWUiOiJMZWUiLCJpYXQiOjE2NzI0Nzc2NTMsImV4cCI6MTY3MjQ4MTI1MywianRpIjoiYmM5OTI3MDAzMzY5ODY2MTkyM2YwODIxNTM0MGIzMmMwN2NhNmZmNyJ9.VckjEC3J9DQszALSoQTcpIj4ZY_x35B3WpPvA44ns29v6An-Csiap7hEpEPBi65LychbW2R3t418gGuyjB5ZgOSsVXsmNCJNI1cSxdGw1eTOZtF8OCqmjX8N3rep4hRoiBDl6n4PVUHrMRA9YdsQ2Heck17fNhHh_aHt0DH80c81BNbJdWQWQ6oXSqjopS5hcLq7xGfcK_9cAQg1PQFRVHuRTFln3dpWf004iahmPRr-fLQ8KCZiE7jEk6QGyviczK_IaKhXO0PnhOyEDTk0xVuryI1GctC6udE1LVFMzKiSs8wKF6NykafTrZNZToUAUB0z016h6t1xIM-eiDx7UA"`
    );
    xhr.onload = function () {
      if (this.status >= 200 && this.status < 300)
        resolve(JSON.parse(this.responseText));
      else resolve({ err: "404" });
    };
    xhr.send();
  });
  return (
    <div>
      <h1>google login</h1>
      <div style={{ background: "blue", color: "white" }}>google signIn</div>
      <GoogleLogin
        onSuccess={(credentialResponse) => {
          console.log(credentialResponse);
          console.log(userInfo);
        }}
        onError={() => {
          console.log("Login Failed");
        }}
      />
      <button onClick={() => googleLogout()}>로그아웃</button>
    </div>
  );
};

export default Google;
