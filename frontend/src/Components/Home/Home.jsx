import React, { useState } from "react";
import "./Home.css";
import { useDispatch, useSelector } from "react-redux";
import { useAlert } from "react-alert";
import { importExcel } from "../../Actions/Upload";
import { logoutUser } from "../../Actions/User";

function Home() {
  const dispatch = useDispatch();
  const alert = useAlert();
  const [file, setFile] = useState(null);
  const { data } = useSelector((state) => state.upload);

  const logoutHandler = () => {
    dispatch(logoutUser());
    alert.success("Logged Out");
  };


  const handleFileChange = (event) => {
    const selectedFile = event.target.files[0];
    setFile(selectedFile);
  };

  const handleImport = async (e) => {
    e.preventDefault();
    if (!file) {
      alert.error("Please select a file to import.");
      return;
    } else {
      await dispatch(importExcel(file));
      alert.success("File uploaded successfully.");
    }
  };
  return (
    <div className="homeContainer">
      <div className="heading">Add from Excel</div>
      <button onClick={logoutHandler} className="logout">Logout</button>
      <div className="mainContainer">
        <div className="subtitle">Add Candidates to Database or Pipleline</div>
        <div className="formatSelect">
          <p className="text">Select Format:</p>
          <input type="checkbox" />
          <label htmlFor="text">Naukri.com</label>
          <input type="checkbox" />
          <label htmlFor="text">Klimb</label>
        </div>
        <div className="upload">
          {data ? (
            <>
              <p className="Success">Thank You!</p>
              <div className="success_head">
                <span>✅</span>
                <span className="success_head_val">
                  File Successfully Uploaded
                </span>
              </div>
              <div className="success_details">
                <p>Your records will be processed shortly.</p>
                <p>Email will be sent to you once the progress is completed.</p>
                <p>
                  Please contact hello@klimb.io if you need further assistance.
                </p>
              </div>
            </>
          ) : (
            <>
              <label htmlFor="file_upload"></label>
              <input
                id="file_upload"
                type="file"
                accept=".xlsx, .xls"
                onChange={handleFileChange}
              />
              <p className="text">Upload a .xlsx or .xls file here</p>
            </>
          )}
        </div>
        {data ? null : <button className="import" onClick={handleImport}>Import</button>}

        <div className="disclamer">
          <p>Note:</p>
          <ul>
            <li>We Support upto 1000 records in a file</li>
            <li>Maximum file support is 5MB</li>
            <li>Name and Email are mandatory</li>
          </ul>
        </div>
      </div>
    </div>
  );
}

export default Home;
