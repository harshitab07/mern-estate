import fetchApi from "../utils/fetchApi";

const signUpApi = async (details) => {
  const url = "/api/auth/signup";
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

export default signUpApi;
