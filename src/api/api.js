const API_ENDPOINT = process.env.API_ENDPOINT || "http://localhost:4000";
export const getPage = async (userName, link = "") => {
  if (link === null) {
    return null;
  }
  let url = new URL(
    ((link === "")
      ? `/users/${userName}/matches?cursor=`
      : link),
    API_ENDPOINT
  );

  return fetch(url, {
    method: "get",
    headers: {
      "Accept": "application/vnd.api+json",
    }
  })
    .then((data) => data.json())
    .catch((err) => console.log("ERROR: " + err));
};