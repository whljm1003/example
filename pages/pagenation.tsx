import React, { useState } from "react";
import Pagination from "rsuite/Pagination";

type Props = {};

const arr = Array.from({ length: 103 }, (_, i) => i);

const pagenation = (props: Props) => {
  const [page, setPage] = useState(1); // 현재 어떤 페이지인지 보여주는 usestate
  const limit = 10; // 몇개씩 짜를 것인가.
  const offset = (page - 1) * limit; // 한페이지에 나타나는 수 구하는 공식

  console.log(page);
  return (
    <div>
      {/* 0~9, 10~19, 20~29 이런식으로 짤라줌 */}
      {arr.slice(offset, offset + limit).map((el, index) => (
        <div key={index}>{el}</div>
      ))}
      <Pagination
        prev
        last
        next
        first
        size="lg"
        total={arr.length}
        limit={10}
        activePage={page}
        onChangePage={setPage}
      />
    </div>
  );
};

export default pagenation;

// 참고 자료
// https://www.daleseo.com/react-pagination/
