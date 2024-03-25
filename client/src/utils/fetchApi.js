const fetchApi = async (url, data) => {
  const res = await fetch(url, data);
  const result = await res.json();
  return result;
};

export default fetchApi;
