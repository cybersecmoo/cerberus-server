export const authorizationHeaders = () => {
  const config = {
    headers: {
      Authorization: `Bearer ${localStorage.getItem("token")}`
    }
  };

  return config;
};
