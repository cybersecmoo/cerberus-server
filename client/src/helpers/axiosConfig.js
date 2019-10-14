export const axiosConfig = () => {
  const config = {
    validateStatus: status => {
      return status >= 200 && status < 500;
    }
  };

  return config;
};
