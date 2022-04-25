import React from "react";
import styled from "styled-components";

import TableBody from "../components/Table/TableBody";
import TableHeader from "../components/Table/TableHeader";

const Table = ({ data, limit, setLimit, order, setOrder }) => {
  return (
    <>
      <h2>Table</h2>
      <OrderBox>
        <Select type="number" value={limit} onChange={({ target: { value } }) => setLimit(Number(value))}>
          <option value="30">개수</option>
          <option value="50">50</option>
          <option value="80">80</option>
          <option value="100">100</option>
          <option value="130">130</option>
          <option value="150">150</option>
        </Select>

        <Select type="string" value={order} onChange={({ target: { value } }) => setOrder(value)}>
          <option value="">정렬</option>
          <option value="person_id">Id</option>
          <option value="gender">성별</option>
          <option value="birth">생년월일</option>
          <option value="race">인종</option>
          <option value="ethnicity">민족</option>
          <option value="death">사망여부</option>
        </Select>
      </OrderBox>
      <TableContainer>
        <TableHeader />
        <TableBody data={data} />
      </TableContainer>
    </>
  );
};

const OrderBox = styled.div`
  float: right;
  display: flex;
`;

const Select = styled.select`
  margin: 5px 5px 20px 0px;
  min-width: 0;
  display: block;
  width: 100%;
  padding: 8px 8px;
  font-family: inherit; // font 상속
  line-height: inherit;
  border: 2px solid #acacac;
  border-radius: 10px;
  color: inherit;
  background-color: transparent;
  &:focus {
    border-color: #61b165;
  }
`;

const TableContainer = styled.table`
  width: 100%;
  border-top: 1px solid #444444;
  border-collapse: collapse;
  th,
  td {
    border-bottom: 1px solid #444444;
    padding: 10px;
    text-align: center;
  }
  th:first-child,
  td:first-child {
    border-left: none;
  }
`;

export default Table;
