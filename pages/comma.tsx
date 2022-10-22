import React, { ChangeEvent, useState } from "react";

export default function Comma() {
  const [num, setNum] = useState("");

  const inputPriceFormat = (str: string) => {
    // 콤마 추가
    const comma = (str: string) => {
      return str.replace(/(\d)(?=(?:\d{3})+(?!\d))/g, "$1,");
    };
    // 모든 문자열을 공백으로 바꾼다.
    const uncomma = (str: string) => {
      return str.replace(/[^\d]+/g, "");
    };
    return comma(uncomma(str));
  };

  const onChangeInput = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { value } = e.target;
    console.log(value);
    setNum(inputPriceFormat(value));
  };

  return (
    <div className="App">
      <input type="text" value={num} onChange={(e) => onChangeInput(e)} />
    </div>
  );
}
