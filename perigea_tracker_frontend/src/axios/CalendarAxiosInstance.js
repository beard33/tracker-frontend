import axios from "axios";

function getUrlByEnv() {
  let serverUrl;

  // TODO as now mocked, set dynamic by env
  let envs = "LOCAL";

  switch (envs) {
    case "LOCAL":
      serverUrl = "http://localhost:9090/calendar/api/";
      break;
    case "SVIA":
      break;
    case "SVIB":
      break;
    case "SVIL":
      break;
    case "TEST":
      break;
    case "BFIX":
      break;
    case "COLL":
      break;
    case "PROD":
      break;
    default:
        serverUrl = "http://localhost:9090/calendar/api/";
  }
  return serverUrl;
}

const CalendarAxiosInstance = axios.create({
  baseURL: getUrlByEnv(),
  headers: {
    "Content-type": "application/json",
    'Access-Control-Allow-Origin' : '*',
    'Access-Control-Allow-Methods':'GET,PUT,POST,DELETE,PATCH,OPTIONS',
  },
});

export default CalendarAxiosInstance;