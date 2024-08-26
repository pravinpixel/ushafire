import { lazy, useState, MouseEvent, useCallback } from 'react';
import { Control, FieldValues, useController } from 'react-hook-form';

import { MoreVert } from '@mui/icons-material';
import { Popover, MenuItem, IconButton, popoverClasses } from '@mui/material';

import { PROJECT_CONSTANTS } from 'helper/GlobalHelper';
import { ProductQtySplit } from 'helper/types/inventory-management/StockInwardType';
import { PopupNames, MenuItemType, DeletedIdsType, FieldActionType } from 'helper/types/GlobalTypes';

import Loadable from '../loader/Loadable';

const AddBreakUpPopup = Loadable(lazy(() => import('../popups/AddBreakUpPopup')));
const ProductQtySplitPopup = Loadable(lazy(() => import('../popups/ProductQtySplitPopup')));
const StockInwardSplitPopup = Loadable(lazy(() => import('../popups/StockInwardSplitPopup')));
const StockOutQtySplitPopoup = Loadable(lazy(() => import('../popups/StockOutQtySplitPopup')));

type PopSubmitRes = {
  arrayData: ProductQtySplit[];
  delete_id: string[];
  [key: string]: unknown;
};
type PopupPropsType = {
  name: PopupNames;
  defaultValue: unknown;
  handleSumbit: (res: PopSubmitRes) => void;
};
type Props = {
  name?: string;
  menuItem: MenuItemType[];
  id?: string;
  control?: Control<FieldValues>;
  onClick?: () => void;
  popupProps?: PopupPropsType[];
  // handleProductQtySplit?: (res: ProductQtySplitRes) => void;
  // handleStockOutQtySplit?: (res: ProductQtySplitRes) => void;
};
type PopupType = {
  popupName: PopupNames;
  model: boolean;
  // defaultValue?: unknown;
};
const MoreVertField = ({ name, menuItem, id = '', control, onClick, popupProps }: Props) => {
  const accessMenu = menuItem;
  const { field } = useController({
    name: `${name}${PROJECT_CONSTANTS.DeleteKey}` as never,
    control,
    defaultValue: [] as never,
  });
  const [open, setOpen] = useState<HTMLElement | null>(null);
  const [model, setModel] = useState<PopupType>({
    popupName: '',
    model: false,
  });
  const handlePopupProps = (popName: PopupNames) => popupProps && popupProps.find((value) => value.name === popName);
  const handleOpenMenu = (event: MouseEvent<HTMLButtonElement>) => {
    setOpen(event.currentTarget);
  };

  const handleCloseMenu = () => {
    setOpen(null);
  };
  const handleClose = () => {
    setModel({
      ...model,
      popupName: '',
      model: false,
    });
  };
  const handleDeleteField = useCallback(() => {
    id && field.onChange([...((field.value ?? []) as DeletedIdsType), id]);
    onClick && onClick();
  }, [field, id, onClick]);

  const handleAction = useCallback(
    (action: FieldActionType, name: PopupNames) => {
      switch (action) {
        case 'fieldDelete':
          handleDeleteField();
          break;
        case 'popup':
          setModel({
            popupName: name,
            model: true,
          });
          break;
        default:
          setOpen(null);
          break;
      }
    },
    [handleDeleteField]
  );

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
              value?.action && handleAction(value.action, value?.name ?? '');
              handleCloseMenu();
            }}
          >
            {value.label}
          </MenuItem>
        ))}
      </Popover>
      {model.popupName === 'ProductQtySplit' && (
        <ProductQtySplitPopup
          key={'ProductQtySplit'}
          name="ProductQtySplit"
          handleClose={handleClose}
          open={model.model}
          modelName={model.popupName}
          defaultValues={handlePopupProps('ProductQtySplit')?.defaultValue as never}
          handleDataSumbit={(data: PopSubmitRes) => {
            handlePopupProps('ProductQtySplit')?.handleSumbit &&
              handlePopupProps('ProductQtySplit')?.handleSumbit({
                ...data,
                arrayData: data?.productQtySplit as never,
                delete_id: data?.productQtySplit_deleted_ids as string[],
                productQtySplit: undefined,
              });
            handleClose();
          }}
        />
      )}
      {model.popupName === 'StockInwardSplitPopup' && (
        <StockInwardSplitPopup
          key={'StockInwardSplitPopup'}
          name="StockInwardSplitPopup"
          handleClose={handleClose}
          open={model.model}
          modelName={model.popupName}
          defaultValues={handlePopupProps('StockInwardSplitPopup')?.defaultValue as never}
          handleDataSumbit={(data: PopSubmitRes) => {
            handlePopupProps('StockInwardSplitPopup')?.handleSumbit &&
              handlePopupProps('StockInwardSplitPopup')?.handleSumbit({
                ...data,
                arrayData: data?.productQtySplit as never,
                delete_id: data?.productQtySplit_deleted_ids as string[],
                productQtySplit: undefined,
              });
            handleClose();
          }}
        />
      )}
      {model.popupName === 'StockOutQtySplitPopoup' && (
        <StockOutQtySplitPopoup
          key={'StockOutQtySplitPopoup'}
          name="StockOutQtySplitPopoup"
          handleClose={handleClose}
          open={model.model}
          modelName={model.popupName}
          defaultValues={handlePopupProps('StockOutQtySplitPopoup')?.defaultValue as never}
          handleDataSumbit={(data: PopSubmitRes) => {
            handlePopupProps('StockOutQtySplitPopoup')?.handleSumbit &&
              handlePopupProps('StockOutQtySplitPopoup')?.handleSumbit({
                ...data,
                arrayData: data?.productQtySplit as never,
                productQtySplit: undefined,
                delete_id: [],
              });
            handleClose();
          }}
        />
      )}
      {model.popupName === 'AddBreakUpPopup' && (
        <AddBreakUpPopup
          key={'AddBreakUpPopup'}
          name="AddBreakUpPopup"
          handleClose={handleClose}
          open={model.model}
          modelName={model.popupName}
          defaultValues={handlePopupProps('AddBreakUpPopup')?.defaultValue as never}
          handleDataSumbit={(res: PopSubmitRes) => {
            handlePopupProps('AddBreakUpPopup')?.handleSumbit({
              ...res,
              arrayData: [],
              delete_id: [],
            });
            handleClose();
          }}
        />
      )}
    </>
  );
};

/**
 * This file is part of AutoPack.
 *
 * It is For Form Actions
 * and also for form field delete
 */
export default MoreVertField;
