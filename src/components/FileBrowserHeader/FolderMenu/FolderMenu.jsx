import {
    Divider,
    Grow,
    List,
    ListItemButton,
    ListItemIcon,
    ListItemText,
    ListSubheader,
    Menu,
    SwipeableDrawer
} from "@mui/material";
import DriveFolderUploadIcon from '@mui/icons-material/DriveFolderUpload';
import UploadIcon from '@mui/icons-material/Upload';
import CreateNewFolderIcon from '@mui/icons-material/CreateNewFolder';
import FolderNameModal from "../../../modals/FolderCreate/FolderNameModal.jsx";
import {useRef, useState} from "react";
import {useStorageOperations} from "../../../context/Files/FileOperationsProvider.jsx";

export const FolderMenu = ({anchorEl, handleCloseMenu}) => {
    const {uploadObjects} = useStorageOperations();
    const open = Boolean(anchorEl);

    const [modalNewFolderOpen, setModalNewFolderOpen] = useState(false);

    function handleNewFolderClick() {
        setModalNewFolderOpen(true);
    }

    const handleCloseNewFolderModal = () => {
        setModalNewFolderOpen(false);
    };

    const fileInputRef = useRef(null);
    const folderInputRef = useRef(null);


    const handleInputChange = (e, isFolder) => {
        const newFiles = Array.from(e.target.files);
        if (isFolder) {
            const filesWithPath = newFiles.map((file) => ({
                file,
                path: file.webkitRelativePath,
            }));
            uploadObjects(filesWithPath);
        } else {
            const filesWithoutPath = newFiles.map((file) => ({
                file,
                path: file.name,
            }));
            uploadObjects(filesWithoutPath);
        }
    };


    const getMenuVariant = () => {
        return (<Menu
            anchorEl={anchorEl}
            open={open}
            onClick={handleCloseMenu}
            onClose={handleCloseMenu}
            sx={{display: {xs: 'none', md: 'block',}, zIndex: 2}}
            slotProps={{
                paper: {
                    elevation: 0, sx: {
                        border: '1px solid',
                        borderRadius: 2,
                        borderColor: 'divider',
                        filter: 'drop-shadow(0px 2px 8px rgba(0,0,0,0.32))',
                        backdropFilter: 'blur(9px)',
                        WebkitBackdropFilter: 'blur(9px)',
                        backgroundColor: 'menu',
                        mt: 1.5,
                    }
                }
            }}
            transformOrigin={{horizontal: 'right', vertical: 'top'}}
            anchorOrigin={{horizontal: 'right', vertical: 'bottom'}}
            TransitionComponent={Grow}
        >
            {fileMenu()}
        </Menu>)
    }

    const getDrawerVariant = () => {
        return (<SwipeableDrawer
            anchor='bottom'
            open={open}
            onClick={handleCloseMenu}

            onClose={handleCloseMenu}
            sx={{
                display: {
                    xs: 'block', md: 'none',
                },

            }}
            PaperProps={{
                elevation: 0, sx: {
                    backdropFilter: 'blur(9px)', WebkitBackdropFilter: 'blur(9px)',
                    border: '1px solid', borderColor: 'divider', backgroundColor: 'menu', borderRadius: 2
                }
            }}
        >
            {fileMenu()}

        </SwipeableDrawer>)
    }


    const fileMenu = () => {
        return (<div>
            <List sx={{minWidth: '350px'}} disablePadding component="nav" aria-label="main mailbox folders">
                <ListSubheader id="nested-list-subheader"
                               sx={{
                                   backgroundColor: 'transparent',
                                   backdropFilter: 'blur(9px)',
                                   WebkitBackdropFilter: 'blur(9px)',
                                   maxHeight: '25px',
                                   marginBottom: '20px',
                                   marginTop: '-10px'
                               }}
                >
                    Загрузка
                </ListSubheader>
                <ListItemButton
                    onClick={() => fileInputRef.current.click()}
                    sx={{maxHeight: '45px',}}
                >
                    <ListItemIcon>
                        <UploadIcon/>
                    </ListItemIcon>
                    <ListItemText primary="Загрузить файлы"/>
                </ListItemButton>

                <ListItemButton
                    onClick={() => folderInputRef.current.click()}
                    sx={{maxHeight: '45px',}}
                >
                    <ListItemIcon>
                        <DriveFolderUploadIcon/>
                    </ListItemIcon>
                    <ListItemText primary="Загрузить папку"/>

                </ListItemButton>


            </List>
            <Divider sx={{mb: '14px', pt: 1}}/>

            <List sx={{minWidth: '350px'}} disablePadding component="nav" aria-label="main mailbox folders">
                <ListSubheader id="nested-list-subheader"
                               sx={{
                                   backgroundColor: 'transparent',
                                   backdropFilter: 'blur(9px)',
                                   WebkitBackdropFilter: 'blur(9px)',
                                   maxHeight: '25px',
                                   marginBottom: '20px',
                                   marginTop: '-14px'
                               }}
                >
                    Создание
                </ListSubheader>
                <ListItemButton
                    onClick={handleNewFolderClick}
                    sx={{maxHeight: '45px',}}
                >
                    <ListItemIcon>
                        <CreateNewFolderIcon/>
                    </ListItemIcon>
                    <ListItemText primary="Cоздать папку"/>
                </ListItemButton>


            </List>

        </div>)
    }


    return (<>
        {getMenuVariant()}
        {getDrawerVariant()}
        <FolderNameModal open={modalNewFolderOpen} onClose={handleCloseNewFolderModal}/>
        <div className="input-buttons">
            <input
                type="file"
                ref={fileInputRef}
                multiple
                onChange={(e) => handleInputChange(e, false)}
                style={{display: 'none'}}
            />


            <input
                type="file"
                ref={folderInputRef}
                webkitdirectory="true"
                directory="true"
                onChange={(e) => handleInputChange(e, true)}
                style={{display: 'none'}}
            />

        </div>

    </>)
}