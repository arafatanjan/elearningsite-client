import React, { useEffect, useState } from 'react'
import axios from "axios";
import CustomBarChart from '../../../components/CustomBarChart'
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from 'recharts';
import { useDispatch, useSelector } from 'react-redux';
import { getAllSubjectDetails } from '../../../redux/sclassRelated/sclassHandle';
import './QuizAnalysis.css';
import _ from 'lodash';

const QuizAnalysisSixth = () => {
  const dispatch = useDispatch();
    const [results, setResults] = useState([]);
    const { userDetails, currentUser, loading, response, error } = useSelector((state) => state.user);
    const { subjectDetails, subjectsList } = useSelector((state) => state.sclass);
    const [subjectID, setsubjectID] = useState();
    //??const [subjectNames, setSubjectNames] = useState('');
    const [subjectNames, setSubjectNames] = useState([]);
    //console.log( userDetails.examResult)
    

    useEffect(() => {
        getAllResults();
        ////console.log(na?.property?.semester);
        ////console.log(results)
      }, []);
    
      const getAllResults = () => {
        axios
          .get(`https://elearningsite-server.onrender.com/Students/${currentUser.school._id}`)
          .then((result) => {
            setResults(result.data);
          })
          .catch((error) => {
            setResults([]);
            //console.log(error);
            alert("Error happened!");
          });     
      };

      //console.log(results);

      // Initialize an empty object to store the result
      const resultArray = {};
      
      // Iterate through each student in the Studentdetails array
      results.forEach(student => {
        const studentName = student.name;
      
        // Iterate through each exam result of the student
        student.examResult.forEach(result => {
          const subjectName = result.subName;
      
          // If the subject doesn't exist in the resultArray, create an empty object for it
          if (!resultArray[subjectName]) {
            resultArray[subjectName] = {};
          }
      
          // Assign the marksObtained to the corresponding student in the subject object
          resultArray[subjectName][studentName] = result.marksObtained;
        });
      });
      
      //console.log(resultArray);


      //console.log(Studentdetails)
        //console.log(studentName)
        const nam = results.map(student => student.name);
        const a= nam.includes(currentUser.name) ? currentUser.name : '';
        //console.log(nam);

        const resultArrayAsArray = Object.entries(resultArray).map(([subject, studentMarks]) => ({
            subject,
            studentMarks,
          }));

          //console.log(resultArrayAsArray)

        
        const chartData = resultArrayAsArray.map(subjectData => {
            const studentMarks = subjectData.studentMarks;
            const studentNames = Object.keys(studentMarks);
        
            // Calculate the first student's marks obtained
            const firstStudentMarks = studentMarks[studentNames[0]];
        
            // Calculate the highest marks obtained
            const highestMarks = Math.max(...Object.values(studentMarks));
        
            // Calculate the average marks obtained
            const averageMarks = Object.values(studentMarks).reduce((sum, marks) => sum + marks, 0) / studentNames.length;
        
            return {
              subject: subjectData.subject,
              YourMarks: firstStudentMarks,
              highestMarks,
              averageMarks,
            };
        })
        //console.log(chartData);

    
        useEffect(() => {
          const fetchSubjectNames = async () => {
              const subjectID = currentUser.school._id;
              try {
                await dispatch(getAllSubjectDetails(subjectID, 'AllSubjects'));
              } catch (error) {
                console.error(`Error fetching subject details for ${subjectID}:`, error);
                
              }
          };
        
          // Call fetchSubjectNames only when chartData or dispatch changes
          
            fetchSubjectNames();
          
        }, []);
        //console.log(subjectsList)


// Map over chartData and update subject with subName based on _id match
// const updatedChartsData = chartData.map(data => { const matchingSubject = subjectsList.find(subject => subject._id === data.subject);

//   const updatedChartsData = chartData.map(data => {
//     const matchingSubject = subjectsList.find(subject => subject._id === data.subject);
//     // Perform operations if needed
//     return { ...data, matchingSubject }; // Example of updating the data object
//   });


//   const filteredChartsData = updatedChartsData.filter(data => 
//     userDetails.examResult.some(result => result.subName.id === data.subject)
//   );
  
  // Handle data mapping
  // const updatedData = updatedChartsData.map(data => {
  //   const matchingSubject = subjectsList.find(subject => subject._id === data.subject);
  //   if (matchingSubject) {
  //     return {
  //       ...data,
  //       subject: matchingSubject.subName // Replace subject ID with subName
  //     };
  //   } else {
  //     return data; // No match found, keep original data
  //   }
  // });
  const updatedChartsData = chartData.map(data => { const matchingSubject = subjectsList.find(subject => subject._id === data.subject);

    if (matchingSubject) {
      return {
        ...data,
        subject: matchingSubject.subName // Replace subject ID with subName
      };
    } else {
      return data; // No match found, keep original data
    }
  });

  const filteredChartsData = updatedChartsData.filter(data => 
    userDetails.examResult.some(result => result.subName.subName === data.subject)
  );
  //console.log(filteredChartsData); 
 

    return (
      <div>
      <h2 className="video-watches-title">Semester Final Marks</h2>
      <ResponsiveContainer width="50%" height={200}>
        <BarChart data={ filteredChartsData} margin={{ top: 20, right: 30, left: 20, bottom: 5 }}>
          <CartesianGrid strokeDasharray="3 3" />
          <XAxis dataKey="subject" />
          <YAxis domain={[0, 100]} />
          <Tooltip />
          <Legend />
          <Bar dataKey="YourMarks" fill="#8884d8" barSize={40} />
          <Bar dataKey="highestMarks" fill="#82ca9d" barSize={40} />
          <Bar dataKey="averageMarks" fill="#ffc658" barSize={40} />
        </BarChart>
      </ResponsiveContainer>
    </div>
    );
};

export default QuizAnalysisSixth;

// const chartsData = Object.entries(resultArray).map(([subject, studentMarks]) => ({
        //     subject,
        //     avg: Object.values(studentMarks).reduce((sum, marks) => sum + marks, 0) / Object.keys(studentMarks).length,
        //     highest: Math.max(...Object.values(studentMarks)),
        //     points: studentMarks[currentUser.name] || 0,
        //   }));

        // const chartsData = resultArrayAsArray.map((data, index) => ({
        //     name: 'Chart ' + (index + 1),
        //     avg: data.reduce((sum, entry) => sum + entry.points, 0) / data.length,
        //     highest: Math.max(...data.map(entry => entry.points)),
        //     points: data.filter(result => result.username === currentUser.name)
        //     .map((result, index) => result.points),
        //     //arafatPoints : finalArray.find(student => student.username === currentUser.name)?.points || 0,
        //   }));


//console.log(updatedChartsData);
      // useEffect(() => {
      //   const fetchSubjectDetails = async () => {
      //     const updatedSubjectNames = [];
    
      //     for (const chartItem of chartData) {
      //       const subjectID = chartItem.subject;
    
      //       try {
      //         await dispatch(getSubjectDetails(subjectID, 'Subject'));
                //   console.log('subjectsList:', subjectsList);
      //         const matchedSubject = subjectsList.find((subject) => subject._id === subjectID);
    
      //         if (matchedSubject) {
      //           updatedSubjectNames.push({
      //             courseID: subjectID,
      //             courseName: matchedSubject.subName
      //           });
      //         }
      //       } catch (error) {
      //         console.error(`Error fetching subject details for ${subjectID}:`, error);
      //         // Handle error if needed
      //       }
      //     }
    
      //     setSubjectNames(updatedSubjectNames);
      //   };
    
      //   if (chartData.length > 0) {
      //     fetchSubjectDetails();
      //   }
      // }, [chartData, dispatch, subjectsList]);
    
      // // Log subjectsList and subjectNames after useEffect runs
      // useEffect(() => {
      //   console.log('subjectsList:', subjectsList);
      //   console.log('subjectNames:', subjectNames);
      // }, [subjectsList, subjectNames]);
