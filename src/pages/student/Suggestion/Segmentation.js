import React, { useEffect, useState } from 'react'
import { getServerData } from '../Quiz/Helper'
import { useDispatch, useSelector } from 'react-redux';

const Segmentation = () => {

    const [data, setData] = useState([])
    const { userDetails, currentUser, loading, response, error } = useSelector((state) => state.user);
//console.log(userDetails)
console.log(currentUser._id)
const [studentID, setStudentID] = useState("");

useEffect(() => {
  
      setStudentID(currentUser._id);
      const stdID = studentID;
}, [currentUser._id]);

     useEffect(() => {
        getServerData(`https://elearningsite-server.onrender.com/result`, (res) => {
            setData(res)
         })
        }, [])

   // Function to process assessment data
  const processAssessmentData = () => {
    
    // Step 1: Group data by username
    const groupedByUsername = {};
    data.forEach(item => {
      if (!groupedByUsername[item.username]) {
        groupedByUsername[item.username] = [];
      }
      groupedByUsername[item.username].push(item);
    });

    // Step 2: Calculate average points for each course for each user
    const averagesByUsername = [];
    for (const username in groupedByUsername) {
      const courses = {};
      groupedByUsername[username].forEach(item => {
        const course = item.property.course;
        if (!courses[course]) {
          courses[course] = [];
        }
        courses[course].push(item.points);
      });

      const averageCoursePoints = {};
      for (const course in courses) {
        const totalPoints = courses[course].reduce((acc, curr) => acc + curr, 0);
        const averagePoints = totalPoints / courses[course].length;
        averageCoursePoints[course] = averagePoints;
      }

      averagesByUsername.push({ username, average: averageCoursePoints });
    }

    return averagesByUsername; // Move this line outside of the loop
  };

  // Step 4: Render the processed data
  const processedData = processAssessmentData();

  console.log(processedData);

     

    return (
        <div>
             <table>
                <thead className='table-header'>
                    <tr className='table-row'>
                        <td>Course Name</td>
                        <td>Segments</td>
                        <td>Performance</td>
                       
                    </tr>
                </thead>
                <tbody>
                    { !data ?? <div>No Data Found </div>}
                    {
                        data.map((v, i) => (
                            <tr className='table-body' key={i}>
                                <td>{}</td>
                                <td>{}</td>
                                <td>{}</td>
                                
                            </tr>
                        ))
                    }
                    
                </tbody>
            </table>
        </div>
    );
};

export default Segmentation;