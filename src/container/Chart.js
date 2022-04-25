import React, { useEffect, useState } from "react";
import styled from "styled-components";
import { patientApis } from "../shared/apis";

import { PieChart } from "react-minimal-pie-chart";

const Chart = () => {
  const [list, setList] = useState([]);
  //   const [data, setData] = useState([])

  const raceList = [
    { title: "other", color: "red" },
    { title: "native", color: "blue" },
    { title: "black", color: "yellow" },
    { title: "white", color: "green" },
    { title: "asian", color: "black" },
  ];

  const calValue = (index, title) => {
    const targetList = list.filter((el) => {
      return el[index] === title;
    });
    let sum = 0;

    for (let i = 0; i < targetList.length; i++) {
      sum += targetList[i].count;
    }

    return sum;
  };

  const data1 = [
    { title: "M", value: calValue("gender", "M"), color: "#E38627" },
    { title: "F", value: calValue("gender", "F"), color: "#C13C37" },
  ];
  const data2 = raceList.map((el) => {
    return { title: el.title, value: calValue("race", el.title), color: el.color };
  });

  const data3 = [
    { title: "nonhispanic", value: calValue("ethnicity", "nonhispanic"), color: "#E38627" },
    { title: "hispanic", value: calValue("ethnicity", "hispanic"), color: "#C13C37" },
  ];

  useEffect(() => {
    patientApis.getPatientStats().then((res) => {
      console.log(res);
      setList(res.data.stats);
    });
  }, []);

  return (
    <>
      <h2>Chart</h2>
      <ChartContainer>
        <PieChart data={data1} label={({ dataEntry }) => dataEntry.title + ":" + dataEntry.value} style={{ width: "300px", height: "300px" }} />
        <PieChart data={data2} style={{ width: "300px", height: "300px" }} />
        <PieChart data={data3} label={({ dataEntry }) => dataEntry.title + ":" + dataEntry.value} style={{ width: "300px", height: "300px" }} />
      </ChartContainer>
    </>
  );
};

const ChartContainer = styled.div`
  display: flex;
  justify-content: space-around;
`;

export default Chart;
