import config from "./config.json";
import { getAuthToken } from "../../src/services/auth";
import http from "../../src/services/httpServices";

const apiEndpoint = config.apiUrl;

export function postCredentials(userData: {}, mode: string) {
  return http.post(
    apiEndpoint + "/" + mode,
    { ...userData },
    {
      headers: {
        "Content-Type": "application/json",
      },
    }
  );
}
export function logout() {
  return http.post(apiEndpoint + "/logout", {
    headers: {
      Authorization: "Bearer " + getAuthToken(),
    },
  });
}
