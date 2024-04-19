import React, { useState, useEffect } from "react";
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer  } from 'recharts';
import axios from "axios";
import { getAllSubjectDetails } from '../../../redux/sclassRelated/sclassHandle';
import { useDispatch, useSelector } from 'react-redux';
import './QuizAnalysis.css';

const QuizAnalysisSecond = () => {
  const dispatch = useDispatch();
    const { currentUser } = useSelector((state) => state.user);
    const { subjectDetails, subjectsList } = useSelector((state) => state.sclass);
  const [subjectID, setsubjectID] = useState();
  const [subjectNames, setSubjectNames] = useState('');
  //console.log(currentUser.school._id)
   
    ////console.log(currentUser.name);
    const [results, setResults] = useState([]);

    useEffect(() => {
        getAllResults();
        ////console.log(na?.property?.semester);
        ////console.log(results)
      }, []);
    
      const getAllResults = () => {
        axios
          .get(`http://localhost:5000/result`)
          .then((result) => {
            setResults(result.data);
          })
          .catch((error) => {
            setResults([]);
            //console.log(error);
            alert("Error happened!");
          });        
      };

      
    const nam = results.map(student => student.username);
    //console.log(nam);
    //const arafatSemester = results.find(student => student.username === currentUser.name)?.property.semester || '';
    const matchingResults = results.filter(student => student.username === currentUser.name);
    const arafatSemester = matchingResults.map(student => student.property.semester) || [];
    //console.log(arafatSemester);

    const groupedArrays = results.reduce((result, student) => {
    const key = `${student.property.course}-${student.property.category}`;
      
        if (!result[key]) {
          result[key] = [];
        }
      
        result[key].push(student);
        return result;
      }, {});
      
      const finalArray = Object.values(groupedArrays);
      

      const chartsData = finalArray.map((data, index) => ({
        name: data.filter(student => student.username === currentUser.name).map(obj => ({
        course: obj.property.course,
        category: obj.property.category})),
        avg: data.reduce((sum, entry) => sum + entry.points, 0) / data.length,
        highest: Math.max(...data.map(entry => entry.points)),
        points: data.filter(result => result.username === currentUser.name)
        .map((result, index) => result.points),
        //arafatPoints : finalArray.find(student => student.username === currentUser.name)?.points || 0,
      }));



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
        if (chartsData.length > 0) {
          fetchSubjectNames();
        }
      }, []);
      //console.log(subjectsList)

      const updatedChartsData = chartsData.map(data => {
        const updatedName = data.name.map(courseInfo => {
          const matchingSubject = subjectsList.find(subject => subject._id === courseInfo.course);
          if (matchingSubject) {
            return {
              ...courseInfo,
              course: matchingSubject.subName
            };
          }
          return courseInfo;
        });
      
        return {
          ...data,
          name: updatedName
        };
      });
      
      //console.log(updatedChartsData);
     
      // useEffect(() => {
      //   const updatedSubjectNames = [];
    
      //   chartsData.forEach((chartItem) => {
      //     const subjectID = chartItem.name[0]; // Assuming name array contains only one subject ID
      //     dispatch(getSubjectDetails(subjectID, 'Subject')).then(() => {
      //       // After dispatching the action, subjectsList should be updated
      //       const matchedSubject = subjectsList.find((subject) => subject._id === subjectID);
      //       if (matchedSubject) {
      //         updatedSubjectNames.push({
      //           courseID: subjectID,
      //           courseName: matchedSubject.subName
      //         });
      //         setSubjectNames(updatedSubjectNames);
      //       }
      //     });
      //   });
      // }, [chartsData, dispatch, subjectsList]);

      ///console.log(subjectsList);
      ///console.log(subjectNames);

      const pointsForArafat = finalArray.flatMap(subarray => 
        subarray
          .filter(result => result.username === currentUser.name)
          .map((result, index) => result.points)
      );
      const arafatPoints= pointsForArafat.map((points, index) => (points ))
      ///console.log(finalArray);
      ///console.log(chartsData);
     
      // const updatedChartsData = chartsData.map(data => {
      //   const updatedName = data.name.map(courseInfo => {
      //     const matchingSubject = subjectNames.find(subject => subject.courseID === courseInfo.course);
      //     if (matchingSubject) {
      //       return {
      //         ...courseInfo,
      //         course: matchingSubject.courseName
      //       };
      //     }
      //     return courseInfo;
      //   });
      
      //   return {
      //     ...data,
      //     name: updatedName
      //   };
      // });
      
      //console.log(updatedChartsData);

      const a= nam.includes(currentUser.name) ? currentUser.name : '';
      const r= chartsData.map((chartData, index) =>chartData.name)
      //console.log(r)
//     const banglaData = nam.includes(currentUser.name)
//   ? [
//       //{ name: 'A', Bangla: studentsData?.student[0].points },
//       { name: `${a}`, Ban: `${arafatPoints}`},
//       { name: 'Average', Ban: average_bangla_quiz_mark },
//       { name: 'Highest', Ban: highest_bangla_quiz_mark }
      
//     ]
//   : [];
// Extracting unique course-category combinations for X-axis labels
//const xAxisLabels = updatedChartsData.map(chartData => `${chartData?.name[0].course} - ${chartData?.name[0].category}`);

// Configuring Y-axis domain based on the maximum value of 'highest' across all data
const maxYAxisValue = Math.max(...updatedChartsData.map(chartData => chartData.highest));
const yAxisDomain = [0, maxYAxisValue + 10]; // Adjusted to provide some padding

return (
  <div>
      <h2 className="video-watches-title">Quiz</h2>
      {nam.includes(currentUser.name) ? (
        <div style={{ display: 'flex', flexWrap: 'wrap' }}>
          <ResponsiveContainer width="70%" height={300}>
            <BarChart data={updatedChartsData} margin={{ top: 20, right: 0, left: 0, bottom: 50 }} barCategoryGap={0} barGap={5}>
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey={(chartData) => `${chartData.name[0].course} - ${chartData.name[0].category}`} tick={{ angle: 0, textAnchor: 'end', dx: 50 }} interval={0} tickLine={false} />
              <YAxis domain={yAxisDomain} />
              <Tooltip />
              <Legend />
              <Bar dataKey="points[0]" fill="#8884d8" name={a} barSize={40}/>
              <Bar dataKey="highest" fill="#82ca9d" name="Highest Marks" barSize={40}/>
              <Bar dataKey="avg" fill="#ffc658" name="Average Marks" barSize={40}/>
            </BarChart>
          </ResponsiveContainer>
        </div>
      ) : <div></div>}
    </div>
);
};



export default QuizAnalysisSecond;
 


