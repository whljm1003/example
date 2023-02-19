import "../styles/globals.css";
import type { AppProps } from "next/app";
// import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { QueryClient, QueryClientProvider } from "react-query";
import { GoogleOAuthProvider } from "@react-oauth/google";
import { useEffect } from "react";

function MyApp({ Component, pageProps }: AppProps) {
  const queryClient = new QueryClient();

  // useEffect(() => {
  //   localStorage.setItem(
  //     "REFRESH_TOKEN",
  //     "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpYXQiOjE2NzY3ODg4MjcsImV4cCI6MTY3OTM4MDgyNywiaXNzIjoiZW50aXplbi5rciJ9.TaV1UzMo6SK5NNPp9Tpu-qCszODL_kI6uCQn2VreTvU"
  //   );
  //   localStorage.setItem(
  //     "ACCESS_TOKEN",
  //     "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJtZW1iZXJJZHgiOjM3LCJtZW1iZXJUeXBlIjoiVVNFUiIsImlzU25zTWVtYmVyIjpmYWxzZSwiaWF0IjoxNjc2Nzg4ODI3LCJleHAiOjE2NzkzODA4MjcsImlzcyI6ImVudGl6ZW4ua3IifQ.WCPkIdVnLCZWxa9zYXUm94TEINv8Esj7RSPmOKg3pZ8"
  //   );
  // }, []);

  return (
    <QueryClientProvider client={queryClient}>
      {/* <GoogleOAuthProvider clientId="612962774510-unv0golq8pdjvj96m80rihjrda9dtm5a.apps.googleusercontent.com"> */}
      <Component {...pageProps} />
      {/* </GoogleOAuthProvider> */}
    </QueryClientProvider>
  );
}

export default MyApp;
