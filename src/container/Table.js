import React from "react";
import styled from "styled-components";

import TableBody from "../components/Table/TableBody";
import TableHeader from "../components/Table/TableHeader";

const Table = ({ data, limit, setLimit, order, setOrder }) => {
  return (
    <Wrap>
      <h2>Table</h2>
      <OrderBox>
        <Select type="number" value={limit} onChange={({ target: { value } }) => setLimit(Number(value))}>
          <option value="50">개수</option>
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
    </Wrap>
  );
};

const Wrap = styled.div`
  margin: 90px 0;

  h2 {
    margin: 0;
  }
`;

const OrderBox = styled.div`
  float: right;
  display: flex;
`;

const Select = styled.select`
  margin: 5px 5px 20px 0px;
  min-width: 0;
  display: block;
  padding: 8px 8px;
  border: 1px solid #acacac;
  border-radius: 10px;
  &:focus {
    outline: none;
  }
`;

const TableContainer = styled.table`
  width: 100%;
  border-collapse: collapse;

  thead {
    border-bottom: 1.5px solid #000000;
    th {
      padding: 15px;
      text-align: center;
    }
  }

  tbody {
    th,
    td {
      border-bottom: 1px solid #acacac;
      padding: 10px;
      text-align: center;
    }
  }
`;

export default Table;
