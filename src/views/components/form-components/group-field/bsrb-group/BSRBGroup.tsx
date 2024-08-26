/**
 * This file is part of AutoPack.
 *
 * For Bay ,Rack , Shelf, Bin
 * commonly control from here
 */

import { Path, Control, FieldValues, UseFormWatch, UseFormSetValue } from 'react-hook-form';

import { BoxProps } from '@mui/material';

import { AsyncSelectFieldType } from 'helper/types/FormType';

import { useEssentialList } from 'store/hooks/EssentialHooks';

import { TableItem } from 'views/components/table-componet/form-table';

import AsyncSelectField from '../../AsyncSelectField';

type Props<T extends FieldValues> = {
  enabled?: boolean;
  control: Control<T>;
  watch: UseFormWatch<T>;
  setValue: UseFormSetValue<T>;
  bayName: string;
  rackName: string;
  shelveName: string;
  binName: string;
  bayProps?: Omit<AsyncSelectFieldType, 'addName'>;
  rackProps?: Omit<AsyncSelectFieldType, 'addName'>;
  shelveProps?: Omit<AsyncSelectFieldType, 'addName'>;
  binProps?: Omit<AsyncSelectFieldType, 'addName'>;
  emptyBin?: {
    wareHouseId?: string | number;
    showEmptyBin: boolean;
  };
  wholeProps?: {
    tableProps?: BoxProps;
    fieldProps: Omit<AsyncSelectFieldType, 'addName'>;
  };
};
const EssentialNeed: EssentialType[] = ['Bay', 'Rack', 'Shelf', 'Bin'];
function BSRBGroup<T extends FieldValues>({
  enabled = true,
  control,
  bayName,
  binName,
  shelveName,
  rackName,
  watch,
  setValue,
  wholeProps,
}: Props<T>) {
  const { data: options, isLoading } = useEssentialList({
    params: {
      include: EssentialNeed,
      enabled: enabled,
    },
  });
  // const { data: optionBin, isLoading: binLoading } = useEssentialList({
  //   params: {
  //     include: ['Bin-warehouse'],
  //     enabled: !!emptyBin?.wareHouseId && !!watch(shelveName as Path<T>)?.value,
  //     warehouseId: emptyBin?.wareHouseId,
  //     shelfId: watch(shelveName as Path<T>)?.value,
  //   },
  // });
  const handleBSRBValue = ({ name }: { name: string[] }) => {
    name.forEach((valueName) => setValue(valueName as Path<T>, null as never));
  };
  return (
    <>
      <TableItem minWidth={150} {...wholeProps?.tableProps}>
        <AsyncSelectField
          name={bayName as Path<T>}
          control={control}
          addName="Bay"
          textFieldProps={{
            placeholder: 'Select Bay',
          }}
          loading={isLoading}
          {...wholeProps?.fieldProps}
          options={options?.Bay}
          onChange={(res) => res === null && handleBSRBValue({ name: [rackName, shelveName, binName] })}
        />
      </TableItem>
      <TableItem minWidth={150} {...wholeProps?.tableProps}>
        <AsyncSelectField
          name={rackName as Path<T>}
          control={control}
          searchFilters={{
            key: 'Bay',
            value: watch(bayName as Path<T>)?.value,
          }}
          addName="Rack"
          textFieldProps={{
            placeholder: 'Select Rack',
          }}
          loading={isLoading}
          onChange={(res) => res === null && handleBSRBValue({ name: [shelveName, binName] })}
          {...wholeProps?.fieldProps}
          options={options?.Rack.filter((option) => option.parentId === watch(bayName as Path<T>)?.value)}
        />
      </TableItem>
      <TableItem minWidth={150} {...wholeProps?.tableProps}>
        <AsyncSelectField
          name={shelveName as Path<T>}
          control={control}
          addName="Shelf"
          searchFilters={{
            key: 'Rack',
            value: watch(rackName as Path<T>)?.value,
          }}
          textFieldProps={{
            placeholder: 'Select Shelves',
          }}
          loading={isLoading}
          onChange={(res) => res === null && handleBSRBValue({ name: [binName] })}
          {...wholeProps?.fieldProps}
          options={options?.Shelf.filter((option) => option.parentId === watch(rackName as Path<T>)?.value)}
        />
      </TableItem>
      <TableItem minWidth={150} {...wholeProps?.tableProps}>
        <AsyncSelectField
          name={binName as Path<T>}
          control={control}
          textFieldProps={{
            placeholder: 'Select Bin',
          }}
          searchFilters={{
            key: 'Shelf',
            value: watch(shelveName as Path<T>)?.value,
          }}
          addName="Bin"
          loading={
            // emptyBin?.showEmptyBin ? binLoading :
            isLoading
          }
          {...wholeProps?.fieldProps}
          options={// emptyBin?.showEmptyBin
          //   ? optionBin?.['Bin-warehouse']
          //   :
          options?.Bin?.filter((option) => option.parentId === watch(shelveName as Path<T>)?.value)}
        />
      </TableItem>
    </>
  );
}

export default BSRBGroup;
