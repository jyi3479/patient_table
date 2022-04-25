import React from "react";

const TableHeader = (props) => {
  return (
    <thead>
      <tr>
        <th>Id</th>
        <th>성별</th>
        <th>생년월일</th>
        <th>나이</th>
        <th>인종</th>
        <th>민족</th>
        <th>사망여부</th>
      </tr>
    </thead>
  );
};

export default TableHeader;
