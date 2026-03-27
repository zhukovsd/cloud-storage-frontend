import {Box, Breadcrumbs, Chip} from "@mui/material";
import NavigateNextIcon from "@mui/icons-material/NavigateNext";
import {useStorageNavigation} from "../../../context/Storage/StorageNavigationProvider.jsx";
import HomeIcon from "@mui/icons-material/Home";


export const CustomBread = () => {

    const {
        folderPath,
        loadFolder
    } = useStorageNavigation();

    const buildUrl = (endpoint, folderPath) => {
        let url = "";
        for (let i = 0; i < folderPath.length; i++) {
            url += folderPath[i];
            if (endpoint === folderPath[i]) {
                break;
            }
        }
        return url;
    }

    return (
        <Box sx={{display: 'flex',mt: '10px', maxHeight: '28px',  height: '28px', alignContent: 'center', alignItems: 'center'}}>
            <Chip
                icon={<HomeIcon/>}
                onClick={() => loadFolder("")}
                sx={{
                    cursor: 'pointer',
                    pl: '10px',
                    transition: 'text-shadow 0.3s ease',
                    '&:hover': {boxShadow: '0 0 10px rgba(25, 118, 210,1)',},
                }}
            />
            {folderPath.length > 1 &&
                <NavigateNextIcon sx={{color: 'text.secondary', height: '32px'}} fontSize="small"/>}

            <Breadcrumbs sx={{ ml: 1, minWidth: "max-content"}}
                         separator={<NavigateNextIcon fontSize="small"/>}>
                {folderPath.map((item, index) => {
                        let lastElement = index === folderPath.length - 1;

                        if (item === "") {
                            return null;
                        }

                        return (
                            <Chip
                                key={index}
                                label={item.slice(0, -1)}
                                sx={{
                                    maxWidth: '120px',
                                    cursor: !lastElement ? 'pointer' : 'default',
                                    height: '25px',
                                    backgroundColor: lastElement ? 'info.main' : '',
                                    transition: 'text-shadow 0.3s ease',
                                    '&:hover': {
                                        boxShadow: !lastElement ? '0 0 10px rgba(25, 118, 210,1)' : '',
                                        backgroundColor: lastElement ? 'info.main' : '',
                                    },
                                }}
                                onClick={() => !lastElement && loadFolder(buildUrl(item, folderPath))}
                            />
                        )
                    }
                )
                }
            </Breadcrumbs>
        </Box>
    )

}