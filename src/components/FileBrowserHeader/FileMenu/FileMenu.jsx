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
import ListIcon from "@mui/icons-material/List";
import RegularTile from "@mui/icons-material/ViewCompact";
import LargeTile from "@mui/icons-material/ViewModule";
import CheckIcon from '@mui/icons-material/Check';
import {useStorageView} from "../../../context/Storage/StorageViewProvider.jsx";
import SortIcon from '@mui/icons-material/Sort';
import EditCalendarIcon from '@mui/icons-material/EditCalendar';
import StraightenIcon from '@mui/icons-material/Straighten';
import SortByAlphaIcon from '@mui/icons-material/SortByAlpha';

export const FileMenu = ({anchorEl, handleCloseMenu, showViewVariants = true}) => {
    const {
        filesView, turnLargeTiles, turnRegularTiles, turnList,
    } = useStorageView();

    const {
        sortParameter, sortDirection, setDesc, setAsc, setSizeSort, setNameSort, setDateSort
    } = useStorageView();

    const open = Boolean(anchorEl);

    const getMenuVariant = () => {
        return (<Menu
            anchorEl={anchorEl}
            open={open}
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
            {showViewVariants &&
                <>

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
                            Вид
                        </ListSubheader>
                        <ListItemButton
                            selected={filesView === 'list'}
                            onClick={turnList}
                            sx={{maxHeight: '45px',}}
                        >
                            <ListItemIcon>
                                <ListIcon/>
                            </ListItemIcon>
                            <ListItemText primary="Список"/>
                            {filesView === 'list' && (
                                <CheckIcon
                                    sx={{
                                        position: 'absolute', right: '16px',
                                        color: 'primary.dark',
                                    }}
                                />)}
                        </ListItemButton>

                        <ListItemButton
                            selected={filesView === 'regularTiles'}
                            onClick={turnRegularTiles}
                            sx={{maxHeight: '45px',}}
                        >
                            <ListItemIcon>
                                <RegularTile/>
                            </ListItemIcon>
                            <ListItemText primary="Плитка"/>
                            {filesView === 'regularTiles' && (
                                <CheckIcon
                                    sx={{
                                        position: 'absolute', right: '16px',
                                        color: 'primary.dark',
                                    }}
                                />)}

                        </ListItemButton>

                        <ListItemButton
                            selected={filesView === 'largeTiles'}
                            onClick={turnLargeTiles}
                            sx={{maxHeight: '45px',}}
                        >
                            <ListItemIcon>
                                <LargeTile/>
                            </ListItemIcon>
                            <ListItemText primary="Крупная плитка"/>
                            {filesView === 'largeTiles' && (
                                <CheckIcon
                                    sx={{
                                        position: 'absolute', right: '16px',
                                        color: 'primary.dark',
                                    }}
                                />)}
                        </ListItemButton>

                    </List>
                    <Divider sx={{mb: '14px', pt: 1}}/>
                </>
            }

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
                    Сортировать по
                </ListSubheader>
                <ListItemButton
                    selected={sortParameter === 'name'}
                    onClick={setNameSort}
                    sx={{maxHeight: '45px',}}
                >
                    <ListItemIcon>
                        <SortByAlphaIcon/>
                    </ListItemIcon>
                    <ListItemText primary="Названию"/>
                    {sortParameter === 'name' && (
                        <CheckIcon
                            sx={{
                                position: 'absolute', right: '16px',
                                color: 'primary.dark',
                            }}
                        />)}
                </ListItemButton>

                <ListItemButton
                    selected={sortParameter === 'size'}
                    onClick={setSizeSort}
                    sx={{maxHeight: '45px',}}
                >
                    <ListItemIcon>
                        <StraightenIcon/>
                    </ListItemIcon>
                    <ListItemText primary="Размеру"/>
                    {sortParameter === 'size' && (
                        <CheckIcon
                            sx={{
                                position: 'absolute', right: '16px',
                                color: 'primary.dark',
                            }}
                        />)}

                </ListItemButton>

                <ListItemButton
                    selected={sortParameter === 'date'}
                    onClick={setDateSort}
                    sx={{maxHeight: '45px',}}
                >
                    <ListItemIcon>
                        <EditCalendarIcon/>
                    </ListItemIcon>
                    <ListItemText primary="Дате изменения"/>
                    {sortParameter === 'date' && (
                        <CheckIcon
                            sx={{
                                position: 'absolute', right: '16px',
                                color: 'primary.dark',
                            }}
                        />)}
                </ListItemButton>
                <Divider sx={{mb: '6px', pt: 1}}/>

                <List sx={{minWidth: '350px'}} disablePadding component="nav" aria-label="main mailbox folders">
                    <ListItemButton
                        selected={sortDirection === 'asc'}
                        onClick={setAsc}
                        sx={{maxHeight: '45px',}}
                    >
                        <ListItemIcon>
                            <SortIcon sx={{transform: 'scaleY(-1)'}}/>

                        </ListItemIcon>
                        <ListItemText primary="Возрастанию"/>
                        {sortDirection === 'asc' && (
                            <CheckIcon
                                sx={{
                                    position: 'absolute', right: '16px',
                                    color: 'primary.dark',
                                }}
                            />)}
                    </ListItemButton>

                    <ListItemButton
                        selected={sortDirection === 'desc'}
                        onClick={setDesc}
                        sx={{maxHeight: '45px',}}
                    >
                        <ListItemIcon>
                            <SortIcon/>

                        </ListItemIcon>
                        <ListItemText primary="Убыванию"/>
                        {sortDirection === 'desc' && (
                            <CheckIcon
                                sx={{
                                    position: 'absolute', right: '16px',
                                    color: 'primary.dark',
                                }}
                            />)}

                    </ListItemButton>

                </List>
            </List>
        </div>)
    }

    return (<>
        {getMenuVariant()}
        {getDrawerVariant()}
    </>)
}