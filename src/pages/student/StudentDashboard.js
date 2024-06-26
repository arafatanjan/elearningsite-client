import { useState } from 'react';
import {
    CssBaseline,
    Box,
    Toolbar,
    List,
    Typography,
    Divider,
    IconButton,
} from '@mui/material';
import MenuIcon from '@mui/icons-material/Menu';
import ChevronLeftIcon from '@mui/icons-material/ChevronLeft';
import StudentSideBar from './StudentSideBar';
import { Navigate, Route, Routes } from 'react-router-dom';
import StudentHomePage from './StudentHomePage';
import StudentProfile from './StudentProfile';
import StudentSubjects from './StudentSubjects';
import ViewStdAttendance from './ViewStdAttendance';
import Front from './Quiz/Front';
import Quiz from './Quiz/Quiz'
import Result from "./Quiz/Result";
import ResultTable from "./Quiz/ResultTable";
import StudentComplain from './StudentComplain';
import QuizAnalysis from './Anlysis/QuizAnalysis';
import Logout from '../Logout'
import AccountMenu from '../../components/AccountMenu';
import { AppBar, Drawer } from '../../components/styles';
import Tutorial from './Media/Tutorial';
import QuizAnalysisSecond from './Anlysis/QuizAnalysisSecond';
import QuizAnalysisFirst from './Anlysis/QuizAnalysisFirst';
import Suggestion from './Suggestion/Suggestion';
import Question from './Quiz/Question';
import StudentQuizMarks from './Quiz/StudentQuizMarks';
import ViewQuestion from './StudentQuestion/ViewQuestion';
import FinalResult from './Resultcard/FinalResult';

const StudentDashboard = () => {
    const [open, setOpen] = useState(true);
    const toggleDrawer = () => {
        setOpen(!open);
    };

    return (
        <>
            <Box sx={{ display: 'flex' }}>
                <CssBaseline />
                <AppBar open={open} position='absolute'>
                    <Toolbar sx={{ pr: '24px' }}>
                        <IconButton
                            edge="start"
                            color="inherit"
                            aria-label="open drawer"
                            onClick={toggleDrawer}
                            sx={{
                                marginRight: '36px',
                                ...(open && { display: 'none' }),
                            }}
                        >
                            <MenuIcon />
                        </IconButton>
                        <Typography
                            component="h1"
                            variant="h6"
                            color="inherit"
                            noWrap
                            sx={{ flexGrow: 1 }}
                        >
                            Student Dashboard
                        </Typography>
                        <AccountMenu />
                    </Toolbar>
                </AppBar>
                <Drawer variant="permanent" open={open} sx={open ? styles.drawerStyled : styles.hideDrawer}>
                    <Toolbar sx={styles.toolBarStyled}>
                        <IconButton onClick={toggleDrawer}>
                            <ChevronLeftIcon />
                        </IconButton>
                    </Toolbar>
                    <Divider />
                    <List component="nav">
                        <StudentSideBar />
                    </List>
                </Drawer>
                <Box component="main" sx={styles.boxStyled}>
                    <Toolbar />
                    <Routes>
                        <Route path="/" element={<StudentHomePage />} />
                        <Route path='*' element={<Navigate to="/" />} />
                        <Route path="/Student/dashboard" element={<StudentHomePage />} />
                        <Route path="/Student/profile" element={<StudentProfile />} />
                        <Route path="/Student/subjects" element={<StudentSubjects />} />
                        <Route path="/Student/attendance" element={<ViewStdAttendance />} />
                        <Route path="/Student/viewquestion" element={<ViewQuestion/>} />
                        <Route path="/Student/quiz" element={<Front />} />
                        <Route path="/Student/tutorial" element={<Tutorial />} />
                        <Route path="/Student/quiz/:course/:category" element={<Question/>} />
                        <Route path="/Student/quiz/test/result/:course/:category" element={<Result></Result>}></Route>
                        <Route path="/Student/StudentQuizMarks" element={<StudentQuizMarks />} />
                        <Route path="/Student/complains" element={<StudentComplain />} />
                        <Route path="/Student/analysis" element={<QuizAnalysisFirst />} />
                        <Route path="/Student/suggestion" element={<Suggestion />} />
                        <Route path="/Student/finalResult" element={<FinalResult />} />

                        <Route path="/logout" element={<Logout />} />
                    </Routes>
                    
                </Box>              
            </Box>           
        </>
    );
}

export default StudentDashboard

const styles = {
    boxStyled: {
        backgroundColor: (theme) =>
            theme.palette.mode === 'light'
                ? theme.palette.grey[100]
                : theme.palette.grey[900],
        flexGrow: 1,
        height: '100vh',
        overflow: 'auto',
    },
    toolBarStyled: {
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'flex-end',
        px: [1],
    },
    drawerStyled: {
        display: "flex"
    },
    hideDrawer: {
        display: 'flex',
        '@media (max-width: 600px)': {
            display: 'none',
        },
    },
}