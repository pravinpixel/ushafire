/* eslint-disable @typescript-eslint/no-explicit-any */
import { Dayjs } from 'dayjs';
import { Resolver } from 'react-hook-form';
import { ReactNode, FormEventHandler } from 'react';
import { UseMutateAsyncFunction } from '@tanstack/react-query';

import { DatePickerProps } from '@mui/x-date-pickers';
import { BoxProps, SwitchProps, CheckboxProps, TextFieldProps, RadioGroupProps, AutocompleteProps, FormControlLabelProps } from '@mui/material';

import { MasterInputsType } from 'helper/CustomHooks';
import { SearchFilterOptions } from 'helper/types/inventory-management/ProductInventoryType';

import { MasterForm } from './MasterType';
import { OptionsType } from './GlobalTypes';

type ActInactSwitchFieldType = {
  labelProps?: Omit<FormControlLabelProps, 'control'>;
  fieldProps?: SwitchProps;
};

type AddAsyncSelectFieldType = {
  fieldProps?: AutocompleteProps<unknown, any, any, any>;
  options?: EssentialDataType;
  label?: string;
  addName: EssentialType;
  fend_component: string;
  formDetails: EssentailAddPopupformDetailsTypes;
  inputOptions: MasterInputsType;
  mutateAsync: UseMutateAsyncFunction<any, any, any, unknown>;
  onAddClick?: () => void;
  loading?: boolean;
  textFieldProps: TextFieldProps;
  searchFilters?: SearchFilterOptions;
  schema?: Resolver<MasterForm>;
};

type AsyncSelectFieldType = {
  label?: string | ReactNode;
  readOnly?: boolean;
  disableClearable?: boolean | undefined;
  onChange?: (res: OptionsType) => void;
  onSearchChange?: (res: string) => void;
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  fieldProps?: Partial<AutocompleteProps<unknown, any, boolean | undefined, any>>;
  options?: OptionsType[] | never[];
  textFieldProps?: TextFieldProps;
  loading?: boolean;
  addName: EssentialType;
  searchFilters?: SearchFilterOptions;
  disabledArray?: string[];
};

type AutoGenerateSkuFieldType = {
  fieldProps?: TextFieldProps;
  label?: string;
  vision: VisionType;
  checkBoxProps?: Omit<FormControlLabelProps, 'control'>;
};

type CheckBoxFieldType = {
  labelProps?: Omit<FormControlLabelProps, 'control'>;
  fieldProps?: CheckboxProps;
  onChange?: (value: boolean) => void;
};

type DatePickerFieldType = {
  label?: string;
  fieldProps?: TextFieldProps;
  pickerProps?: DatePickerProps<Dayjs | string>;
};

type DeleteFieldButtonType = Omit<BoxProps, 'onClick'> & {
  _id?: string;
  onClick?: () => void;
};

type DimensionFieldType = {
  label?: string;
  fieldProps?: TextFieldProps;
  onChange?: FormEventHandler<HTMLDivElement>;
  dimension: string[];
};

type DragAndDropImageFieldType = {
  label?: string;
  fieldProps?: TextFieldProps;
  onChange?: (file: File[]) => void;
};

type DragAndDropImportFieldType = {
  defaultImportValue?: unknown;
  fieldProps?: TextFieldProps;
  label?: string;
  onChange?: (file: { data: unknown; error: unknown }) => void;
  url: ImportUrls;
  sampleDownloadUrl?: ImportUrls;
};

type InputFieldType = {
  label?: string;
  fieldProps?: TextFieldProps;
  onChange?: FormEventHandler<HTMLDivElement>;
};

type InputSelectFieldType = {
  label?: string;
  position?: 'startAdornment' | 'endAdornment';
  codeName: string;
  loading?: boolean;
  options?: OptionsType[] | string[];
  fieldProps?: TextFieldProps;
  onChange?: FormEventHandler<HTMLDivElement>;
};
type MinsPlusType = 'add' | 'minus';
type NumberInputFieldType = {
  label?: string;
  fieldProps?: TextFieldProps;
  onChange?: (res?: string | number) => void;
  onBlur?: (res?: string | number) => void;
  toFixed?: number;
  min?: number;
  max?: number | null;
  inputButton?: boolean;
  handleMinsPlus?: (type: MinsPlusType) => void;
};

type RadioGroupFieldType = {
  label?: string;
  required?: boolean;
  fieldProps?: RadioGroupProps;
  options?: SelectItem[];
};
type SelectItem = {
  value?: string;
  label?: string;
  selected?: boolean;
  disabled?: boolean;
  group?: string;
  [key: string]: unknown;
};

type SelectFieldType = {
  label?: string;
  fieldProps?: SelectProps;
  options?: (string | number | OptionsType)[];
};

type SwitchFieldType = {
  labelProps?: Omit<FormControlLabelProps, 'control'>;
  fieldProps?: SwitchProps;
};

type UploadDocumentFieldType = {
  fieldProps?: TextFieldProps;
};

type FieldType = {
  label?: string;
  fieldProps?: TextFieldProps;
};
