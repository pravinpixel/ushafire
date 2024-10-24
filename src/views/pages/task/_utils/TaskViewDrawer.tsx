import { Box, Drawer } from '@mui/material';
import { useTaskListView } from '../../../../store/hooks/taskHooks';
import CardView from '../../../components/CardView';
import ProgressBar from '../../../components/ProgressBar';
import { useMediaQuery } from '@mui/material';
import { useTheme } from "@mui/material";
import ProfileLogo from '../../../components/sidebar/ProfileLogo';
import { cancel_Icon } from '../../../../utils/helpers/assetHelper';
import { Dispatch, SetStateAction } from 'react';


const TaskViewDrawer = ({ openDrawer, handleCloseDrawer,params, setParams}: { openDrawer: TaskFormType['id'], handleCloseDrawer: () => void ,params: TaskPagination,
	setParams: Dispatch<SetStateAction<TaskPagination>>}) => {


    const { data , isLoading } = useTaskListView(openDrawer);
    const theme = useTheme();
    const cardWidth = useMediaQuery(theme.breakpoints.down('sm'));


    return (
        <>
            {
                openDrawer && <Drawer
                    anchor="right"
                    open={!!openDrawer}
                    onClose={handleCloseDrawer}
                    sx={{
                        "& .MuiDrawer-paper": {
                            width: cardWidth ? "100vw" : "50vw",
                            borderRadius: "17px 0px 0px 17px",
                            padding: 0,
                            boxShadow: "1",
                        },
                        "& .MuiBackdrop-root": {
                            // backgroundColor: "transparent",
                        },
                    }}
                >
                    <Box
                        sx={{
                            // backgroundColor: task?.assigned_by === user?.id ? "#FFE1E1" : "#EFEEF0",
                            // minHeight: "50vh",
                        }}
                    >
                        {!isLoading ? (
                            <>
                                {cardWidth &&
                                    <Box padding={2}>
                            
                                            <img
                                                src={cancel_Icon}
                                                alt="arrow"
                                                width="10"
                                                height="10"
                                                onClick={handleCloseDrawer}
                                                style={{ cursor: "pointer", marginLeft: "15px" }}
                                            />

                                      
                                        <ProfileLogo onClick={() => { }} />
                                    </Box>}
                                <CardView
                                    handleCloseDrawer={handleCloseDrawer}
                                    viewTask={data?.data}
                                    params={params}
                                    setParams={ setParams}
                                />
                            </>
                        ) : (
                            <ProgressBar />
                        )}
                    </Box>
                </Drawer>
            }</>

    )
}

export default TaskViewDrawer