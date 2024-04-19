import * as Action from '../../../../redux/QuizRelated/resultReducer'
import { postServerData } from '../Helper'
import React, { useEffect, useState } from 'react';

export const PushAnswer = (result) => async (dispatch) => {
    try {
        await dispatch(Action.pushResultAction(result))
    } catch (error) {
        console.log(error)
    }
}

export const updateResult = (index) => async (dispatch) => {
    try {
        dispatch(Action.updateResultAction(index));
    } catch (error) {
        console.log(error)
    }
}

/** insert user data */

export const usePublishResult = (id, resultData) => {

    useEffect(() => {
      const publishResult = async () => {
        try {
  
          // Make the HTTP POST request to the server
          const response = await postServerData(`https://elearningsite-server.onrender.com/result/${id}`, resultData, data => data);
  
          //console.log('Result published successfully:', response.data); // Log the response data
        } catch (error) {
          console.error('Error publishing result:', error); // Log the error if request fails
        }
      };
  
      // Call publishResult when id or resultData changes
      if (id && resultData) {
        publishResult();
      }
    }, [id, resultData]);
  };

// export const usePublishResult = (id, resultData) => {
//     (async () => {
//         try {
//             //  if(result !== []) throw new Error("Couldn't get Result");
//             await postServerData(`https://elearningsite-server.onrender.com/result/${id}`, resultData, data => data)
//         } catch (error) {
//             console.log(error)
//         }
//     })();
// }