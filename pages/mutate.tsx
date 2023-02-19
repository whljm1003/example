import { useMutation } from "@tanstack/react-query";
import React, { FormEvent, useState } from "react";
import { fetcherPostApi } from "../api";

type Props = {};

export default function reactQueryMuateTest(props: Props) {
  const [name, setName] = useState<string>("");
  const [job, setJob] = useState<string>("");

  const { mutate, isLoading } = useMutation(fetcherPostApi, {
    onMutate(variables) {
      console.log("onMutate -> ");
      console.log(variables);
    },
    onSuccess: (data, variables, context) => {
      console.log("success -> ", data, variables, context);
    },
    onError: (error, variable, context) => {
      console.log("onError -> ", error, variable, context);
    },
    onSettled: () => {
      console.log("onSettled");
    },
  });

  const handleSubmit = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    mutate({
      name: name,
      job: job,
    });
  };

  return (
    <div>
      <h1>React query useMutate 예제</h1>
      {isLoading ? (
        <div>로딩중...</div>
      ) : (
        <form onSubmit={handleSubmit}>
          <input
            type="text"
            value={name}
            onChange={(e) => setName(e.target.value)}
          />
          <input
            type="text"
            value={job}
            onChange={(e) => setJob(e.target.value)}
          />
          <button type="submit">제출하기</button>
        </form>
      )}
    </div>
  );
}
