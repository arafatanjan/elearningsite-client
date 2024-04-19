import React, { useState, useEffect } from "react";
//import "./Tutorial.css";
import axios from "axios";
import TeacherUploadForm from "./TeacherUploadForm";
//import UploadsList from "./UploadsList";
//import { BACKEND_URI } from "./config/constants";

function Tutorial(props) {
    const [medias, setMedias] = useState([]);

  useEffect(() => {
    getAllMedias();
  }, []);

  const getAllMedias = () => {
    axios
      .get(`https://elearningsite-server.onrender.com/api/v1/media/all`)
      .then((result) => {
        setMedias(result.data);
      })
      .catch((error) => {
        setMedias([]);
        console.log(error);
        alert("Error happened!");
      });
  };

  return (
    <>
      <div className="row">
        <div className="col-md-6">
          <div
            className="card"
            style={{
              height: "auto",
              width: "800px",
              margin: "40px",
              border: "1px solid black",
            }}
          >
            <div className="card-body">
            {getAllMedias && <TeacherUploadForm getAllMedias={getAllMedias} />}
              
            </div>
          </div>
        </div>
        
      </div>
    </>
  );
}

export default Tutorial;