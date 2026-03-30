import {Divider, ListItemIcon, MenuItem} from "@mui/material";
import {GitHub} from "@mui/icons-material";
import {useNavigate} from "react-router-dom";
import LoginIcon from '@mui/icons-material/Login';
import PersonAddIcon from '@mui/icons-material/PersonAdd';
import {GITHUB_INFO} from "../../../UrlConstants.jsx";


export const AuthenticationMenuItems = () => {
    const navigate = useNavigate();

    return (
        <>
            <MenuItem onClick={() => {
                navigate("/login");
            }}>
                <ListItemIcon>
                    <LoginIcon fontSize="small"/>
                </ListItemIcon> Вход
            </MenuItem>
            <MenuItem onClick={() => {
                navigate("/registration");
            }}>
                <ListItemIcon>
                    <PersonAddIcon fontSize="small"/>
                </ListItemIcon>
                Регистрация
            </MenuItem>
            <Divider/>
            <MenuItem component="a"
                      href={GITHUB_INFO}
                      target="_blank" rel="noopener noreferrer"
                      sx={{'&:hover': {textDecoration: 'none', color: 'inherit',}}}
            >
                <ListItemIcon>
                    <GitHub fontSize="small"/>
                </ListItemIcon>
                Исходный код проекта
            </MenuItem>
        </>
    )
}