import React, { useState } from "react";
import styled from "styled-components";
import { patientApis } from "../shared/apis";
import Chart from "../container/Chart";
import Pagination from "../components/Table/Pagination";
import Table from "../container/Table";

const Home = () => {
  const [list, setList] = useState([]);
  const [total, setTotal] = useState(null);
  const [limit, setLimit] = useState(30);
  const [page, setPage] = useState(1);
  const [order, setOrder] = useState("");
  const [gender, setGender] = useState("");
  const [minAge, setMinAge] = useState("");
  const [maxAge, setMaxAge] = useState("");
  const [race, setRace] = useState("");
  const [isDeath, setIsDeath] = useState("");

  React.useEffect(() => {
    patientApis.getPatientList(page, limit, order, gender, minAge, maxAge, race, isDeath).then((res) => {
      setList(res.data.patient.list);
      setTotal(res.data.patient.totalLength);
    });
  }, [page, limit, order, gender, minAge, maxAge, race, isDeath]);
  return (
    <Wrap>
      <h2>Filter</h2>
      <FilterBox>
        <Select type="string" value={gender} onChange={({ target: { value } }) => setGender(value)}>
          <option value="">성별</option>
          <option value="M">M</option>
          <option value="F">F</option>
        </Select>
        <Select type="string" value={gender} onChange={({ target: { value } }) => setGender(value)}>
          <option value="">나이</option>
          <option value="M">M</option>
          <option value="F">F</option>
        </Select>
        <Select type="string" value={gender} onChange={({ target: { value } }) => setGender(value)}>
          <option value="">인종</option>
          <option value="M">M</option>
          <option value="F">F</option>
        </Select>
      </FilterBox>
      <Chart />

      <Table data={list} limit={limit} setLimit={setLimit} order={order} setOrder={setOrder} />
      <Pagination total={total} limit={limit} page={page} setPage={setPage} />
    </Wrap>
  );
};

const Wrap = styled.div`
  margin: 10px 20px;
`;

const FilterBox = styled.div`
  display: flex;
`;

const Select = styled.select`
  margin: 5px 0 20px 0px;
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

export default Home;
