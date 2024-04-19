import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux';
import { getUserDetails } from '../../../redux/userRelated/userHandle';
import { updateStudentFields } from '../../../redux/studentRelated/studentHandle';
//import { getAllStudentdata } from '../../../redux/studentRelated/studentHandle';
import axios from "axios";

import {
    Box, InputLabel,
    MenuItem, Select,
    Typography, Stack,
    TextField, CircularProgress, FormControl
} from '@mui/material';
import { PurpleButton } from '../../../components/buttonStyles';
import Popup from '../../../components/Popup';

const TeacherEvaluationForm  = ({ situation }) => {
    const dispatch = useDispatch();
    const { currentUser, userDetails, loading } = useSelector((state) => state.user);
    const { subjectsList } = useSelector((state) => state.sclass);
    const { response, error, statestatus } = useSelector((state) => state.student);
    const [studentID, setStudentID] = useState("");
    const [subjectName, setSubjectName] = useState("");
    const [chosenSubName, setChosenSubName] = useState("");
    const [status, setStatus] = useState('');
    const [newMarks, setNewmarks] = useState('');
    const [givenMarks, setGivenMarks] = useState('');
    const [results, setResults] = useState('');
    const [showPopup, setShowPopup] = useState(false);
    const [message, setMessage] = useState("");
    const [loader, setLoader] = useState(false)
    //const [teacherInfo, setTeacherInfo] = useState(false)
    //setTeacherInfo(currentUser);
    const teacherInfo=currentUser;
    console.log(teacherInfo);

    
    useEffect(() => {
        getAllStudentdata();
        ////console.log(na?.property?.semester);
        ////console.log(results)
      }, []);

    const getAllStudentdata = () => {
        axios
          .get(`http://localhost:5000/teacher/student/getAllStudent`)
          .then((result) => {
            setResults(result.data);
          })
          .catch((error) => {
            setResults([]);
            //console.log(error);
            alert("Error happened!");
          });        
      };

      console.log(results)

     //??
      useEffect(() => {
        if (results && results.length > 0) {
          // Initialize an array to store filtered student objects
          const filteredStudents = [];
      
          // Iterate through the results array to filter students based on the condition
          results.forEach(student => {
            // Check if the student's examResult includes items where subName matches teachSubject._id
            const filteredExamResults = student.examResult.filter(result => result.subName === teacherInfo.teachSubject._id);
      
            // If there are matching exam results, create a new filteredStudent object
            if (filteredExamResults.length > 0) {
              const filteredStudent = {
                _id: student._id,
                name: student.name,
                rollNum: student.rollNum,
                school: student.school,
                teachSubject_id: teacherInfo.teachSubject._id,
                teachSubject_subName: teacherInfo.teachSubject.subName,
                attendance: student.attendance,
                examResult: filteredExamResults // Assign filtered exam results
              };
              filteredStudents.push(filteredStudent);
            }
          });
      
          // Do something with filteredStudents array (e.g., set state, dispatch an action, etc.)
          // For example:
          // setFilteredStudents(filteredStudents);
          console.log(filteredStudents);
        }
      }, [results]); // Dependency array with results
      
      // Ensure that `results` and `teacherInfo.teachSubject._id` are provided as dependencies
      // to trigger the effect whenever these values change.
      
//console.log(filteredStudents);

    const changeHandler = (event) => {
        const selectedSubject = subjectsList.find(
            (subject) => subject.subName === event.target.value
        );
        setSubjectName(selectedSubject.subName);
        setChosenSubName(selectedSubject._id);
    }

    const fields = { subName: chosenSubName}

    const submitHandler = (event) => {
        event.preventDefault()
        setLoader(true)
        dispatch(updateStudentFields(studentID, fields, "StudentAttendance"))
    }

    useEffect(() => {
        if (response) {
            setLoader(false)
            setShowPopup(true)
            setMessage(response)
        }
        else if (error) {
            setLoader(false)
            setShowPopup(true)
            setMessage("error")
        }
        else if (statestatus === "added") {
            setLoader(false)
            setShowPopup(true)
            setMessage("Done Successfully")
        }
    }, [response, statestatus, error])

    return (
        <>
            {loading
                ?
                <>
                    <div>Loading...</div>
                </>
                :
                <>
                    <Box
                        sx={{
                            flex: '1 1 auto',
                            alignItems: 'center',
                            display: 'flex',
                            justifyContent: 'center'
                        }}
                    >
                        <Box
                            sx={{
                                maxWidth: 550,
                                px: 3,
                                py: '100px',
                                width: '100%'
                            }}
                        >
                            <Stack spacing={1} sx={{ mb: 3 }}>
                                
                                {currentUser.teachSubject &&
                                    <Typography variant="h4">
                                        Subject Name: {currentUser.teachSubject?.subName}
                                    </Typography>
                                }
                            </Stack>
                            <form onSubmit={submitHandler}>
                                <Stack spacing={3}>
                                    
                                    <FormControl fullWidth>
                                        <InputLabel id="demo-simple-select-label">Choose Types</InputLabel>
                                        <Select
                                            labelId="demo-simple-select-label"
                                            id="demo-simple-select"
                                            //value={status}
                                            label="Choose an option"
                                            onChange={(event) => setStatus(event.target.value)}
                                            required
                                        >
                                            <MenuItem value="exam">Exam Marks</MenuItem>
                                            <MenuItem value="progress">Progress Marks</MenuItem>
                                            <MenuItem value="quiz">Quiz Marks</MenuItem>
                                            <MenuItem value="attendance">Attendance</MenuItem>
                                        </Select>
                                    </FormControl>
                                    <FormControl>
                                        <TextField
                                            label="Given Marks"
                                            type="number"
                                            value={givenMarks}
                                            onChange={(event) => setGivenMarks(event.target.value)} required
                                            InputLabelProps={{
                                                shrink: true,
                                            }}
                                        />
                                    </FormControl>
                                    <FormControl>
                                        <TextField
                                            label="New Marks"
                                            type="number"
                                            value={newMarks}
                                            onChange={(event) => setNewmarks(event.target.value)} required
                                            InputLabelProps={{
                                                shrink: true,
                                            }}
                                        />
                                    </FormControl>
                                </Stack>

                                <PurpleButton
                                    fullWidth
                                    size="large"
                                    sx={{ mt: 3 }}
                                    variant="contained"
                                    type="submit"
                                    disabled={loader}
                                >
                                    {loader ? <CircularProgress size={24} color="inherit" /> : "Submit"}
                                </PurpleButton>
                            </form>
                        </Box>
                    </Box>
                    <Popup message={message} setShowPopup={setShowPopup} showPopup={showPopup} />
                </>
            }
        </>
    )
}

export default TeacherEvaluationForm 


