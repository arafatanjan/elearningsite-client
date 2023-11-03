import { useEffect, useState } from "react"
import { useDispatch } from "react-redux";
// import data, {answer} from '../Data';

/** redux actions */
import * as Action from '../../../../redux/QuizRelated/questionReducer';
import { getServerData } from "../Helper";

export const useFetchQestion = () => {
     const dispatch = useDispatch();   
    const [getData, setGetData] = useState({ isLoading : false, apiData : [], serverError: null});

    useEffect(() => {
        setGetData(prev => ({...prev, isLoading : true}));

        /** async function fetch backend data */
        (async () => {
            try {
                // let question = await data;
                //  const q=await getServerData(`http://localhost:8080/api/questions`,(data)=> data);
                //  console.log(q)
                const [{question, answer}]=await getServerData(`http://localhost:5000/questions`,(data)=> data);
                //  console.log(question)
               
                // if(question?.map((q=>q.length > 0))){
                 if(question.length > 0){
                setGetData(prev => ({...prev, isLoading : false}));
                setGetData(prev => ({...prev, apiData : question}));
                 /** dispatch an action */
                //  dispatch(Action.startExamAction({ question : questions, answers }))
                  dispatch(Action.startExamAction( {question, answer} ))
               }
               else{
                throw new Error("No Question Avalibale");
               }
            }
            catch (error) {
                setGetData(prev => ({...prev, isLoading : false}));
                setGetData(prev => ({...prev, serverError : error}));
            }
        })(); 
                
    },[dispatch] );
    return [getData, setGetData];
}

export const MoveNextQuestion = () => async (dispatch) => {
    try {
        dispatch(Action.moveNextAction()); /** increase trace by 1 */
    } catch (error) {
        console.log(error)
    }
}

export const MovePrevQuestion = () => async (dispatch) => {
    try {
        dispatch(Action.movePrevAction()); /** decrease trace by 1 */
    } catch (error) {
        console.log(error)
    }
}