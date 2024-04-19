import { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
// import data, {answer} from '../Data';
import { useParams } from "react-router-dom";
/** redux actions */
import * as Action from "../../../../redux/QuizRelated/questionReducer";
import { getServerData } from "../Helper";

export const useFetchQestion = () => {
  const dispatch = useDispatch();
  const [getData, setGetData] = useState({
    isLoading: false,
    apiData: [],
    serverError: null,
  });
  const { semester, year, course, category } = useParams({});
  const [bodydata, setBodydata] = useState("");
  const [latestdata, setLatestdata] = useState("");

  useEffect(() => {
    setGetData((prev) => ({ ...prev, isLoading: true }));

    /** async function fetch backend data */
    (async () => {
      try {
        // let question = await data;
        //  const q=await getServerData(`http://localhost:8080/api/questions`,(data)=> data);
        //  console.log(q)
        //const [{question, answer}]=await getServerData(`https://elearningsite-server.onrender.com/questions`,(data)=> data);
        //console.log({question, answer})
        // async function fetchData() {
        //     try {

        const blogsData = await getServerData(
          "http://localhost:5000/questions",
          (data) => data
        );

        // console.log(blogsData);

        // const blogdata = blogsData.map((blog) => {
        //   blog.filter((item) => 
        //   item?.properties?.semester === semester &&
        //   item?.blog?.properties?.year === year &&
        //   item?.blog?.properties?.course === course &&
        //   item?.blog?.properties?.category === category
        // )});
        const blogdata = blogsData.filter((item) => 
           //console.log(item.properties.year)
          // console.log(semester);
           item?.properties?.semester === semester &&
             item?.properties?.year === year &&
            item?.properties?.course === course &&
           item?.properties?.category === category
        
        );
        console.log(blogdata);
        // setLatestdata(blogdata)
         const [{question, answer}]= blogdata;

        //    return {
        //       question,
        //        answer
        //   };
          //});

        //     //   console.log(mappedData); // Do something with the mapped data
        //     } catch (error) {
        //       console.error('Error fetching data:', error);
        //     }
        //   }
        // Call the fetchData function
        //fetchData();
        //const blogData = blogsData.filter((blog)=> blog?.properties?.semester== semester && blog?.properties?.year== year && blog?.properties?.course== course && blog?.properties?.category== category);
        //  console.log(question)
        //setBodydata(blogData);
        // const [{question, answer}]= bodydata;
        // if(question?.map((q=>q.length > 0))){
        if (question.length > 0) {
          setGetData((prev) => ({ ...prev, isLoading: false }));
          setGetData((prev) => ({ ...prev, apiData: question }));
          /** dispatch an action */
          //  dispatch(Action.startExamAction({ question : questions, answers }))
          dispatch(Action.startExamAction({ question, answer }));
        } else {
          throw new Error("No Question Avalibale");
        }
      } catch (error) {
        setGetData((prev) => ({ ...prev, isLoading: false }));
        setGetData((prev) => ({ ...prev, serverError: error }));
      }
    })();
  }, [dispatch]);
  return [getData, setGetData];
};

export const MoveNextQuestion = () => async (dispatch) => {
  try {
    dispatch(Action.moveNextAction()); /** increase trace by 1 */
  } catch (error) {
    console.log(error);
  }
};

export const MovePrevQuestion = () => async (dispatch) => {
  try {
    dispatch(Action.movePrevAction()); /** decrease trace by 1 */
  } catch (error) {
    console.log(error);
  }
};
