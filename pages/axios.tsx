import axios from "axios";
import React from "react";
import { useMutation, useQuery } from "react-query";
import instance from "../api";

export default function reactQueryTest() {
  const { data } = useQuery(
    "result",
    () => instance.get("/members/info"),
    // () => axios.get("/api/members?id=test1&memberType=COMPANY"),
    {
      retry: 1,
    }
  );

  // const { mutate } = useMutation(
  //   () => instance.post("/post", { data: data }),
  //   {}
  // );

  // console.log(`⭐️ line: 32, ⭐️ result: ${data}`);
  // console.log(data);

  return (
    <div>
      <h1>데이터</h1>
    </div>
  );
}
