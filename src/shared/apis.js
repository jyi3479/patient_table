import axios from "axios";

const server_url = process.env.REACT_APP_SERVER_PORT;

export const apis = axios.create({
  baseURL: server_url,
});

export const patientApis = {
  getPatientList: (page, length, order, gender, minAge, maxAge, race, isDeath) =>
    apis.get(`/api/patient/list?page=${page}&length=${length}&order_column=${order}&gender=${gender}&race=${race}&isDeath=${isDeath}`),
  getPatientDetail: (id) => apis.get(`/api/patient/brief/${id}`),
  getPatientStats: () => apis.get("/api/patient/stats"),
};
