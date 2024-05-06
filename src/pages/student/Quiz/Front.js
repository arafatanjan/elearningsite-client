
import React, { useEffect, useState, useRef } from 'react';
// import { useDispatch } from 'react-redux'
 import { Link } from 'react-router-dom'
 import "./Front.css"
import QuizCard from './QuizCard';
import axios from 'axios';

const Front = () => {
    const inputRef = useRef(null)
    const [quizes, setQuizes] = useState([])
    

    // useEffect(() => {
    //     fetch('https://elearningsite-server.onrender.com/questions')

    //         // fetch('services.json')
    //         .then(res => res.json())
    //         .then(data => {
    //             setQuizes(data);
                
    //         })
    // }, []);
    
    useEffect(() => {
        // Define an async function to use with useEffect
        const fetchData = async () => {
            try {
                // Make a GET request using Axios
                const response = await axios.get('https://elearningsite-server.onrender.com/questions');
                
                // Extract the data from the response
                const data = response.data;
    
                // Update the state with the fetched data
                setQuizes(data);
                //  console.log(data);
            } catch (error) {
                // Handle errors
                console.error('Error fetching data:', error);
            }
        };
    
        // Call the async function
        fetchData();
    }, []);


    return (
        <div>
        <br />
        <div className='service-container ' id="quizes">
            {
                quizes && quizes?.map((quiz, index) =>( <QuizCard
                    key={quiz._id}
                    quiz={quiz}>
                </QuizCard>
                )
                )
            }
        </div>
    </div>
    );
     
    };

export default Front;