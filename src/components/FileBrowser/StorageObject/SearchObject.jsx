import {Box, Card} from "@mui/material";
import React from "react";
import {useStorageNavigation} from "../../../context/Storage/StorageNavigationProvider.jsx";
import {useLongPress} from "../../Selection/hook/useLongPress.jsx";
import {isMobile} from "react-device-detect";
import CheckIcon from "@mui/icons-material/Check";
import {useStorageSelection} from "../../../context/Storage/StorageSelectionProvider.jsx";
import {FileFormatIcon} from "../../../assets/FileFormatIcon.jsx";
import ContentCopyIcon from "@mui/icons-material/ContentCopy";
import ContentCutIcon from "@mui/icons-material/ContentCut";
import Typography from "@mui/material/Typography";
import bytes from "bytes";
import {formatDate} from "../../../services/util/Utils.js";

const isMob = isMobile;


const highlightSubstring = (text, substring) => {
    if (!substring) return text; // Если подстрока пустая, возвращаем исходный текст

    const regex = new RegExp(`(${substring})`, 'gi'); // Регулярное выражение для поиска подстроки
    const parts = text.split(regex); // Разбиваем строку на части

    return parts.map((part, index) =>
        part.toLowerCase() === substring.toLowerCase() ? (
            <span key={index} style={{backgroundColor: 'gray',}}>
        {part}
      </span>
        ) : (
            part
        )
    );
};

export default function SearchObject({object, selectedIds, bufferIds, handlePreview}) {

    const {goToFolder, searchName, loadFolder, setSearchName, setSearchedContent} = useStorageNavigation();
    const {setSelectionMode, isSelectionMode, isCutMode, isCopyMode} = useStorageSelection();

    const hiddenFolderTag = object.name === '*empty-folder-tag*'


    function handleEndSearch() {
        setSearchName("");
        setSearchedContent([]);
    }

    const onClick = isMob ? () => {
        if (object.folder && !isSelectionMode && !copied && !cutted) {
            loadFolder(object.path);
            handleEndSearch();
            return;
        }
        if (!isSelectionMode) {
            handlePreview(object);
        }
    } : () => {
    }

    const onDoubleClick = !isMob ? () => {
        if (object.folder && !copied && !cutted) {
            loadFolder(object.path);
            handleEndSearch();

            return;
        }
        handlePreview(object);
    } : null;

    const onLongPress = isMob ? () => {
        if (navigator.vibrate) {
            navigator.vibrate(70);
        }
        if (!isSelectionMode && !isCutMode && !isCopyMode) {
            setSelectionMode(true);
        }

    } : null;


    const longPressEvent = useLongPress(onLongPress, onClick);

    const selected = selectedIds.includes(object.path);

    const copied = bufferIds.includes(object.path) && isCopyMode;
    const cutted = bufferIds.includes(object.path) && isCutMode;

    return (
        <>
            {!hiddenFolderTag &&
                <Card
                    data-id={object.path}
                    className={'selectable'}
                    onDoubleClick={onDoubleClick}

                    {...longPressEvent}
                    onClick={onClick}

                    sx={{
                        position: 'relative',
                        minWidth: 20,
                        opacity: copied || cutted ? 0.5 : 1,
                        minHeight: 100,
                        backgroundColor: selected ? "objectSelected" : "transparent",
                        borderRadius: 2,
                        display: 'flex',         // Добавляем flex-контейнер
                        alignItems: 'center',    // Выравниваем по вертикали
                        paddingLeft: 8,          // Немного отступа от края
                        '&:hover': {
                            backgroundColor: selected ? "objectSelected" : "objectHover",
                        }
                    }}
                    elevation={0}
                >
                    <Box sx={{position: 'absolute', width: '40px', left: 8, bottom: object.folder ? 65 : 10}}>


                        <FileFormatIcon name={object.name} style={''}/>


                        {copied && <ContentCopyIcon
                            sx={{color: 'black', position: 'absolute', fontSize: '15px', bottom: 11, left: 3}}/>}
                        {cutted && <ContentCutIcon
                            sx={{color: 'black', position: 'absolute', fontSize: '15px', bottom: 11, left: 3}}/>}

                    </Box>

                    <Typography
                        sx={{
                            width: '70%',
                            textAlign: 'left',
                            position: 'absolute',
                            top: 12,
                            fontSize: '16px',
                            whiteSpace: 'nowrap',
                            overflow: 'hidden',
                            textOverflow: 'ellipsis',
                            pointerEvents: 'none',

                            userSelect: 'none',
                            '&:hover': {
                                cursor: 'default',
                            },
                        }}
                    >
                        {highlightSubstring(object.folder ? object.name.slice(0, -1) : object.name
                            , searchName)}
                    </Typography>
                    <Typography
                        sx={{
                            width: '70%',
                            textAlign: 'left',
                            position: 'absolute',
                            top: 32,
                            fontSize: '14px',
                            whiteSpace: 'nowrap',
                            overflow: 'hidden',
                            textOverflow: 'ellipsis',
                            pointerEvents: 'none',
                            color: 'text.secondary',

                            userSelect: 'none',
                            '&:hover': {
                                cursor: 'default',
                            },
                        }}
                    >
                        {object.path}
                    </Typography>

                    <Typography
                        sx={{
                            width: '20%',
                            textAlign: 'left',
                            position: 'absolute',
                            bottom: 23,
                            // left: '50%',
                            fontSize: '12px',
                            color: 'text.secondary',
                            whiteSpace: 'nowrap',
                            pointerEvents: 'none',

                            userSelect: 'none',
                            overflow: 'hidden',
                            textOverflow: 'ellipsis',
                            '&:hover': {
                                cursor: 'default',
                            },
                        }}
                    >
                        {!object.folder && bytes(object.size, {decimalPlaces: 0})}
                    </Typography>
                    {!object.folder &&
                        <Typography
                            sx={{
                                width: '40%',
                                textAlign: 'left',
                                position: 'absolute',
                                bottom: 8,
                                // left: '63%',
                                fontSize: '12px',
                                color: 'text.secondary',
                                whiteSpace: 'nowrap',
                                userSelect: 'none',
                                pointerEvents: 'none',

                                overflow: 'hidden',
                                textOverflow: 'ellipsis',
                                '&:hover': {
                                    cursor: 'default',
                                },
                            }}
                        >
                            {object.lastModified && formatDate(object.lastModified)}
                        </Typography>
                    }

                    {selected &&
                        <CheckIcon
                            sx={{
                                position: 'absolute',
                                right: '8px', // Отступ от правого края
                                color: 'primary.dark', // Цвет галочки
                            }}
                        />
                    }

                </Card>
            }
        </>
    );
}