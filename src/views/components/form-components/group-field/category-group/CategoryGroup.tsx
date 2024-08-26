/**
 * This file is part of AutoPack.
 *
 * For CategoryGroup commonly control here
 */
import { Path, Control, FieldValues } from 'react-hook-form';

import { AsyncSelectFieldType } from 'helper/types/FormType';

import { TableItem } from 'views/components/table-componet/form-table';

import AsyncSelectField from '../../AsyncSelectField';

type Props<T extends FieldValues> = {
  categoryName: string;
  subCategory: string;
  control: Control<T>;
  categoryProps?: Omit<AsyncSelectFieldType, 'addName'>;
};

function CategoryGroup<T extends FieldValues>({ control, categoryProps, categoryName, subCategory }: Props<T>) {
  return (
    <>
      <TableItem minWidth={150}>
        <AsyncSelectField
          name={categoryName as Path<T>}
          control={control}
          addName="Category"
          textFieldProps={{
            placeholder: 'Select Category',
          }}
          fieldProps={{
            readOnly: true,
          }}
          {...categoryProps}
        />
      </TableItem>
      <TableItem minWidth={150}>
        <AsyncSelectField
          name={subCategory as Path<T>}
          control={control}
          textFieldProps={{
            placeholder: 'Select Sub Category',
          }}
          fieldProps={{
            readOnly: true,
          }}
          {...categoryProps}
          addName="SubCategory"
        />
      </TableItem>
    </>
  );
}

export default CategoryGroup;
