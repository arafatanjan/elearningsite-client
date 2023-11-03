import { configureStore } from '@reduxjs/toolkit';
import { userReducer } from './userRelated/userSlice';
import { studentReducer } from './studentRelated/studentSlice';
import { noticeReducer } from './noticeRelated/noticeSlice';
import { sclassReducer } from './sclassRelated/sclassSlice';
import { teacherReducer } from './teacherRelated/teacherSlice';
import { complainReducer } from './complainRelated/complainSlice';
import { combineReducers} from '@reduxjs/toolkit';
import questionReducer from './QuizRelated/questionReducer';
import resultReducer from './QuizRelated/resultReducer';


const store = configureStore({
    reducer: {
        user: userReducer,
        student: studentReducer,
        teacher: teacherReducer,
        notice: noticeReducer,
        complain: complainReducer,
        sclass: sclassReducer,
        question : questionReducer,
        result : resultReducer
    },
});

/** create store with reducer */
// export default configureStore({ reducer : rootReducer});

export default store;


