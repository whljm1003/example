import { useQuery } from "@tanstack/react-query";
import { AxiosError } from "axios";
import React from "react";
import { Post, post } from "../api";

type Props = {};

const AxiosTest = (props: Props) => {
  const { data, isLoading, isError, error } = useQuery<Post, AxiosError>(
    ["test123"],
    () => post("get", "/users?page=2"),
    {
      onError: (error) => {
        console.log(error.request.data);
        console.log(error.response?.status);
      },
    }
  );

  console.log(data);

  if (isLoading) {
    return <div>로딩중...</div>;
  }

  if (isError) {
    // console.log("에러 메세지");
    // console.log(error);
    // console.log(isError);
    // return <div>{isError.message}</div>;
    // alert(error);
    return <h1>에러</h1>;
  }

  return (
    <div>
      <h1>{data.page}</h1>
      <h1>{data.per_page}</h1>
      <h1>{data.total}</h1>
      <h1>{data.total_pages}</h1>
    </div>
  );
};

export default AxiosTest;
