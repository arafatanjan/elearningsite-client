import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux';
import { getUserDetails } from '../../../redux/userRelated/userHandle';
import { updateStudentFields } from '../../../redux/studentRelated/studentHandle';
//import { getAllStudentdata } from '../../../redux/studentRelated/studentHandle';
import axios from "axios";
import { calculateOverallAttendancePercentage, calculateSubjectAttendancePercentage, groupAttendanceBySubject } from '../../../components/attendanceCalculator';


import {
    Box, InputLabel,
    MenuItem, Select,
    Typography, Stack,
    TextField, CircularProgress, FormControl, Button
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
    const [givenMarks, setGivenMarks] = useState('');
    const [results, setResults] = useState('');
    const [finalData, setFinalData] = useState('');
    const [showPopup, setShowPopup] = useState(false);
    const [message, setMessage] = useState("");
    const [loader, setLoader] = useState(false)
    const [filteredStudents, setFilteredStudents] = useState([]);
    const [subjectAttendance, setSubjectAttendance] = useState([]);
    const [attendanceArray, setAttendanceArray] = useState([]);
    const [finalMarks, setFinalMarks] = useState([]); // State for final marks array
    const [newMarks, setNewMarks] = useState(''); // State for new marks

    //const [teacherInfo, setTeacherInfo] = useState(false)
    //setTeacherInfo(currentUser);
    const teacherInfo=currentUser;
    console.log(teacherInfo);

    
    useEffect(() => {
        getAllStudentdata();
        ////console.log(na?.property?.semester);
        ////console.log(results)
      }, [currentUser]);

    const getAllStudentdata = () => {
        axios
          .get(`https://elearningsite-server.onrender.com/teacher/student/getAllStudent`)
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
          const filteredStudentsArray = results.reduce((filtered, student) => {
            const filteredExamResults = student.examResult.filter(result => result.subName === teacherInfo.teachSubject._id);
            if (filteredExamResults.length > 0) {
              const filteredStudent = {
                _id: student._id,
                name: student.name,
                rollNum: student.rollNum,
                school: student.school,
                teachSubject_id: teacherInfo.teachSubject._id,
                teachSubject_subName: teacherInfo.teachSubject.subName,
                attendance: student.attendance,
                examResult: filteredExamResults,
                sclassName: student.sclassName
              };
              filtered.push(filteredStudent);
            }
            return filtered;
          }, []);
    
          setFilteredStudents(filteredStudentsArray);
        }
      }, [results, teacherInfo.teachSubject._id]);

      //??
    const  filteredStudentss=  [
        {a:1},{b:2}
      ]
    
      console.log(filteredStudents);
      
     
      //let attendanceArray=[];
      useEffect(() => {
        if (filteredStudents && filteredStudents.length > 0) {
          // Map through filteredStudents to extract attendance for each student
          const extractedAttendance = filteredStudents.map((userDetails) => {
            return {
              id: userDetails._id,
              attendance: userDetails.attendance
            };
          });
    
          // Update the attendanceArray state with the extracted attendance data
          setAttendanceArray(extractedAttendance);
    
          // Log attendanceArray within the useEffect to see the updated data
          console.log(extractedAttendance);
        }
      }, [filteredStudents]);
    
      // Log attendanceArray outside the useEffect (will initially be an empty array)
      console.log(attendanceArray);

      // Function to calculate attendance percentage
const calculateAttendancePercentage = (attendance) => {
    const totalSessions = attendance[0].subName.sessions;
    const presents = attendance.filter((entry) => entry.status === 'Present').length;
    const attendancePercentage = (presents / totalSessions) * 100;
    return attendancePercentage.toFixed(2); // Round to two decimal places
  };
  
  // Calculate attendance percentage and build the desired array structure
  const attendanceInfoArray = attendanceArray.map((student) => {
    const { id, attendance } = student;
    
    // Assuming subject details are consistent within each attendance entry for the same subject
    const subjectId = attendance[0].subName.id;
    const subjectName = attendance[0].subName.subName;
    
    const attendancePercentage = calculateAttendancePercentage(attendance);
  
    return {
      studentId: id,
      subjectId,
      subjectName,
      attendancePercentage,
    };
  });
  
  console.log(attendanceInfoArray);

  // Assuming filteredStudent and attendanceInfoArray are defined as provided

// Create a map for attendance percentages based on student IDs
const attendancePercentageMap = {};
attendanceInfoArray.forEach((attendanceInfo) => {
  attendancePercentageMap[attendanceInfo.studentId] = attendanceInfo.attendancePercentage;
});

// Update filteredStudent objects with attendancePercentage where IDs match
const updatedFilteredStudents = filteredStudents.map((student) => {
  const { _id } = student;
  const { attendance, ...studentWithoutAttendance } = student;

  if (attendancePercentageMap[_id]) {
    // If attendance percentage exists for this student ID, update the attendancePercentage property
    return {
      ...studentWithoutAttendance,
      attendancePercentage: attendancePercentageMap[_id],
    };
  } else {
    // If no attendance percentage exists, return the student object as is
    return student;
  }
});

console.log(updatedFilteredStudents);



    const changeHandler = (event) => {
        const selectedSubject = subjectsList.find(
            (subject) => subject.subName === event.target.value
        );
        setSubjectName(selectedSubject.subName);
        setChosenSubName(selectedSubject._id);
    }

    const fields = { subName: chosenSubName}

    const submitHandler = (event) => {
      event.preventDefault();
  
      // Convert givenMarks and newMarks to numbers
      const parsedGivenMarks = parseFloat(givenMarks);
      const parsedNewMarks = parseFloat(newMarks);
  
      // Prepare a new mark object based on the selected status and input values
      const newMark = {
          [status]: {
              givenMarks: parsedGivenMarks,
              newMarks: parsedNewMarks,
          }
      };
  
      // Check if finalMarks already has an entry for the current status
      const existingIndex = finalMarks.findIndex((mark) => mark.hasOwnProperty(status));
  
      if (existingIndex !== -1) {
          // Update existing entry for the same status
          const updatedFinalMarks = finalMarks.map((mark, index) => {
              if (index === existingIndex) {
                  // Update existing entry with new marks
                  return { ...mark, [status]: newMark[status] };
              }
              return mark;
          });
  
          // Update finalMarks state with the updated array
          setFinalMarks(updatedFinalMarks);
      } else {
          // Add new mark object to finalMarks array
          setFinalMarks([...finalMarks, newMark]);
      }
  
      // Reset form fields after submission
      setStatus('');
      setGivenMarks('');
      setNewMarks('');
  };

    console.log(finalMarks);

    const handlePost = () => {
        updatedFilteredStudents.forEach((student) => {
            student?.examResult.forEach((result) => {
                // Update marksObtained based on finalMarks.exam
                result.marksObtained = ((result.marksObtained * finalMarks[0]?.exam.newMarks) / finalMarks[0]?.exam.givenMarks).toFixed(2);
                result.examNewMarks = finalMarks[0]?.exam.newMarks.toFixed(2);
                // Update marksProgress based on finalMarks.progress
                result.marksProgress = ((result.marksProgress * finalMarks[1]?.progress.newMarks) / finalMarks[1]?.progress.givenMarks).toFixed(2);
                result.progressNewMarks = finalMarks[1]?.progress.newMarks.toFixed(2);
                // Update QuizAvg based on finalMarks.quiz
                result.QuizAvg = ((result.QuizAvg * finalMarks[2]?.quiz.newMarks) / finalMarks[2]?.quiz.givenMarks).toFixed(2);
                result.quizNewMarks = finalMarks[2]?.quiz.newMarks.toFixed(2);
            });
          
            // Update attendancePercentage based on finalMarks.attendance
            student.attendancePercentage = ((student.attendancePercentage * finalMarks[3]?.attendance.newMarks) / finalMarks[3]?.attendance.givenMarks).toFixed(2);
            student.attendanceNewMarks= finalMarks[3]?.attendance.newMarks.toFixed(2);
          });
          
          // Log the updated filtered students
          console.log(updatedFilteredStudents);
          
          try {
            const config = {
                headers: {
                    'Content-Type': 'application/json'
                }
            };
        
            axios.post('https://elearningsite-server.onrender.com/Teacher/class/evaluationform', updatedFilteredStudents, config)
                .then(response => {
                    // Handle successful response
                    console.log('Server response:', response.data);
                    alert('Submitted successfully');
                })
                .catch(error => {
                    // Handle Axios request error
                    if (error.response) {
                        // The request was made and the server responded with a status code
                        console.error('Server responded with an error:', error.response.data);
                        console.error('Status code:', error.response.status);
                        alert('Server responded with an error. Please check the console for details.');
                    } else if (error.request) {
                        // The request was made but no response was received
                        console.error('Request made but no response received:', error.request);
                        alert('Request made but no response received. Please check the console for details.');
                    } else {
                        // Something else happened while setting up the request
                        console.error('Error setting up the request:', error.message);
                        alert('Error setting up the request. Please check the console for details.');
                    }
                });
        } catch (error) {
            // Handle general JavaScript error
            console.error('Error happened:', error);
            
        }  
    };

    console.log(updatedFilteredStudents);


    // const submitHandler = (event) => {
    //     event.preventDefault()
    //     setLoader(true)
    //     dispatch(updateStudentFields(studentID, fields, "StudentAttendance"))
    // }

    // useEffect(() => {
    //     if (response) {
    //         setLoader(false)
    //         setShowPopup(true)
    //         setMessage(response)
    //     }
    //     else if (error) {
    //         setLoader(false)
    //         setShowPopup(true)
    //         setMessage("error")
    //     }
    //     else if (statestatus === "added") {
    //         setLoader(false)
    //         setShowPopup(true)
    //         setMessage("Done Successfully")
    //     }
    // }, [response, statestatus, error])


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
                                            value={status}
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
                                            onChange={(event) => setNewMarks(event.target.value)} required
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
                                
                                <Button variant="contained"  size="large" sx={{ width: '100%' }} color="secondary" onClick={handlePost}>
                    Post
                </Button>
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


