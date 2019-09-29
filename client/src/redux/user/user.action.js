import { LOGIN } from "../types";

export const login = token => ({
  type: LOGIN,
  payload: token
});
