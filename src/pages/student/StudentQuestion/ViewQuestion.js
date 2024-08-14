import React, { useState, useEffect } from "react";
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import CardActions from '@mui/material/CardActions';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import Grid from '@mui/material/Grid';
import Box from '@mui/material/Box';
import "../Quiz/Front.css";
//import { Document, Page, pdfjs } from 'react-pdf';
import axios from "axios";
// Configure pdfjs worker to load PDF documents
//pdfjs.GlobalWorkerOptions.workerSrc = `//cdnjs.cloudflare.com/ajax/libs/pdf.js/${pdfjs.version}/pdf.worker.min.js`;


const ViewQuestion = () => {

    const [medias, setMedias] = useState([]);

    useEffect(() => {
      getAllMedias();
    }, []);
  
    const getAllMedias = () => {
      axios
        .get(`http://localhost:5000/api/v1/question/all`)
        .then((result) => {
          setMedias(result.data);
        })
        .catch((error) => {
          setMedias([]);
          console.log(error);
          alert("Error happened!");
        });
        
    };
    console.log(medias);
    const showPdf = (pdf) => {
         window.open(`http://localhost:5000${pdf}`, "_blank", "noreferrer");
        //setPdfFile(`http://localhost:5000/files/${pdf}`)
      };
    return (
      <div style={{ padding: '20px', margin:'10px' }}>
        <Grid container spacing={2}>
      {medias?.map((pdf, index) => (
       <Grid item xs={12} sm={6} md={3} lg={3}>
         <Card elevation={3} style={{ backgroundColor: '#f0f7f5', width: '80%' }}> 
          <CardContent>
          <Typography variant="subtitle1" color="textSecondary" align="center" fontWeight="600" gutterBottom>
                {pdf.name}
              </Typography>
              <Typography variant="subtitle2" color="textSecondary" align="center" fontWeight="700" gutterBottom >
                {pdf.course}
              </Typography>
              <Typography variant="subtitle2" color="textSecondary" align="center" fontWeight="700" gutterBottom >
                {pdf.category}
              </Typography>
            </CardContent>
            <CardActions style={{ justifyContent: 'center' }}>
              <button
                      className="btn btn-primary"
                      onClick={() => showPdf(pdf.pdfs[0])}
                    >
                      Download
                    </button>
                    </CardActions>
          </Card>
        </Grid>
      ))}
    </Grid>
    </div>
    );
};

export default ViewQuestion;