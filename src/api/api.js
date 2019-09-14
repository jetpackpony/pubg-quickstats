const apiAddress = 
  (process.env.REACT_APP_API_ADDRESS)
    ? process.env.REACT_APP_API_ADDRESS
    : `http://${window.location.hostname}:4000/`;

export const getPage = async (userName, link = "") => {
  if (link === null) {
    return null;
  }
  let url = new URL(
    ((link === "")
      ? `/users/${userName}/matches?cursor=`
      : link),
    apiAddress
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