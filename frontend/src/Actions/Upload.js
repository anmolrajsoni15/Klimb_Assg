import axios from "axios";

export const importExcel = (file) => async (dispatch) => {

  try {
    dispatch({type: "uploadRequest"});

    const formData = new FormData();
    formData.append('excel', file);

    const response = await axios.post(`/api/v1/upload`, formData, {
      headers: {
        'Content-Type': 'multipart/form-data'
      },
      withCredentials: true
    });

    dispatch({type: "uploadSuccess", payload: response.data});
  } catch (error) {
    dispatch({
        type: "uploadFailure",
        payload: error.response.data.message,
      });
  }
};
