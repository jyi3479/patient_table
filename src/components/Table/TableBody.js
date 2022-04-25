import React, { useState } from "react";
import { patientApis } from "../../shared/apis";

const TableBody = (props) => {
  const data = props.data;
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
          <>
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
              <td>{+el.isDeath}</td>
            </tr>
            {targetId === el.personID && active && (
              <tr>
                <td>
                  <p>전체 방문 수</p>
                  {targetList.visitCount}
                </td>
                <td>
                  <p>진단 정보</p>
                  {targetList.conditionList.map((el) => {
                    return <li>{el}</li>;
                  })}
                </td>
              </tr>
            )}
          </>
        );
      })}
    </tbody>
  );
};

export default TableBody;
