import React, { useState } from "react";
import styled from "styled-components";

import { patientApis } from "../shared/apis";

import Chart from "../container/Chart";
import Pagination from "../components/Table/Pagination";
import Table from "../container/Table";
import Select from "../elements/Select";

import searchIcon from "../image/ic_ search@2x.png";

const Home = () => {
  const [list, setList] = useState([]);
  const [total, setTotal] = useState(null);
  const [limit, setLimit] = useState(50);
  const [page, setPage] = useState(1);
  const [order, setOrder] = useState("");
  const [gender, setGender] = useState("");
  const [minAge, setMinAge] = useState();
  const [maxAge, setMaxAge] = useState();
  const [race, setRace] = useState("");
  const [ethnicity, setEthnicity] = useState("");
  const [isDeath, setIsDeath] = useState();

  React.useEffect(() => {
    patientApis.getPatientList(page, limit, order, gender, minAge, maxAge, race, ethnicity, isDeath).then((res) => {
      setList(res.data.patient.list);
      setTotal(res.data.patient.totalLength);
    });
  }, [page, limit, order]);

  const clickedFilter = () => {
    patientApis.getPatientList(page, limit, order, gender, minAge, maxAge, race, ethnicity, isDeath).then((res) => {
      setList(res.data.patient.list);
      setTotal(res.data.patient.totalLength);
      setPage(1);
      setLimit(50);
    });
  };

  return (
    <Wrap>
      <FilterBox>
        <Select state={gender} setState={setGender} category="성별" list={["M", "F"]} />
        <InputBox placeholder="최소 나이" value={minAge} onChange={(e) => setMinAge(e.target.value)} />
        <InputBox placeholder="최대 나이" value={maxAge} onChange={(e) => setMaxAge(e.target.value)} />
        <Select state={race} setState={setRace} category="인종" list={["other", "native", "black", "white", "asian"]} />
        <Select state={ethnicity} setState={setEthnicity} category="민족" list={["nonhispanic", "hispanic"]} />
        <Select state={isDeath} setState={setIsDeath} category="사망여부" list={["True", "False"]} />
        <img src={searchIcon} onClick={clickedFilter} />
      </FilterBox>

      <Chart gender={gender} race={race} ethnicity={ethnicity} />

      <Table data={list} limit={limit} setLimit={setLimit} order={order} setOrder={setOrder} setPage={setPage} />
      <Pagination total={total} limit={limit} page={page} setPage={setPage} />
    </Wrap>
  );
};

const Wrap = styled.div`
  margin: 20px 50px;
`;

const FilterBox = styled.div`
  display: flex;
  border-bottom: 1px solid grey;

  img {
    width: 40px;
    height: 40px;
    cursor: pointer;
  }
`;

const InputBox = styled.input`
  margin: 5px;
  min-width: 0;
  display: block;
  width: 100%;
  padding: 8px 8px;
  border: none;
  &:focus {
    outline: none;
  }
`;

export default Home;
