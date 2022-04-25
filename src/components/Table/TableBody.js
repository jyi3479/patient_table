import React, { useState } from "react";
import styled from "styled-components";
import { patientApis } from "../../shared/apis";

const TableBody = ({ data }) => {
  const [targetId, setTargetId] = useState(null);
  const [targetList, setTargetList] = useState([]);
  const [active, setActive] = useState(false);
  const clickedPatient = (id) => {
    patientApis.getPatientDetail(id).then((res) => {
      setTargetId(id);
      setTargetList(res.data);
    });
  };
  return (
    <tbody>
      {data.map((el) => {
        return (
          <React.Fragment key={el.personID}>
            <tr
              onClick={() => {
                setActive(!active);
                if (!active) {
                  clickedPatient(el.personID);
                }
              }}
            >
              <td>{el.personID}</td>
              <td>{el.gender}</td>
              <td>{el.birthDatetime.split(" ")[0]}</td>
              <td>{el.age}</td>
              <td>{el.race}</td>
              <td>{el.ethnicity}</td>
              <td>{el.isDeath ? "True" : "False"}</td>
            </tr>
            {targetId === el.personID && active && (
              <tr>
                <td colspan="7">
                  <DetailBox>
                    <div>
                      <h3>전체 방문 수</h3>
                      <span>{targetList.visitCount} 회</span>
                    </div>
                    <div>
                      <h3>진단 정보</h3>
                      {targetList.conditionList.map((el) => {
                        return <li>{el}</li>;
                      })}
                    </div>
                  </DetailBox>
                </td>
              </tr>
            )}
          </React.Fragment>
        );
      })}
    </tbody>
  );
};

const DetailBox = styled.div`
  width: 100%;
  display: flex;
  justify-content: space-evenly;
`;

export default TableBody;
