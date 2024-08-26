/**
 * This file is part of AutoPack.
 *
 * Its is form Field
 *
 */
import { Ref, forwardRef, useCallback } from 'react';
import { Path, Control, PathValue, useController, UseControllerProps } from 'react-hook-form';

import { IconButton } from '@mui/material';

import { DeleteIcon } from 'theme/svg';

import { PROJECT_CONSTANTS } from 'helper/GlobalHelper';
import { DeletedIdsType } from 'helper/types/GlobalTypes';
import { DeleteFieldButtonType } from 'helper/types/FormType';

import { TableItem } from '../table-componet/form-table';

type FormValues = {
  [key: string]: unknown;
};

// type FieldType = Omit<BoxProps, 'onClick'> & {
//   _id?: string;
//   onClick?: () => void;
// };

const DeleteFieldButton = forwardRef(
  <T extends FormValues>(props: UseControllerProps<T> & { control: Control<T> } & DeleteFieldButtonType, ref: Ref<HTMLDivElement>) => {
    const { name, control, onClick, _id = '', ...others } = props;
    const { field } = useController({
      name: `${name}${PROJECT_CONSTANTS.DeleteKey}` as never,
      control,
      defaultValue: [] as PathValue<T, Path<T>>,
    });

    const handleDeleteField = useCallback(() => {
      _id && field.onChange([...((field.value ?? []) as DeletedIdsType), _id]);
      onClick && onClick();
    }, [_id, field, onClick]);

    return (
      <TableItem minWidth={20} ref={ref} {...others}>
        <IconButton onClick={() => handleDeleteField()}>
          <DeleteIcon />
        </IconButton>
      </TableItem>
    );
  }
);

DeleteFieldButton.displayName = 'DeleteFieldButton';

export default DeleteFieldButton as <T extends FormValues>(
  props: UseControllerProps<T> & { control: Control<T> } & DeleteFieldButtonType
) => JSX.Element;
