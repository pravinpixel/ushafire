import { useState } from 'react';
import { useQueryClient, UseMutateAsyncFunction } from '@tanstack/react-query';

import { IconButton } from '@mui/material';

import { DeleteIcon } from 'theme/svg';

import ConfirmationPopup from '../../popups/ConfirmationPopup';

type DeleteComponetType = {
  id: string;
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  deleteApi: UseMutateAsyncFunction<any, any, string, unknown>;
  refetchUrl: string;
  label: string;
  isPending: boolean;
};

function DeleteButton({ id, deleteApi, refetchUrl, label }: DeleteComponetType) {
  const refetch = useQueryClient();
  const includes = ['error', 'sucess'];
  const [confirmModel, setConfirmModel] = useState<{
    model: boolean;
    content: string;
    message?: string;
  }>({
    model: false,
    content: '',
    message: '',
  });

  const handleDeleteSumbit = async () => {
    await deleteApi(id, {
      onSuccess: (res) => {
        setConfirmModel({
          ...confirmModel,
          content: 'sucess',
          message: res?.message,
        });
      },
      onError: (error) => {
        const message = typeof error.error === 'string' ? error?.error : '';
        setConfirmModel({
          ...confirmModel,
          content: 'error',
          message: message,
        });
      },
    });
  };
  return (
    <>
      <IconButton
        onClick={() =>
          setConfirmModel({
            ...confirmModel,
            content: '',
            model: true,
          })
        }
      >
        <DeleteIcon />
      </IconButton>
      <ConfirmationPopup
        open={confirmModel.model}
        handleClose={() => {
          includes.includes(confirmModel.content) &&
            refetch.refetchQueries({
              queryKey: [refetchUrl],
            });

          setConfirmModel({
            ...confirmModel,
            model: false,
          });
        }}
        message={confirmModel.message}
        handleSubmit={() => handleDeleteSumbit()}
        label={'Delete ' + label}
        sucesslabel={label + ' Deleted'}
        content={confirmModel.content}
      />
    </>
  );
}

export default DeleteButton;
