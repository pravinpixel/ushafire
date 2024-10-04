import { Box, Menu, MenuItem, Typography } from '@mui/material';
import React, { MouseEvent, useState } from 'react';
// import { useTaskDelete } from '../../../../store/hooks/taskHooks';
import { deleteImage, edit, editIcon } from '../../../../utils/helpers/assetHelper';
import TaskPopUp from '../../../components/popupComponents/TaskPopUp';
import ConfrimPopUp from '../../../components/popupComponents/ConfrimPopUp';
import { useTaskDelete } from '../../../../store/hooks/taskHooks';
import { Divider } from '@mui/material';
import { fontWeightRegular } from '../../../../utils/theme/typography';
import { MenuList } from '@mui/material';
import { Paper } from '@mui/material';

const getPopUpContent = (type: string | null) => {
    switch (type) {
        case 'delete':
            return {
                title: 'Delete Task',
                content: 'Are you sure you want to Delete the Selected Task?',
            };
        case 'all':
            return {
                title: 'Delete Task',
                content: 'Are you sure you want to Delete All Upcoming Recurrence Tasks ?',
            };
        case 'current':
            return {
                title: 'Delete Task',
                content: 'Are you sure you want to Delete the Current Task?',
            };
        default:
            return {
                title: '',
                content: '',
            };
    }
};
const TaskOptionsMenu = ({ task }: { task?: TaskFormType }) => {

    const [anchorEl, setAnchorEl] = React.useState<HTMLElement | null>(null);
    const [anchorDelete, setAnchorDelete] = React.useState(false);
    const [popUp, setPopUp] = useState<{
        id?: string | null,
        type: string | null,
    }>({
        id: null,
        type: null
    })


    const open = Boolean(anchorEl)
    const is_Delete = task?.is_delete;
    const is_Recurrence = task?.is_recurrence === 1;
    const handleClose = () => {
        setAnchorEl(null)
        setAnchorDelete(false)
    }
    const handleTaskOpen = (e: MouseEvent<HTMLLIElement>, type: string | null) => {
        e.preventDefault()
        e.stopPropagation()
        setPopUp({
            id: task?.id,
            type,
        })
        handleClose()
    }

    const handleTaskClose = () => {
        setPopUp({
            id: null,
            type: null
        })
        handleClose()
    }

    const handleOpen = (e: MouseEvent<HTMLDivElement>) => {
        e.preventDefault()
        e.stopPropagation()
        setAnchorEl(e.currentTarget)
    }


    const { mutateAsync } = useTaskDelete()
    return (
        <>
            <Box
                marginLeft={1}
                sx={{ cursor: "pointer" }}
                component={'img'}
                onClick={handleOpen}
                src={edit}
                alt="login-image"
                width="20"
                height="20"
            >

            </Box>

            <Menu
                id="demo-positioned-menu"
                aria-labelledby="demo-positioned-button"
                anchorEl={anchorEl}
                open={open}
                onClose={handleClose}
                onClick={(e) => {
                    e.preventDefault()
                    e.stopPropagation()
                }}
                sx={{
                    "& .MuiPaper-root": {
                        padding: "0px",

                    },
                    "& .MuiList-root":{
                        paddingBottom:'0px ',
                        paddingTop:'0px',
                    },
                    // '& .MuiDivider-root':{
                    //     marginTop:'5px',
                    //     marginBottom:'5px'
                    //    } 
                }}
                
            >
                <MenuItem onClick={(e) => handleTaskOpen(e, "edit")}
                sx={{mt:'8px'}}
                >
                    <img
                        src={editIcon}
                        alt="editIcon"
                        width={16}
                        height={16}
                    />
                    <Typography marginLeft={1} variant='f12' color="#000000">Edit</Typography>
                </MenuItem>
                <Divider sx={{
                    width: "70%", border: "1px solid rgba(0, 0, 0, 0.1)", marginLeft: '15px',
                    '& .MuiDivider': {
                        marginTop: "1px",
                        marginBottom: "0px",
                        marginInline: '5px'
                    },

                }} />
                {
                    is_Recurrence ? (
                        <>
                            <MenuItem  
                            sx={{mb:'8px'}}
                                disabled={!is_Delete}
                                onClick={(e) => {
                                    e.preventDefault()
                                    e.stopPropagation()
                                    setAnchorDelete(!anchorDelete);
                                }}>
                                <img
                                    src={deleteImage}
                                    alt="deleteImage"
                                    width={16}
                                    height={16}
                                />
                                <Typography  marginLeft={1} variant='f12' color="#000000">Delete</Typography>
                            </MenuItem>
                            {
                                anchorDelete && (
                                    // <Paper>
                                    <MenuList  sx={{ minWidth:'80px', maxWidth: '100%', borderRadius:0,minHeight:'38px', marginTop:-0.7,
                                    //    '& .MuiDivider-root':{
                                    //     marginTop:'4px',
                                    //     marginBottom:'4px'
                                    //    } 
                                     }}>
                                        <MenuItem
                                            disabled={!is_Delete}
                                            onClick={(e) => {
                                                e.preventDefault()
                                                e.stopPropagation()
                                                handleTaskOpen(e, "current")

                                            }}>
                                            <Typography   variant='f10' color="#000000" lineHeight={'15px'} fontWeight={fontWeightRegular}>Current task</Typography>
                                        </MenuItem>
                                        <Divider  sx={{
                                            width: "70%", border: "1px solid rgba(0, 0, 0, 0.1)", marginLeft: '15px',
                                            // '& .MuiDivider-root': {
                                            //     marginTop: "1px",
                                            //     marginBottom: "0px",
                                            //     marginInline: '5px'
                                            // },
                                        }} />
                                        <MenuItem
                                        sx={{mb:'8px'}}
                                            disabled={!is_Delete}
                                            onClick={(e) => {
                                                e.preventDefault()
                                                e.stopPropagation()
                                                handleTaskOpen(e, "all")
                                            }}>
                                            <Typography  variant='f10'  color="#000000" lineHeight={'15px'}  fontWeight={fontWeightRegular}>All Upcoming <br/>Recurrence task</Typography>
                                        </MenuItem>
                                    </MenuList>
                                    // </Paper>
                                )
                            }
                        </>
                        ) : (
                        <MenuItem
                        sx={{mb:'8px'}}
                            disabled={!is_Delete}
                            onClick={(e) => {
                                e.preventDefault()
                                e.stopPropagation()
                                handleTaskOpen(e, "delete")

                            }}>
                            <img
                                src={deleteImage}
                                alt="deleteImage"
                                width={16}
                                height={16}
                            />
                            <Typography marginLeft={1} variant='f12' color="#000000">Delete</Typography>
                        </MenuItem>
                    )
                }


            </Menu >
            {
                popUp?.type === 'edit' && <TaskPopUp id={popUp?.id} onClose={handleClose} handleTaskClose={handleTaskClose} />
            }

            {/* {
                popUp?.type === 'delete' && <ConfrimPopUp id={popUp?.id as never} deleteApi={mutateAsync as never} onClose={handleTaskClose} title='Delete Task' content="Are you sure you want to Delete the selected Task?" />
            } */}
            { popUp?.type && popUp?.type !== 'edit' && (
                <ConfrimPopUp
                    id={(popUp?.id + (popUp?.type === 'all' ? '/delete_all' : '')) as never}
                    deleteApi={mutateAsync as never}
                    onClose={handleTaskClose}
                    title={getPopUpContent(popUp?.type).title}
                    content={getPopUpContent(popUp?.type).content}
                    // isRecurrenceDelete={popUp?.type === 'all'}
                />
            )}
        </>

    )
}

export default TaskOptionsMenu