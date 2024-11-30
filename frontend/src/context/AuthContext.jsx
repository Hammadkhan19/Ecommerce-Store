import { createContext, useReducer, useEffect } from "react";

export const AuthContext = createContext();

export const authReducer = (state, action) => {
  switch (action.type) {
    case "LOGIN":
      return {
        user: action.payload,
      };
    case "LOGOUT":
      localStorage.removeItem("user");
      return { user: null };
    case "LOGIN_AS_GUEST":
      const guestUser = {
        userId: "guest",
        email: "guest@123gmail.com",
        token: null, // No token for guest
      };
      localStorage.setItem("user", JSON.stringify(guestUser)); // Save guest user to localStorage
      return {
        user: guestUser,
      };
    default:
      return state;
  }
};

export const AuthContextProvider = ({ children }) => {
  const [state, dispatch] = useReducer(authReducer, { user: null });
  console.log("AuthContext state", state);

  // useeffect to keep the user state true and logged in
  useEffect(() => {
    const user = JSON.parse(localStorage.getItem("user"));
    if (user) {
      dispatch({ type: "LOGIN", payload: user });
    }
  }, []);

  return (
    <AuthContext.Provider value={{ ...state, dispatch }}>
      {children}
    </AuthContext.Provider>
  );
};
