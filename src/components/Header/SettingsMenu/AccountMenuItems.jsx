import {Divider, ListItemIcon, MenuItem} from "@mui/material";
import {GitHub, Logout} from "@mui/icons-material";
import {sendLogout} from "../../../services/fetch/auth/user/SendLogout.js";
import {useAuthContext} from "../../../context/Auth/AuthContext.jsx";
import {useNavigate} from "react-router-dom";
import {useNotification} from "../../../context/Notification/NotificationProvider.jsx";
import {GITHUB_INFO} from "../../../UrlConstants.jsx";


export const AccountMenuItems = () => {
    const {logout} = useAuthContext();
    const navigate = useNavigate();
    const {showInfo, showError} = useNotification();

    const handleLogout = async () => {
        try {
            await sendLogout();
            logout();
            setTimeout(() => {
                navigate("/login");
                showInfo("Выход успешно выполнен", 4000);
            }, 400);
        } catch (error) {
            showError(error.message);
            logout();
            console.log('Unknown error occurred! ');
        }
    }


    return (
        <>

            <MenuItem
                component="a"
                href={GITHUB_INFO}
                target="_blank"
                rel="noopener noreferrer"
                sx={{'&:hover': {textDecoration: 'none', color: 'inherit',}}}
            >
                <ListItemIcon>
                    <GitHub fontSize="small"/>
                </ListItemIcon>
                Исходный код проекта
            </MenuItem>
            <Divider/>
            <MenuItem onClick={handleLogout}>
                <ListItemIcon>
                    <Logout fontSize="small"/>
                </ListItemIcon>
                Выход
            </MenuItem>
        </>
    )
}