import {
  Box,
  CircularProgress,
  IconButton,
  Stack,
  TextField,
} from "@mui/material";
import { ChangeEvent, useRef } from "react";
import {
  FormProvider,
  useController,
  useForm,
  useFormContext,
} from "react-hook-form";
import { useSaveComment } from "../../store/hooks/taskHooks";
import {
  notify,
  statusArray,
  uploadAccecpt,
  uploadValidationFile,
} from "../../utils/helpers/globalHelper";
import CustomCheckbox from "./form-fields/Checkbox";
import UploadDocs from "./UploadDocs";
import userStore from "../../zustand/UserZustand";
import { SendIcons, UploadDocuments } from "../../utils/theme/svg";
import MentionField from "./form-fields/MentionField";
import { useEssentailApi } from "../../store/hooks/essentailHooks";

const CommentInput = ({
  name = "comment",
  loading = false,
  taskView,
  params,
}: {
  name: string;
  loading: boolean;
  taskView: TaskFormType;
  params: TaskPagination;
}) => {
  const { control } = useFormContext();
  const { data } = useEssentailApi({
		keys: ["employee", "priority", "task-category"],
	});
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
    const preArray = Array.from(documentField?.value || []);
    const files = Array.from(e?.target?.files || []);
    const allArray = [...preArray, ...files];
    const uploadfiles = uploadValidationFile(
      (allArray as unknown as DocumentsType[]) || []
    );
    if (uploadfiles?.length > 0) {
      const newArray = uploadfiles.splice(-5);
      documentField.onChange(newArray);
    } else {
      documentField.onChange([]);
    }
  };

  const handleRemove = (fileToRemove: File) => {
    documentField?.onChange(
      files.filter((file: File) => file !== fileToRemove)
    );

    if (ref.current) {
      ref.current.value = "";
    }
  };

  const user = userStore().user;
  const checkMyTask = () => {
    return (
      user?.id === taskView?.assigned_to &&
      !statusArray.includes(taskView?.status?.name?.toLowerCase() || "") &&
      !(params.tab === "assigned_task" && taskView?.is_self_assign === 1)
    );
  };

  return (
    <>
      {files?.length > 0 && (
        <Stack
          sx={{
            display: "flex",
            flexDirection: "row",
            flexWrap: "wrap",
            gap: 2,
            marginBottom: 3,
          }}
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
        <Stack direction="row" spacing={3} marginBottom={"15px"}>
          {checkMyTask() && (
            <Box>
              <CustomCheckbox
                name="mark_as_completed"
                label="Mark as Completed"
              />
            </Box>
          )}
          {taskView?.is_self_assign === 0 && (
            <Box>
              <CustomCheckbox name="send_private" label="Send as Private" />
            </Box>
          )}
        </Stack>
      </Box>

      <Box
        display="flex"
        alignItems="center"
        sx={{
          "& .MuiIconButton-root:hover": {
            background: "#f2dde3 !important",
          },
        }}
      >
        <Box paddingRight={{ xs: 1, md: 2 }}>
          {files?.length < 5 && (
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
                  key={Math.random()}
                  // key={String(field)}
                  // {...documentField}
                  // {...documentField}
                  ref={ref}
                  accept={uploadAccecpt}
                  hidden
                  onChange={handleUpload}
                />
                {/* <img
                                    src={uploadIcon}
                                    width={20}
                                    height={20}
                                    alt="upload1"
                                    style={{
                                        display: "flex",
                                        justifyContent: "center",
                                        alignItems: "center",
                                    }}
                                /> */}
                <UploadDocuments
                  sx={{
                    width: 20,
                    height: 20,
                    display: "flex",
                    justifyContent: "center",
                    alignItems: "center",
                  }}
                />
              </label>
            </IconButton>
          )}
        </Box>
        {/* <TextField
          {...field}
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
                  "& .MuiIconButton-root:hover": {
                    background: "#f2dde3 !important",
                  },
                }}
              >
                <SendIcons sx={{ width: 20, height: 20 }} />
              </IconButton>
            ),
          }}
        /> */}
        <MentionField options={data?.data?.employee} row={1} name="comment"  placeholder="Type message" mt loading={loading}/>
      </Box>
    </>
  );
};

export default function CardMessage({
  taskView,
  isXs,
  params,
}: {
  taskView: TaskFormType;
  isXs: boolean;
  params: TaskPagination;
}) {
  const { mutateAsync } = useSaveComment();

  const form = useForm<TaskComment>({
    defaultValues: {
      task_id: taskView?.id,
      send_private: 0,
      mark_as_completed: 0,
      comment: "",
      documents: [],
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
        documents: [],
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
