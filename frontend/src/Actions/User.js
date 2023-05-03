import axios from "axios";

export const signUpUser =
  (name, email, password) => async (dispatch) => {
    try {
      dispatch({
        type: "SignUpRequest",
      });

      const { data } = await axios.post(
        `/api/v1/signup`,
        { name, email, password },
        {
          headers: {
            "Content-Type": "application/json",
          },
        }
      );
      dispatch({
        type: "SignUpSuccess",
        payload: data.user,
      });
    } catch (error) {
      dispatch({
        type: "SignUpFailure",
        payload: error.response.data.message,
      });
    }
  };

  export const loadUser = () => async (dispatch) => {
    try {
      dispatch({
        type: "LoadUserRequest",
      });
  
      const { data } = await axios.get(`/api/v1/profile`);
      dispatch({
        type: "LoadUserSuccess",
        payload: data.user,
      });
    } catch (error) {
      dispatch({
        type: "LoadUserFailure",
        payload: error.response.data.message,
      });
    }
  };

  export const logoutUser = () => async (dispatch) => {
    try {
      dispatch({
        type: "LogoutRequest",
      });
  
      await axios.get(`/api/v1/logout`);
  
      dispatch({
        type: "LogoutSuccess",
      });
    } catch (error) {
      dispatch({
        type: "LogoutFailure",
        payload: error.response.data.message,
      });
    }
  };