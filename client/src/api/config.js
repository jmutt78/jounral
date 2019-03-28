export const config = {
  headers: {
    "Content-Type": "application/json",
    Authorization: "Bearer " + localStorage.getItem("token"),
    "cache-control": "no-cache"
  }
};
