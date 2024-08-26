import { Path, FieldValues, useFormContext } from 'react-hook-form';

import { useModuleFinder } from 'helper/CustomHooks';
import { OptionsType } from 'helper/types/GlobalTypes';
import { AsyncSelectFieldType } from 'helper/types/FormType';

import { useEssentialList } from 'store/hooks/EssentialHooks';

import { TableItem } from 'views/components/table-componet/form-table';
import ViewNewPageButton from 'views/components/ui-componet/buttons/ViewNewPageButton';

import InputField from '../../InputField';
import AsyncSelectField from '../../AsyncSelectField';

type ProductValue = {
  name: string;
  value: keyof OptionsType;
  defaultValue?: '' | null;
};
type Props = {
  productName: string;
  skuName: string;
  essentialParams?: EssentialReqType;
  children?: React.ReactNode;
  setOption?: ProductValue[];
  disableOption?: boolean;
  onChange?: (res?: OptionsType) => void;
  productFieldProps?: Omit<AsyncSelectFieldType, 'addName'>;
};
const EssentialNeed: EssentialType[] = ['Product'];

/**
 * This file is part of AutoPack.
 *
 * For Product commonly control here
 */
function ProductGroup<T extends FieldValues>({
  productName,
  skuName,
  children,
  essentialParams,
  setOption = [],
  disableOption = true,
  onChange,
  productFieldProps,
}: Props) {
  const finder = useModuleFinder();
  const { data: options, isLoading } = useEssentialList({
    params: {
      include: EssentialNeed,
      ...essentialParams,
    },
  });

  const { setValue, watch, control } = useFormContext();
  const handleProductValue = ({ option, response }: { option: ProductValue[]; response: OptionsType }) => {
    [...option, ...setOption].forEach((opt) =>
      setValue(opt.name as Path<T>, response?.[opt?.value] ?? opt.defaultValue ?? null, { shouldValidate: true })
    );
  };

  const filterKeyName = String(productName)?.split('.');
  const Path = finder.find('product-inventory')?.view?.path;

  return (
    <>
      <TableItem minWidth={200}>
        <AsyncSelectField
          name={productName as Path<T>}
          control={control}
          disabledArray={
            disableOption
              ? // eslint-disable-next-line @typescript-eslint/no-explicit-any
                watch(filterKeyName[0] as Path<T>).map((f: any) => {
                  return f?.[`${filterKeyName.slice(-1)[0]}`]?.value;
                })
              : []
          }
          textFieldProps={{
            placeholder: 'Select Product',
          }}
          {...productFieldProps}
          loading={isLoading || productFieldProps?.loading}
          addName={essentialParams?.include?.[0] ?? 'Product'}
          searchFilters={
            essentialParams?.warehouseId
              ? {
                  warehouseId: essentialParams?.warehouseId,
                }
              : undefined
          }
          options={options?.[essentialParams?.include?.[0] ?? 'Product']}
          onChange={(res) => {
            handleProductValue({ option: [{ name: skuName, value: 'SKU', defaultValue: '' }], response: res });
            onChange && onChange(res);
          }}
        />
      </TableItem>
      {children}
      <TableItem minWidth={150}>
        <InputField
          name={skuName as Path<T>}
          control={control}
          fieldProps={{
            InputProps: {
              readOnly: true,
              endAdornment: watch(productName as Path<T>)?.value && (
                <ViewNewPageButton url={Path} id={watch(productName as Path<T>)?.value as string} />
              ),
            },
            placeholder: 'SKU',
          }}
        />
      </TableItem>
    </>
  );
}

export default ProductGroup;
