import Selecto from "react-selecto";
import Moveable from "react-moveable";
import * as React from "react";
import {useEffect, useRef, useState} from "react";
import {Box} from "@mui/material";
import {isMobile} from "react-device-detect";
import {useStorageSelection} from "../../context/Storage/StorageSelectionProvider.jsx";
import {FileFormatIcon} from "../../assets/FileFormatIcon.jsx";
import {useStorageOperations} from "../../context/Files/FileOperationsProvider.jsx";
import {useStorageNavigation} from "../../context/Storage/StorageNavigationProvider.jsx";

export const FileSelection = ({
                                  containerRef,
                                  selectoRef, moveableRef,
                                  selectedIds, setSelectedIds
                              }) => {
    const isMob = isMobile;

    const allowToMove = window.APP_CONFIG.isMoveAllowed;

    const {moveObjects,  } = useStorageOperations();
    const {isSearchMode} = useStorageNavigation();

    const {isSelectionMode, setSelectionMode, isCopyMode, isCutMode,} = useStorageSelection();

    const [mobileSelecting, setMobileSelecting] = useState(false);

    const [coordinates, setCoordinates] = useState({x: 0, y: 0});

    const handleClick = (event) => {
        if (containerRef.current) {
            const touch = event.touches ? event.touches[0] : event;
            setCoordinates({x: touch.clientX, y: touch.clientY});
        }
    };




    useEffect(() => {
            containerRef.current.addEventListener("touchstart", handleClick);
            containerRef.current.addEventListener("mousedown", handleClick);
        },
        [])

    useEffect(() => {
            if (isMob) {
                if (isSelectionMode) {
                    setMobileSelecting(isSelectionMode);
                } else {
                    if (selectoRef.current) {
                        selectoRef.current.setSelectedTargets([]);
                    }
                }
            }
        },
        [isSelectionMode])

    useEffect(() => {
            if (isMob && mobileSelecting) {
                const elements = document.elementsFromPoint(coordinates.x, coordinates.y);
                const el = elements.find(elem => elem.classList.contains('selectable'));
                if (el) {
                    if (selectoRef.current) {
                        selectoRef.current.setSelectedTargets([el]);
                        let id = el.dataset.id;
                        setSelectedIds([id]);
                    }
                }
            }
        }
        ,
        [mobileSelecting]
    )

    useEffect(() => {
        setTimeout(() => {
            if (selectedIds.length === 0) {
                isMob && setMobileSelecting(false);
                setSelectionMode(false);
            } else {
                setSelectionMode(true);
            }
        }, 100);

    }, [selectedIds])

    const [iconCoord, setIconCoord] = useState({x: 0, y: 0});
    const iconRef = useRef(null);
    const [showIcon, setShowIcon] = useState(false);

    const shouldSelectFromInside = () => {

        if (selectedIds.length !== 1) {
            return true;
        }

        const elements = document.elementsFromPoint(coordinates.x, coordinates.y);
        const el = elements.find(elem => elem.classList.contains('selectable'));

        if (el) {
            return !selectedIds.includes(el.dataset.id);
        }
    }


    const handleDragEnd = (event) => {
        setShowIcon(false);

        const elements = document.elementsFromPoint(event.clientX, event.clientY);

        const el = elements.find(elem => elem.classList.contains('selectable'));
        if (el) {
            let targetPath = el.dataset.id;

            if (selectedIds.includes(targetPath) || !targetPath.endsWith("/")) {
                return;
            }
            moveObjects(selectedIds, targetPath);
        }
    }


    //context



    return (
        <>
            {!isCopyMode && !isCutMode &&
                <Selecto
                    ref={selectoRef}
                    selectableTargets={[" .selectable"]}
                    selectByClick={!isMob ? true : (mobileSelecting)}
                    selectFromInside={!isMob ? shouldSelectFromInside() : (mobileSelecting)}
                    continueSelect={!isMob ? false : (mobileSelecting)}
                    hitRate={isMob ? 1000 : 0}
                    dragContainer={".elements"}
                    keyContainer={containerRef.current}

                    onSelect={
                        (e) => {
                            setSelectedIds([]);
                            setSelectedIds(e.selected.map(el => el.dataset.id));
                        }
                    }

                    className={isMob && "custom-selection"}
                />
            }
            <style>
                {`
                   .custom-selection {
                        background-color: transparent; 
                        border-color:transparent; 
                    }
                    
                    .grad-selection {
                    
                    }
                `}
            </style>




            {
               allowToMove && !isMob && !isSearchMode &&
                <>
                    <Moveable
                        ref={moveableRef}
                        clickable={false}
                        target={selectedIds
                            .map(id => document.querySelector(`[data-id="${id}"]`))
                            .filter(el => el !== null)}
                        draggable={true}
                        onClickGroup={e =>
                            selectoRef.current.clickTarget(e.inputEvent, e.inputTarget)
                        }

                        onRender={(e) => {
                            setShowIcon(true);
                            const x = e.clientX;
                            const y = e.clientY;
                            setIconCoord({x: x, y: y});
                        }}
                        onRenderGroup={e => {
                            setShowIcon(true);
                            const x = e.events[0].clientX;
                            const y = e.events[0].clientY;
                            e.events.map(e => e.target.dataset.id);
                            setIconCoord({x: x, y: y});

                        }}


                        onDragGroupEnd={handleDragEnd}
                        onDragEnd={handleDragEnd}
                    />
                    <Box
                        ref={iconRef}
                        sx={{
                            position: "fixed",
                            display: showIcon ? "block" : "none",
                            pointerEvents: 'none',
                            width: "100px",
                            height: "100px",
                            backgroundColor: "divider",
                            borderRadius: 2,
                            border: '1px solid',
                            borderColor: 'text.secondary',
                            opacity: 0.85,
                            zIndex: 1000,
                            transform: 'translate(-50%, -80%)',
                            left: iconCoord.x,
                            top: iconCoord.y,
                        }}
                    >


                        {selectedIds.slice(0, 4).map((id, index) => {
                                return <Box
                                    key={index}
                                    sx={{
                                        position: "absolute",
                                        width: "100%",
                                        left: index * 6 - 8 + 'px',
                                        top: index * 6 + 2 + 'px',
                                    }}
                                >
                                    <FileFormatIcon name={id}/>
                                </Box>
                            }
                        )}
                        <Box
                            sx={{
                                position: "absolute",
                                left: 23 + (selectedIds.length > 4 ? 4 : selectedIds.length) * 6 + '%',
                                top: 23 + (selectedIds.length > 4 ? 4 : selectedIds.length) * 6 + '%',
                                pl: '5px',
                                pr: '5px',
                                backgroundColor: 'background.paper',
                                userSelect: 'none',
                                border: '1px solid',
                                borderRadius: 1,
                                borderColor: 'text.secondary',
                                color: 'text.secondary',

                            }}
                        >{selectedIds.length}</Box>
                    </Box>
                </>
            }
        </>
    )
}