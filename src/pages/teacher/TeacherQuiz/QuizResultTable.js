import React, { useEffect, useState } from 'react'
import { getServerData } from '../../student/Quiz/Helper'

const QuizResultTable = () => {
    const [data, setData] = useState([])

    useEffect(() => {
       getServerData(`http://localhost:5000/result`, (res) => {
           setData(res)
        })
    }, [])
    console.log(data)

    return (
         <div>
            <table>
                <thead className='table-header'>
                    <tr className='table-row'>
                        <td>Name</td>
                        <td>Attemps</td>
                        <td>Earn Points</td>
                        <td>Result</td>
                    </tr>
                </thead>
                <tbody>
                    { !data ?? <div>No Data Found </div>}
                    {
                        data.map((v, i) => (
                            <tr className='table-body' key={i}>
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