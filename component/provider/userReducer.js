export const userInitialState =
  JSON.parse(localStorage.getItem("AuthUser")) || {};

export function UserReducer(state, action) {
  switch (action.type) {
    case "setUser":
      localStorage.setItem("AuthUser", JSON.stringify(action.data));
      localStorage.setItem("AuthToken", action.data.token);
      return { ...state, ...action.data };
    case "setLogout":
      return { state, ...{} };
    default:
      throw new Error();
  }
}
