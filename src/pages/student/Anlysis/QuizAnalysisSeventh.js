import React, { useEffect, useState } from 'react'
import axios from "axios";
import CustomBarChart from '../../../components/CustomBarChart'
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from 'recharts';
import { useDispatch, useSelector } from 'react-redux';
import { getAllSubjectDetails } from '../../../redux/sclassRelated/sclassHandle';
import './QuizAnalysis.css';

const QuizAnalysisSixth = () => {
  const dispatch = useDispatch();
    const [results, setResults] = useState([]);
    const { userDetails, currentUser, loading, response, error } = useSelector((state) => state.user);
    const { subjectDetails, subjectsList } = useSelector((state) => state.sclass);
    const [subjectID, setsubjectID] = useState();
    const [subjectNames, setSubjectNames] = useState([]);

    useEffect(() => {
        getAllResults();
        ////console.log(na?.property?.semester);
        ////console.log(results)
      }, []);
    
      const getAllResults = () => {
        axios
          .get(`http://localhost:5000/Students/${currentUser.school._id}`)
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
      
          // Assign the marksProgress to the corresponding student in the subject object
          resultArray[subjectName][studentName] = result.marksProgress;
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
              firstStudentMarks,
              highestMarks,
              averageMarks,
            };
        })

        useEffect(() => {
          const fetchSubjectNames = async () => {
              const subjectID = currentUser.school._id;
              try {
                await dispatch(getAllSubjectDetails(subjectID, 'AllSubjects'));
              } catch (error) {
                console.error(`Error fetching subject details for ${subjectID}:`, error);
                // Handle error if needed
              }
          };
        
          // Call fetchSubjectNames only when chartData or dispatch changes
          if (chartData.length > 0) {
            fetchSubjectNames();
          }
        }, []);
        console.log(subjectsList)

        // Map over chartData and update subject with subName based on _id match
const updatedChartsData = chartData.map(data => {
  const matchingSubject = subjectsList.find(subject => subject._id === data.subject);

  if (matchingSubject) {
    return {
      ...data,
      subject: matchingSubject.subName // Replace subject ID with subName
    };
  } else {
    return data; // No match found, keep original data
  }
});

console.log(updatedChartsData);

    return (
        <div>
            <h2 className="video-watches-title">Class Progress Marks</h2>
        <ResponsiveContainer width="50%" height={250}>
      <BarChart data={updatedChartsData} margin={{ top: 20, right: 30, left: 20, bottom: 5 }}>
        <CartesianGrid strokeDasharray="3 3" />
        <XAxis dataKey="subject" />
        <YAxis domain={[0, 30]}/>
        <Tooltip />
        <Legend />
        <Bar dataKey="firstStudentMarks" fill="#8884d8" name={`${a}`} barSize={40}/>
        <Bar dataKey="highestMarks" fill="#82ca9d" name="Highest" barSize={40}/>
        <Bar dataKey="averageMarks" fill="#ffc658" name="Average" barSize={40}/>
      </BarChart>
    </ResponsiveContainer>
    </div>
    );
};

export default QuizAnalysisSixth;