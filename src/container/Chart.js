import React, { useEffect, useState } from "react";
import styled from "styled-components";
import { patientApis } from "../shared/apis";

import { PieChart } from "react-minimal-pie-chart";

const Chart = ({ gender, race, ethnicity }) => {
  const [list, setList] = useState([]);

  const raceList = [
    { title: "other", color: "#002C00" },
    { title: "native", color: "#005766" },
    { title: "black", color: "#6B8A24" },
    { title: "white", color: "#A1C05A" },
    { title: "asian", color: "#7CCE76" },
  ];

  const calValue = (index1, title1, index2, title2) => {
    const targetList = list.filter((el) => {
      return el[index1] === title1 && el[index2] === title2;
    });
    let sum = 0;

    for (let i = 0; i < targetList.length; i++) {
      sum += targetList[i].count;
    }

    return sum;
  };

  const data1 = [
    { title: "M", value: gender === "F" ? 0 : calValue("gender", "M"), color: "#0D3EA3" },
    { title: "F", value: gender === "M" ? 0 : calValue("gender", "F"), color: "#79AAFF" },
  ];
  const data2 = raceList.map((el) => {
    return { title: el.title, value: race && race !== el.title ? 0 : calValue("race", el.title), color: el.color };
  });

  const data3 = [
    { title: "nonhispanic", value: ethnicity === "hispanic" ? 0 : calValue("ethnicity", "nonhispanic"), color: "#E38627" },
    { title: "hispanic", value: ethnicity === "nonhispanic" ? 0 : calValue("ethnicity", "hispanic"), color: "#C13C37" },
  ];
  const data4 = raceList
    .map((el) => {
      return {
        title: "M + " + el.title,
        value: gender === "M" || (race && race !== el.title) ? 0 : calValue("gender", "F", "race", el.title),
        color: el.color,
      };
    })
    .concat(
      raceList.map((el, idx) => {
        return {
          title: "F + " + el.title,
          value: gender === "F" || (race && race !== el.title) ? 0 : calValue("gender", "M", "race", el.title),
          color: `hsl(${20 * idx},100%,50%)`,
        };
      })
    );
  const data5 = [
    {
      title: "F + nonhispanic",
      value: gender === "M" || (ethnicity && ethnicity !== "nonhispanic") ? 0 : calValue("gender", "F", "ethnicity", "nonhispanic"),
      color: "#2A0066",
    },
    {
      title: "F + hispanic",
      value: gender === "M" || (ethnicity && ethnicity !== "hispanic") ? 0 : calValue("gender", "F", "ethnicity", "hispanic"),
      color: "#4E248A",
    },
    {
      title: "M + nonhispanic",
      value: gender === "F" || (ethnicity && ethnicity !== "nonhispanic") ? 0 : calValue("gender", "M", "ethnicity", "nonhispanic"),
      color: "#966CD2",
    },
    {
      title: "M + hispanic",
      value: gender === "F" || (ethnicity && ethnicity !== "hispanic") ? 0 : calValue("gender", "M", "ethnicity", "hispanic"),
      color: "#CCA2FF",
    },
  ];

  useEffect(() => {
    patientApis.getPatientStats().then((res) => {
      setList(res.data.stats);
    });
  }, []);

  return (
    <>
      <h2>Chart</h2>
      <ChartContainer>
        <div>
          <p>성별 환자 수</p>
          <PieChart data={data1} style={{ width: "300px", height: "300px" }} />
        </div>
        <div>
          <p>인종별 환자 수</p>
          <PieChart data={data2} style={{ width: "300px", height: "300px" }} />
        </div>
        <div>
          <p>민족별 환자 수</p>
          <PieChart data={data3} style={{ width: "300px", height: "300px" }} />
        </div>
        <div>
          <p>(성별 + 인종)별 환자 수</p>
          <PieChart data={data4} style={{ width: "300px", height: "300px" }} />
        </div>
        <div>
          <p>(성별 + 민족)별 환자 수</p>
          <PieChart data={data5} style={{ width: "300px", height: "300px" }} />
        </div>
      </ChartContainer>
    </>
  );
};

const ChartContainer = styled.div`
  display: flex;
  justify-content: space-around;
  flex-wrap: wrap;

  p {
    font-weight: bold;
  }
`;

export default Chart;
