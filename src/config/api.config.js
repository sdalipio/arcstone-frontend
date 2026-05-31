const config = {
    baseURL: import.meta.env.VITE_API_BASE_URL,
    timeout: parseInt(import.meta.env.VITE_API_TIMEOUT || '10000', 10),
    headers: {
      'Content-Type': 'application/json',
      'Accept': 'application/json',
    },
  };
  
  export default config;