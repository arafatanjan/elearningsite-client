import * as React from 'react';
import { Divider, ListItemButton, ListItemIcon, ListItemText, ListSubheader } from '@mui/material';
import { Link, useLocation } from 'react-router-dom';

import HomeIcon from '@mui/icons-material/Home';
import ExitToAppIcon from "@mui/icons-material/ExitToApp";
import AccountCircleOutlinedIcon from "@mui/icons-material/AccountCircleOutlined";
import AnnouncementOutlinedIcon from '@mui/icons-material/AnnouncementOutlined';
import ClassOutlinedIcon from '@mui/icons-material/ClassOutlined';
import { useSelector } from 'react-redux';

const TeacherSideBar = () => {
    const { currentUser } = useSelector((state) => state.user);
    const sclassName = currentUser.teachSclass

    const location = useLocation();
    return (
        <>
            <React.Fragment>
                <ListItemButton component={Link} to="/">
                    <ListItemIcon>
                        <HomeIcon color={location.pathname === ("/" || "/Teacher/dashboard") ? 'primary' : 'inherit'} />
                    </ListItemIcon>
                    <ListItemText primary="Home" />
                </ListItemButton>
                <ListItemButton component={Link} to="/Teacher/class">
                    <ListItemIcon>
                        <ClassOutlinedIcon color={location.pathname.startsWith("/Teacher/class") ? 'primary' : 'inherit'} />
                    </ListItemIcon>
                    <ListItemText primary={`Class ${sclassName.sclassName}`} />
                </ListItemButton>
                {/* <ListItemButton component={Link} to="/Teacher/quizform">
                    <ListItemIcon>
                        <AnnouncementOutlinedIcon color={location.pathname.startsWith("/Teacher/quizform") ? 'primary' : 'inherit'} />
                    </ListItemIcon>
                    <ListItemText primary="Quiz" />
                </ListItemButton> */}
                <ListItemButton component={Link} to="/Teacher/quizfront">
                    <ListItemIcon>
                        <AnnouncementOutlinedIcon color={location.pathname.startsWith("/Teacher/quizfront") ? 'primary' : 'inherit'} />
                    </ListItemIcon>
                    <ListItemText primary="Quiz" />
                </ListItemButton>
                <ListItemButton component={Link} to="/Teacher/tutorial">
                    <ListItemIcon>
                        <ClassOutlinedIcon color={location.pathname.startsWith("/Teacher/tutorial") ? 'primary' : 'inherit'} />
                    </ListItemIcon>
                    <ListItemText primary="Tutorial" />
                </ListItemButton>
                <ListItemButton component={Link} to="/Teacher/questions">
                    <ListItemIcon>
                        <ClassOutlinedIcon color={location.pathname.startsWith("/Teacher/questions") ? 'primary' : 'inherit'} />
                    </ListItemIcon>
                    <ListItemText primary="Notes/QuestionBank" />
                </ListItemButton>
                {/* <ListItemButton component={Link} to="/Teacher/complain">
                    <ListItemIcon>
                        <AnnouncementOutlinedIcon color={location.pathname.startsWith("/Teacher/complain") ? 'primary' : 'inherit'} />
                    </ListItemIcon>                
                    <ListItemText primary="Class" />
                </ListItemButton> */}
                <ListItemButton component={Link} to="/Teacher/class/evaluationform">
                    <ListItemIcon>
                        <AnnouncementOutlinedIcon color={location.pathname.startsWith("/Teacher/class/evaluationform") ? 'primary' : 'inherit'} />
                    </ListItemIcon>
                    <ListItemText primary="Distribution Form" />
                </ListItemButton>
            </React.Fragment>
            <Divider sx={{ my: 1 }} />
            <React.Fragment>
                <ListSubheader component="div" inset>
                    User
                </ListSubheader>
                <ListItemButton component={Link} to="/Teacher/profile">
                    <ListItemIcon>
                        <AccountCircleOutlinedIcon color={location.pathname.startsWith("/Teacher/profile") ? 'primary' : 'inherit'} />
                    </ListItemIcon>
                    <ListItemText primary="Profile" />
                </ListItemButton>
                <ListItemButton component={Link} to="/logout">
                    <ListItemIcon>
                        <ExitToAppIcon color={location.pathname.startsWith("/logout") ? 'primary' : 'inherit'} />
                    </ListItemIcon>
                    <ListItemText primary="Logout" />
                </ListItemButton>
            </React.Fragment>
        </>
    )
}

export default TeacherSideBar