import actionTypes from "./types";

export const updateUser = (user) => ({
    type: actionTypes.UPDATE_USER,
    user
  });