import React, { useEffect, useState } from 'react'
import { getServerData } from '../../student/Quiz/Helper'
import { useDispatch, useSelector } from 'react-redux';

const QuizResultTable = () => {
    const [data, setData] = useState([])
    //const { subjectDetails, subjectsList } = useSelector((state) => state.sclass);
    const subjectsList = [ 
        {
          _id: '6633813f2ee29124b22b9e5c',
          subName: 'Software Project Management',
          subCode: 'CSE 6147',
          sessions: '12',
          sclassName: '663380fc2ee29124b22b9e54',
          school: '663380ce2ee29124b22b9e40',
          __v: 0,
          teacher: '663381882ee29124b22b9e65',
          id: '6633813f2ee29124b22b9e5c'
        },
        {
          _id: '663382052ee29124b22b9e76',
          subName: 'SmartPhone Application',
          subCode: 'CSE 6143',
          sessions: '12',
          sclassName: '663380fc2ee29124b22b9e54',
          school: '663380ce2ee29124b22b9e40',
          __v: 0,
          teacher: '663382542ee29124b22b9e81',
          id: '663382052ee29124b22b9e76'
        },
        {
          _id: '66f15ebb48ce103358fd4c85',
          subName: 'Software Architecture',
          subCode: 'CSE 6009',
          sessions: '12',
          sclassName: '663380fc2ee29124b22b9e54',
          school: '663380ce2ee29124b22b9e40',
          __v: 0,
          teacher: '66f165beb1e76560326644b7',
          id: '66f15ebb48ce103358fd4c85'
        }
    ];

    useEffect(() => {
       getServerData(`https://elearningsite-server.onrender.com/result`, (res) => {
           setData(res)
        })
    }, [])
    console.log(data)
    
    const updatedData = data
    .filter(item => subjectsList.some(subject => subject._id === item.property.course))  // Keep only matching items
    .map(item => {
        const matchedSubject = subjectsList.find(subject => subject._id === item.property.course);
        return {
            ...item,
            property: {
                ...item.property,
                subName: matchedSubject ? matchedSubject.subName : undefined // Add subName if found
            }
        };
    });

console.log(updatedData);


    return (
         <div>
            <table>
                <thead className='table-header'>
                    <tr className='table-row'>
                        <td>Course</td>
                        <td>Category</td>
                        <td>Name</td>
                        <td>Attemps</td>
                        <td>Earn Points</td>
                        <td>Result</td>
                    </tr>
                </thead>
                <tbody>
                    { !data ?? <div>No Data Found </div>}
                    {
                        updatedData.map((v, i) => (
                            <tr className='table-body' key={i}>
                                <td>{v?.property?.subName || ''}</td>
                                <td>{v?.property?.category || ''}</td>
                                <td>{v?.username || ''}</td>
                                <td>{v?.attempts || 0}</td>
                                <td>{v?.points || 0}</td>
                                <td>{v?.achived || ""}</td>
                            </tr>
                        ))
                    }
                    
                </tbody>
            </table>
        </div>
    );
};

export default QuizResultTable;