export const endpoint = process.env.REACT_APP_API_ENDPOINT || `http://localhost:8082/api/v1`;
export const serverEndpoint = process.env.REACT_APP_API_ENDPOINT || `http://localhost:8082/api/v1`;

export const generateJwtHeader = (state) => {
  const token = `${state.account.token}`;

  return {
    'X-Authentication-Token': token,
    'Content-Type': 'application/json',
    'Accept': 'application/json',
    'X-BLUEWHALE-DEBUGGER': 1,
    'X-Authentication-Scope': 'Management',
  };
}
