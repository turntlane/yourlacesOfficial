// actions/authActions.js
//@ts-nocheck
import { API_URL } from "../../Config";

// @ts-nocheck
export const setTokens = (accessToken, refreshToken) => ({
  type: "SET_TOKENS",
  payload: { accessToken, refreshToken },
});

export const removeTokens = () => ({
  type: "REMOVE_TOKENS",
});

export const refreshToken = (refreshToken) => async (dispatch) => {
  try {
    const response = await fetch(`${API_URL}/auth`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ token: refreshToken }),
    });
    const data = await response.json();
    if (response.ok) {
      dispatch(setTokens(data.accessToken, refreshToken));
    } else {
      dispatch(removeTokens());
    }
  } catch (error) {
    console.error("Refresh token error:", error);
    dispatch(removeTokens());
  }
};
