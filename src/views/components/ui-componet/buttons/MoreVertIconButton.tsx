import { useState, ReactNode, MouseEvent, useCallback } from 'react';
import { useQueryClient, UseMutateAsyncFunction } from '@tanstack/react-query';

import { MoreVert } from '@mui/icons-material';
import { Popover, MenuItem, IconButton, MenuItemProps, popoverClasses } from '@mui/material';

import { notify } from 'helper/GlobalHelper';
import { useRouter } from 'helper/CustomHooks';
import { ActionType } from 'helper/types/GlobalTypes';

import ConfirmationPopup from 'views/components/popups/ConfirmationPopup';
import ConfirmationMailPopup from 'views/components/popups/ConfirmationMailPopup';

// eslint-disable-next-line @typescript-eslint/no-explicit-any
type ApiType = UseMutateAsyncFunction<any, any, string, unknown>;

type MenuItemBaseType = {
  label: string | ReactNode;
  menuItemProps?: MenuItemProps & {
    onSuccess?: (res: { [key: string]: unknown }) => void;
  };
  access: boolean;
  action?: ActionType;
  path?: string;
};
// Define the type for MenuItemType when action is 'confirmPopup'
type MenuItemConfirmType = MenuItemBaseType & {
  action: 'confirmPopup';
  confirmApi: ApiType;
};

// Define the type for MenuItemType when action is not 'confirmPopup'
type MenuItemNonConfirmType = MenuItemBaseType & {
  action?: Exclude<ActionType, 'confirmPopup'>;
  confirmApi?: never;
};

// Union type for MenuItemType
type MenuItemType = MenuItemConfirmType | MenuItemNonConfirmType;
type PopupType = {
  model: boolean;
  label: string;
  confirmApi?: ApiType;
  path?: string;
};
type Props = {
  menuItem: MenuItemType[];
  id?: string;
  deleteApi?: ApiType;
  refetchUrl: string;
  label: string;

  // isPending: boolean;
};

const MoreVertIconButton = ({
  menuItem,
  id = '',
  refetchUrl,
  label,
  deleteApi,
  // isPending
}: Props) => {
  const accessMenu = menuItem.filter((value) => value.access);
  const router = useRouter();
  const [open, setOpen] = useState<HTMLElement | null>(null);
  const refetch = useQueryClient();
  const includes = ['error', 'sucess'];
  const [model, setModel] = useState<PopupType>({
    // popupName: '',
    model: false,
    confirmApi: undefined,
    label: '',
    path: '/',
  });
  const [confirmModel, setConfirmModel] = useState<{
    model: boolean;
    content: string;
    message?: string;
  }>({
    model: false,
    content: '',
    message: '',
  });

  const [confirmModelMail, setConfirmModelMail] = useState<{
    model: boolean;
    content: string;
    message?: string;
  }>({
    model: false,
    content: '',
    message: '',
  });
  const handleOpenMenu = (event: MouseEvent<HTMLButtonElement>) => {
    setOpen(event.currentTarget);
  };

  const handleCloseMenu = () => {
    setOpen(null);
  };
  const handleAction = useCallback(
    (value: MenuItemType) => {
      switch (value.action) {
        case 'edit':
        case 'view':
        case 'pathById':
          router.pushById({ path: value?.path, id });
          break;
        case 'path':
          router.push(value.path ?? '/');
          break;
        case 'delete':
          setConfirmModel({
            ...confirmModel,
            content: '',
            model: true,
          });
          break;
        case 'confirmPopup':
          setModel({
            confirmApi: value.confirmApi,
            model: true,
            label: value.label as string,
          });
          break;
        case 'mail':
          setConfirmModelMail({
            ...confirmModelMail,
            content: '',
            model: true,
          });
          break;
        default:
          setOpen(null);
          break;
      }
    },
    [confirmModel, id, router, confirmModelMail]
  );
  const handleDeleteSumbit = async () => {
    deleteApi &&
      (await deleteApi(id, {
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
      }));
  };
  const handleCloseConfirm = () =>
    setModel({
      ...model,
      model: false,
      confirmApi: undefined,
      path: '/',
    });

  const handleConfirmSumbit = async () => {
    if (model.confirmApi) {
      try {
        const res = await model.confirmApi(id);
        notify(res);
        const menuItem = accessMenu.find((value) => model?.label === value?.label);
        if (menuItem?.menuItemProps?.onSuccess) {
          menuItem.menuItemProps.onSuccess(res);
        }
        handleCloseConfirm();
      } catch (error) {
        notify(error);
      }
    }
  };
  return (
    <>
      <IconButton onClick={handleOpenMenu} aria-label="more" id="long-button" aria-controls={'long-menu'} aria-expanded={'true'} aria-haspopup="true">
        <MoreVert />
      </IconButton>
      <Popover
        open={!!open}
        anchorEl={open}
        onClose={handleCloseMenu}
        anchorOrigin={{ vertical: 'top', horizontal: 'left' }}
        transformOrigin={{ vertical: 'top', horizontal: 'right' }}
        sx={{
          [`& .${popoverClasses.paper}`]: {
            minWidth: 140,
          },
        }}
      >
        {accessMenu.map((value, index) => (
          <MenuItem
            key={`${value.label}-id${index}`}
            {...value.menuItemProps}
            sx={{
              borderBottom: ({ palette }) => `1px solid ${palette.divider}`,
            }}
            onClick={(e) => {
              value?.menuItemProps?.onClick && value.menuItemProps.onClick(e);
              value?.action && handleAction(value);
              handleCloseMenu();
            }}
          >
            {value.label}
          </MenuItem>
        ))}
      </Popover>
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
        handleSubmit={handleDeleteSumbit}
        label={'Delete ' + label}
        sucesslabel={label + ' Deleted'}
        content={confirmModel.content}
      />
      <ConfirmationPopup
        open={model.model}
        handleClose={() => handleCloseConfirm()}
        handleSubmit={handleConfirmSumbit}
        label={model.label}
        content={null}
      />
      <ConfirmationMailPopup
        id={id}
        open={confirmModelMail.model}
        handleClose={() => {
          includes.includes(confirmModelMail.content) &&
            refetch.refetchQueries({
              queryKey: [refetchUrl],
            });

          setConfirmModelMail({
            ...confirmModelMail,
            model: false,
          });
        }}
      />
    </>
  );
};

export default MoreVertIconButton;
