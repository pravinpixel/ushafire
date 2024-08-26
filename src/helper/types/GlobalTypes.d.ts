/* eslint-disable @typescript-eslint/no-explicit-any */
import * as yup from 'yup';
import { ReactNode } from 'react';
import { JSX } from 'react/jsx-runtime';

import { MenuItemProps } from '@mui/material';
import { LoadingButtonProps } from '@mui/lab/LoadingButton';
import { GridColDef, GridValidRowModel } from '@mui/x-data-grid';

import { ModuleType } from '../GlobalHelper';

type MyProfileDataType = {
  _id: string;
  code: string;
  name: string;
  email: string;
  user_id: string;
  role_id: {
    _id: string;
    name: string;
    code: string;
    access_manage: ModuleType[];
    status: boolean;
  };
  dynamic_path: any;
};
type BaseOptionType = {
  label?: string;
  value?: string | number;
};
type OptionsType = BaseOptionType & {
  website?: string;
  productId?: string;
  productCode?: string;
  status?: string;
  customerName?: string;
  quantity?: number;
  indicator?: number;
  product?: any;
  address?: string;
  selected?: boolean;
  disabled?: boolean;
  group?: string;
  name?: string;
  parentId?: string;
  code?: string;
  children?: BaseOptionType[];
  SKU?: string;
  sku?: string;
  productCategory?: BaseOptionType | null;
  productSubCategory?: BaseOptionType | null;
  brand?: BaseOptionType | null;
  costPrice?: number;
  disabled?: boolean;
  slug?: string;
  hsnCode?: string;
  parent?: BaseOptionType | null;
  contactType?: string;
  UOM?: BaseOptionType | null;
  customerPhoto?: string;
  year?: number;
  quantityInStock?: number;
  customerId?: OptionsType;
  // [key: string]: unknown;
};

type DeletedIdsType = string[] | [];
type ImageResponse = {
  [key: string]: unknown;
  _id?: string;
  imagePath?: string;
};
type GetResponseType = {
  success: boolean;
  message: string;
  data: [];
};
type ErrorResponseType = {
  success: boolean;
  message: 'unsuccess' | 'Validation Error';
  error: string | object;
};
type CreateRequestType<T> = {
  formData: T;
};
type EditRequestType<T> = {
  id: string;
  formData: T;
};
type FormCompoundProps<T> = {
  title: string;
  navigateLink: string;
  permission?: ModuleType;
  defaultValue?: T;
};

type ConfirmModelType = {
  model: boolean;
  id: null | string | undefined;
  content: string;
};

type StatusType = {
  status: boolean;
  _id: string;
};

interface ComponentProps extends JSX.IntrinsicAttributes {
  permission: ModuleType; // Define the type of the permission prop
  parentPermission?: ModuleType;
}

type ErrorType = FieldError & {
  value?: {
    message: string;
  };
};

type FieldActionType = 'fieldDelete' | 'popup';
type PopupNames = '' | 'ProductQtySplit' | 'StockOutQtySplitPopoup' | 'AddBreakUpPopup' | 'StockInwardSplitPopup';
type ActionType = '' | 'delete' | 'edit' | 'view' | 'create' | 'mail' | 'pathById' | 'path' | 'confirmPopup';
type AddMoreButtonProps = LoadingButtonProps & {
  label: string;
  access?: boolean;
};
type FrontEndName =
  | 'dashboard'
  | 'dashboard-2'
  | 'inventory-management'
  | 'product-inventory'
  | 'barcode'
  | 'warehouse-wise-stock'
  | 'stock-inward'
  | 'stock-outward'
  | 'stock-level-indicators'
  | 'sales-and-purchase'
  | 'sales-crm-system'
  | 'contacts'
  | 'companies'
  | 'deals'
  | 'loans'
  | 'purchase-order'
  | 'sales-order'
  | 'blanket-order'
  | 'sales-invoice'
  | 'lead-management'
  | 'opportunity'
  | 'quotation'
  | 'sales-return'
  | 'master'
  | 'department'
  | 'designation'
  | 'customer-group'
  | 'lead-status'
  | 'opportunity-stage'
  | 'category'
  | 'sub-category'
  | 'brand'
  | 'location'
  | 'warehouse'
  | 'bay'
  | 'rack'
  | 'stacking'
  | 'uom'
  | 'country'
  | 'state'
  | 'city'
  | 'currency'
  | 'business-vertical'
  | 'sub-vertical'
  | 'customer-type'
  | 'division'
  | 'product-group'
  | 'stock'
  | 'product-type'
  | 'tandc-template'
  | 'delivery-terms-template'
  | 'type'
  | 'bin'
  | 'shelf'
  | 'notification'
  | 'after-sales'
  | 'service-contracts'
  | 'reports'
  | 'documents'
  | 'module'
  | 'parent-module'
  | 'child-module'
  | 'page'
  | 'parent-page'
  | 'child-page'
  | 'admin-settings'
  | 'user'
  | 'permission'
  | 'role'
  | 'supplier'
  | 'po-request'
  | 'customer-payments'
  | 'vendor-payments'
  | 'manage-payments'
  | 'loan-return';

type MenuItemType = {
  label: string | ReactNode;
  menuItemProps?: MenuItemProps;
  action?: FieldActionType;
  path?: string;
  name?: PopupNames;
};

type DynamicFormComponentType = {
  name: 'OrganizationDetailForm' | 'ContactDetailForm';
  component: React.ReactNode;
  defaultValue?: unknown;
  validation: yup.ObjectSchema<any>;
  ifCodeGenrate?: {
    vision: VisionType;
    keyName: string;
  };
};

type GridColDefCustom<T extends GridValidRowModel> = {
  field?: keyof T | 'action';
} & GridColDef<T>;

type DynamicTablesNameType = 'quotationItems' | 'blanketOrderItems' | 'salesInvoiceItems' | 'loanItems' | 'saleOrderItems';
