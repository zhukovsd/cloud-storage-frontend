import {Avatar, Box, Drawer, IconButton, Menu, Slide, Tooltip} from "@mui/material";
import {useState} from "react";
import {useAuthContext} from "../../../context/Auth/AuthContext.jsx";
import MenuIcon from "@mui/icons-material/Menu";
import {AccountMenuItems} from "./AccountMenuItems.jsx";
import {AuthenticationMenuItems} from "./AuthenticationMenuItems.jsx";


export const Settings = () => {
    const [anchorEl, setAnchorEl] = useState(null);
    const open = Boolean(anchorEl);
    const handleOpenMenu = (event) => {
        setAnchorEl(event.currentTarget);
    }
    const handleCloseMenu = () => {
        setAnchorEl(null);
    }

    const {auth} = useAuthContext();

    const getMenuVariant = () => {
        return (
            <Menu
                anchorEl={anchorEl}
                open={open}
                onClose={handleCloseMenu}
                onClick={handleCloseMenu}
                sx={{display: {xs: 'none', md: 'block',}, zIndex: 2}}
                slotProps={{
                    paper: {
                        elevation: 0,
                        sx: {
                            border: '1px solid',
                            borderRadius: 2,
                            borderColor: 'divider',
                            filter: 'drop-shadow(0px 2px 8px rgba(0,0,0,0.32))',
                            backdropFilter: 'blur(5px)',
                            WebkitBackdropFilter: 'blur(5px)',
                            backgroundColor: 'menu',
                            mt: 1.5,
                        }
                    }
                }}
                transformOrigin={{horizontal: 'right', vertical: 'top'}}
                anchorOrigin={{horizontal: 'right', vertical: 'bottom'}}
                TransitionComponent={Slide}
            >
                {auth.isAuthenticated ?
                    <AccountMenuItems/>
                    : <AuthenticationMenuItems/>}
            </Menu>
        )
    }

    const getDrawerVariant = () => {

        return (
            <Drawer
                anchor='right'
                id="account-menu"
                open={open}
                onClose={handleCloseMenu}
                onClick={handleCloseMenu}
                sx={{
                    display: {
                        xs: 'block',
                        md: 'none',
                    },

                }}
                PaperProps={{
                    elevation: 0,
                    sx: {
                        // Для Safari
                        backdropFilter: 'blur(5px)',
                        WebkitBackdropFilter: 'blur(5px)', // Для Safari
                        border: '1px solid',
                        borderColor: 'divider',
                        backgroundColor: 'menu',
                        borderRadius: 2
                    }
                }}
            >
                {auth.isAuthenticated ?
                    <AccountMenuItems/>
                    : <AuthenticationMenuItems/>}
            </Drawer>
        )
    }

    return (
        <div>
            <Box>
                <Tooltip title="Menu">
                    <IconButton onClick={handleOpenMenu} size="small" sx={{mr: "8px"}}>
                        {auth.isAuthenticated
                            ?
                            <Avatar sx={{width: 32, height: 32, fontWeight: "400", fontSize: "17px"}}
                                    alt={auth.user.username}
                                    style={{width: 42, height: 42}}
                            > {auth.user.username.slice(0, 3)}</Avatar>
                            :
                            <Box sx={{width: 42, height: 42, alignContent: 'center'}}>
                                <MenuIcon/>
                            </Box>
                        }
                    </IconButton>
                </Tooltip>
            </Box>
            {getMenuVariant()}
            {getDrawerVariant()}
        </div>
    )

}