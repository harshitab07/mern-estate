import fetchApi from "../utils/fetchApi";

const signInApi = async (details) => {
  const url = "/api/auth/signin";
  const data = {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(details),
  };
  const res = await fetchApi(url, data);

  return res;
};

export default signInApi;
