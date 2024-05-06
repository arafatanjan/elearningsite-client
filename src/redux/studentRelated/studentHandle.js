import axios from 'axios';
import {
    getRequest,
    getSuccess,
    getFailed,
    getError,
    stuffDone
} from './studentSlice';

export const getAllStudents = (id) => async (dispatch) => {
    dispatch(getRequest());

    try {
        const result = await axios.get(`https://elearningsite-server.onrender.com/Students/${id}`);
        if (result.data.message) {
            dispatch(getFailed(result.data.message));
        } else {
            dispatch(getSuccess(result.data));
        }
    } catch (error) {
        dispatch(getError(error));
    }
}

export const updateStudentFields = (id, fields, address) => async (dispatch) => {
    dispatch(getRequest());

    try {
        const result = await axios.put(`https://elearningsite-server.onrender.com/${address}/${id}`, fields, {
            headers: { 'Content-Type': 'application/json' },
        });
        if (result.data.message) {
            dispatch(getFailed(result.data.message));
        } else {
            dispatch(stuffDone());
        }
    } catch (error) {
        dispatch(getError(error));
    }
}
export const updateStudentProgressFields = (id, fields, address) => async (dispatch) => {
    dispatch(getRequest());

    try {
        const result = await axios.put(`https://elearningsite-server.onrender.com/${address}/${id}`, fields, { 
            headers: { 'Content-Type': 'application/json' },
        });
        if (result.data.message) {
            dispatch(getFailed(result.data.message));
            console.log(result.data.message)
        } else {
            dispatch(stuffDone());
            console.log("success")
        }
    } catch (error) {
        dispatch(getError(error));
        console.log("fail")
    }
}

export const updateStudentQuizFields = (id, fields, address) => async (dispatch) => {
    dispatch(getRequest());
    
    try {
        // Convert fields to JSON string to ensure serializability
        const fieldsJson = JSON.stringify(fields);

        const result = await axios.put(`https://elearningsite-server.onrender.com/${address}/${id}`, fieldsJson, { 
            headers: { 'Content-Type': 'application/json' },
        });

        if (result.data.message) {
            dispatch(getFailed(result.data.message));
            console.log(result.data.message)
        } else {
            dispatch(stuffDone());
            console.log("success")
        }
    } catch (error) {
        dispatch(getError(error));
        console.log(error)
    }
}


// export const updateStudentQuizFields = (id, fields, address) => async (dispatch) => {
//     dispatch(getRequest());
    
//     try {
//         const result = await axios.put(`https://elearningsite-server.onrender.com/${address}/${id}`, fields, { 
//             headers: { 'Content-Type': 'application/json' },
//         });
//         if (result.data.message) {
//             dispatch(getFailed(result.data.message));
//             console.log(result.data.message)
//         } else {
//             dispatch(stuffDone());
//             console.log("success")
//         }
//     } catch (error) {
//         dispatch(getError(error));
//         console.log(error)
//     }
// }

export const removeStuff = (id, address) => async (dispatch) => {
    dispatch(getRequest());

    try {
        const result = await axios.put(`https://elearningsite-server.onrender.com/${address}/${id}`);
        if (result.data.message) {
            dispatch(getFailed(result.data.message));
        } else {
            dispatch(stuffDone());
        }
    } catch (error) {
        dispatch(getError(error));
    }
}