import { Box, CircularProgress, IconButton, Stack, TextField } from "@mui/material";
import { ChangeEvent, useRef } from "react";
import { FormProvider, useController, useForm, useFormContext } from "react-hook-form";
import { useSaveComment } from "../../store/hooks/taskHooks";
import { send, uploadIcon } from "../../utils/helpers/assetHelper";
import { notify, statusArray, uploadAccecpt, uploadValidationFile } from "../../utils/helpers/globalHelper";
import CustomCheckbox from "./form-fields/Checkbox";
import UploadDocs from "./UploadDocs";
import userStore from "../../zustand/UserZustand";

const CommentInput = ({ name = "comment", loading = false, taskView,params }: { name: string; loading: boolean, taskView: TaskFormType ,params:any}) => {
    const { control } = useFormContext();

    const {
        // eslint-disable-next-line @typescript-eslint/no-unused-vars

        field: documentField,
    } = useController({
        name: "documents",
        defaultValue: [],
        control,
    });

    const ref = useRef<HTMLInputElement>(null);
    const files = documentField?.value || [];

    const {
        field,
        fieldState: { error },
    } = useController({
        name,
        control,
    });

    const handleUpload = (e: ChangeEvent<HTMLInputElement>) => {
        const preArray = Array.from(documentField?.value || [])
        const files = Array.from(e?.target?.files || [])
        const allArray = [...preArray, ...files]
        const uploadfiles = uploadValidationFile((allArray as unknown as DocumentsType[]) || [])
        if (uploadfiles?.length > 0) {
            const newArray = uploadfiles.splice(-5);
            documentField.onChange(newArray);
        } else {
            documentField.onChange([]);
        }

    };

    const handleRemove = (fileToRemove: File) => {
        documentField?.onChange(files.filter((file: File) => file !== fileToRemove));

        if (ref.current) {
            ref.current.value = '';
        }
    };

    const user = userStore().user;
    const checkMyTask = () => {
        return (
            user?.id === taskView?.assigned_to  &&
            !statusArray.includes(taskView?.status?.name?.toLowerCase() || "")  &&
            !(params.tab === "assigned_task" && taskView?.is_self_assign === 1)
        );
    };

    return (
        <>

            {files?.length > 0 && (
                <Stack
                    sx={{ display: "flex", flexDirection: "row", flexWrap: "wrap", gap: 2, marginBottom: 3 }}
                >
                    {files?.map((file: never, index: number) => (
                        <UploadDocs
                            key={index}
                            document={file}
                            onClick={() => handleRemove(file)}
                        />
                    ))}
                </Stack>
            )}

            <Box>
                <Stack
                    direction="row"
                    spacing={3}
                    marginBottom={"15px"}
                >
                    {checkMyTask() && (
                        <Box>
                            <CustomCheckbox
                                name="mark_as_completed"
                                label="Mark as Completed"
                            />
                        </Box>
                    )}
                    {
                      taskView?.is_self_assign === 0 && (
                        <Box>
                        <CustomCheckbox
                            name="send_private"
                            label="Send as Private"
                        />
                    </Box>
                       )
                    }
                   
                </Stack>
            </Box>

            <Box
                display="flex"
                alignItems="center"
                sx={{
                    '& .MuiIconButton-root:hover': {
                        background: "#f2dde3 !important"
                    }
                }}
            >
                <Box
                    paddingRight={{ xs: 1, md: 2 }}
                >
                    <IconButton
                        component="span"
                        sx={{
                            background: "none",
                            display: "flex",
                            justifyContent: "center",
                            alignItems: "center",
                        }}
                        onClick={() => {
                            ref?.current?.click();
                        }}
                    >
                        <label htmlFor="file-input">
                            <input
                                type="file"
                                multiple
                                key={String(field)}
                                // {...documentField}
                                // {...documentField}
                                ref={ref}
                                accept={uploadAccecpt}
                                hidden
                                onChange={handleUpload}
                            />
                            <img
                                src={uploadIcon}
                                width={20}
                                height={20}
                                alt="upload"
                                style={{
                                    display: "flex",
                                    justifyContent: "center",
                                    alignItems: "center",
                                }}
                            />
                        </label>
                    </IconButton>
                </Box>
                <TextField
                    {...field}
                    // onChange={handleTextChange}
                    fullWidth

                    size="small"
                    placeholder={"Type message"}
                    error={!!error?.message}
                    helperText={error?.message}
                    InputProps={{
                        endAdornment: loading ? (
                            <IconButton sx={{ background: "none" }}>
                                <CircularProgress
                                    size={20}
                                    sx={{
                                        color: "primary.main",
                                    }}
                                />
                            </IconButton>
                        ) : (
                            <IconButton
                                component="button"
                                type="submit"
                                sx={{
                                    background: "none",
                                     '& .MuiIconButton-root:hover': {
                                        background: "#f2dde3 !important"
                                    }
                                }}
                            >
                                <img
                                    src={send}
                                    width={20}
                                    height={20}
                                />
                            </IconButton>
                        ),
                    }}
                // sx={{ my: "22px", width: { xs: "78%", sm: "60%", md: "51%", lg: "43%" } }}
                />
            </Box>
        </>
    );
};

export default function CardMessage({ taskView, isXs ,params}: { taskView: TaskFormType, isXs: boolean,params:any }) {
    const { mutateAsync } = useSaveComment();


    const form = useForm<TaskComment>({
        defaultValues: {
            task_id: taskView?.id,
            send_private: 0,
            mark_as_completed: 0,
            comment: "",
            documents: []
        },
    });

    const {
        handleSubmit,
        reset,
        formState: { isSubmitting },
    } = form;

    const handleClick = async (data: TaskComment) => {
        try {
            const res = await mutateAsync(data);
            reset({
                task_id: taskView?.id,
                send_private: 0,
                mark_as_completed: 0,
                comment: "",
                documents: []
            });

            notify(res);
        } catch (error) {
            notify(error);
        }
    };

    return (
        <FormProvider {...form}>
            <Box
                component={"form"}
                onSubmit={handleSubmit(handleClick)}
                sx={{
                    boxShadow: "0px 14px 114px 8px rgba(0, 0, 0, 0.25)",
                }}
                paddingBlock="24px"
                paddingInline={isXs ? "24px" : "50px"}
            >

                <CommentInput
                    name="comment"
                    loading={isSubmitting}
                    taskView={taskView}
                    params={params}
                />

            </Box>
        </FormProvider>
    );
}
