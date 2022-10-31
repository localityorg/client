// set inventory
export const SET_LOCATION = "SET_LOCATION";

export const setLocation = (location: [string, string]) => (dispatch: any) => {
  dispatch({
    type: SET_LOCATION,
    payload: location,
  });
};

// all user
export const SET_USER = "SET_USER";
export const REMOVE_USER = "REMOVE_USER";

export function saveToStorage(key: string, value: any) {
  localStorage.setItem(key, value);
}

export function removeFromStorage(key: string) {
  localStorage.deleteItem(key);
}

export const setUser = (user: any) => (dispatch: any) => {
  saveToStorage("jwtToken", user.token);
  saveToStorage("refreshToken", user.refreshToken);

  dispatch({
    type: SET_USER,
    payload: user,
  });
};

export const removeUser = () => (dispatch: any) => {
  removeFromStorage("jwtToken");
  removeFromStorage("refreshToken");

  dispatch({
    type: REMOVE_USER,
  });
};
