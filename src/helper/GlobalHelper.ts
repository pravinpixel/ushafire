/* eslint-disable max-lines */
/* eslint-disable @typescript-eslint/no-explicit-any */
import CryptoJS from 'crypto-js';
import { ChangeEvent } from 'react';
import dayjs, { Dayjs } from 'dayjs';
import { jwtDecode } from 'jwt-decode';
import { toast, ExternalToast } from 'sonner';
import { SetValueConfig, UseFormSetError } from 'react-hook-form';

import { ChipOwnProps, createFilterOptions } from '@mui/material';

import { getLocalStorage } from 'configs/StorageConfigs';

import { components } from './AllComponents';
import { OptionsType } from './types/GlobalTypes';
import { PaginationInterFace } from './types/TableTypes';
export interface Action {
  access: boolean;
  path?: string;
  label?: string; // Optional for more descriptive action labels
}

export interface ModuleType {
  // [key: string]: unknown;
  _id?: string;
  name: string;
  path: string;
  view: Action;
  edit: Action;
  add?: Action; // Optional if adding is supported
  delete: Action;
  export: Action;
  access: boolean;
  index?: boolean;
  slug?: string;
  fend_component?: string;
  addMore?: ModuleType[];
  child?: ModuleType[]; // Optional for nested module
}

export const SESSIONANDLOCAL = {
  PROJECT_NAME_ROLE: 'PROJECT_NAME__ROLE',
  PROJECT_NAME_LABEL: 'AUTOPACK V1.0',
  PROJECT_NAME_EMPLOYEEID: 'PROJECT_NAME__EMPLOYEEID',
  PROJECT_ACCESS_TOKEN: 'ACCESS_TOKEN',
  PROJECT_REFRESH_TOKEN: 'REFRESH_TOKEN',
};
/** Get Project Static Constants */
export const PROJECT_CONSTANTS = {
  /** CACHE_TIME for the React Query */
  CACHE_TIME: 60 * 1000 * 60,
  /** Get Project Doller */
  DOLLER: 'S$',
  /** Get Project Percentage */
  Percentsign: '%',
  /** Get Delete key of all table Array */
  DeleteKey: '_deleted_ids',
  /** Get Form Date Format */
  DateFormat: 'DD-MM-YYYY',
  /** Get Table Date Format */
  TableDateFormat: 'MMMM DD, YYYY',
  /** Get form Image Size  */
  maxSizeInBytes: 2 * 1024 * 1024,
  /** Get Height of the Image */
  maxWidthHeightBytes: { width: 2560, height: 1600 },
  /** Get Image Types */
  imageTypes: { image: ['jpg', 'png', 'jpeg'] },
  /** Get Image Types */
  TextAreaMaxCount: 300,
};

// export const CACHE_TIME = 60 * 1000 * 60;

// export const DOLLER = 'S$';
// export const Percentsign = '%';
// export const TableDateFormat = 'DD-MM-YYYY';
// export const TableDefaultDateFormat = 'MMMM DD, YYYY';
// export const DeleteKey = '_deleted_ids';

// export const maxSizeInBytes = 2 * 1024 * 1024;

// export const maxTypeInBytes = { image: ['jpg', 'png', 'jpeg'] };

// export const maxWidthHeightBytes = { width: 2560, height: 1600 };

export type staticOptionsKey =
  | 'statusOption'
  | 'weightOption'
  | 'yesNoOption'
  | 'salesTargetOption'
  | 'productStatus'
  | 'leadType'
  | 'opportunityType';
export type staticOptionsTypes = {
  // eslint-disable-next-line no-unused-vars
  [key in staticOptionsKey]: string[];
};

export const staticOptions: staticOptionsTypes = {
  statusOption: ['In Stock', 'Out of Stock'],
  productStatus: ['Active', 'Inactive'],
  weightOption: ['gm'],
  salesTargetOption: ['Quarterly', 'Half', 'Annual'],
  leadType: ['Loan', 'Sale', 'Blanket'],
  opportunityType: ['Hot', 'Warm', 'Cold'],
  yesNoOption: [],
};
export const LeadQualificationOptions = [
  {
    label: 'Qualified',
    value: 'Qualified',
  },
  {
    label: 'Not Qualified',
    value: 'Not Qualified',
  },
];
export const QuotationQualificationOptions = [
  {
    label: 'Summary',
    value: 'Summary',
  },
  {
    label: 'Detailed',
    value: 'Detailed',
  },
];
export const ConfigurationOptions = [
  {
    label: 'S3 Bucket',
    value: 's3',
  },
  {
    label: 'Local Storage',
    value: 'local',
  },
];
/** Create Label Value */
export function CreateLabelValue(name: keyof staticOptionsTypes) {
  return staticOptions[name].map((e, index) => ({
    label: capitalizeFirstLetter(e as string),
    value: index,
  })) as OptionsType[];
}

export const InitialPagniationParams: PaginationInterFace = {
  page: 0,
  pageSize: 20,
  search: '',
  department: [],
  designation: [],
  'department-sub': [],
  'designation-sub': [],
  productStatus: [],
};

/** Toast Position */
type ToastPosition = 'top-left' | 'top-right' | 'bottom-left' | 'bottom-right' | 'top-center' | 'bottom-center';

export const permissions: ModuleType[] = [
  {
    slug: 'dashboard',
    fend_component: 'dashboard',
    name: 'Dashboard',
    path: '/',
    access: true,
    add: {
      access: true,
    },
    view: {
      access: true,
      path: '/dashboard/view/:id',
    },
    edit: {
      access: true,
      path: '/dashboard/view/:id',
    },
    delete: {
      access: true,
      path: '/dashboard/view/:id',
    },
    export: {
      access: true,
      path: '/dashboard/view/:id',
    },
  },
];

export function dynamicRoutes(dynamicRoute?: ModuleType[]) {
  const routes = dynamicRoute && dynamicRoute?.length >= 1;
  const permissionss = routes ? [...dynamicRoute, ...permissions] : [...permissions];
  const route: any = [];
  //Removing unnecessary details and set dynamic route based on array
  const includes = ['view', 'edit', 'add', 'list'];
  Object.entries(permissionss).forEach(([, permission]) => {
    const n = String(permission?.fend_component);
    route.push({
      path: permission?.path,
      name: permission.name,
      slug: permission.slug,
      fend_component: permission.fend_component,
      element: components(permission)?.[n]?.['list'] || '',
    });
    permission?.addMore &&
      permission?.addMore?.length > 0 &&
      permission?.addMore?.forEach((more) => {
        const fend_component_lowercase = String(more?.fend_component);
        route.push({
          path: more?.path,
          name: more.name,
          slug: more.slug,
          fend_component: more.fend_component,
          element: components(permission)?.[n]?.[fend_component_lowercase] || '',
        });
      });
    permission?.child &&
      permission?.child?.length >= 1 &&
      permission?.child?.forEach((childPermission) => {
        const ns = String(childPermission?.fend_component);
        childPermission?.path &&
          route.push({
            path: childPermission?.path,
            name: childPermission.name,
            slug: childPermission.slug,
            fend_component: childPermission.fend_component,
            element: components(childPermission)?.[generateSlugs(n)]?.[generateSlugs(ns)]?.['list'] || '',
          });
        childPermission?.addMore &&
          childPermission?.addMore?.length > 0 &&
          childPermission?.addMore?.forEach((more) => {
            const fend_component_lowercase = String(more?.fend_component);
            route.push({
              path: more?.path,
              name: more.name,
              slug: more.slug,
              fend_component: more.fend_component,
              element: components(childPermission)?.[generateSlugs(n)]?.[generateSlugs(ns)]?.[fend_component_lowercase] || '',
            });
          });
        Object.entries(childPermission).forEach(([key, value]) => {
          includes.includes(key) &&
            value?.access &&
            route.push({
              path: value?.path,
              name: value.name,
              slug: value.slug,
              fend_component: value.fend_component,
              element: components(value, childPermission)?.[generateSlugs(n)]?.[generateSlugs(ns)]?.[key] || '',
            });
        });
      });
    Object.entries(permission).map(([key, value]) => {
      includes.includes(key) &&
        value?.access &&
        route.push({
          path: value?.path,
          name: value.name,
          slug: value.slug,
          fend_component: value.fend_component,
          element: components(value)?.[generateSlugs(n)]?.[key] || '',
        });
    });
  });
  // route.forEach((rou) => rou.name === 'price history' && console.log(rou, ''));
  return route;
}

export const toastConfig: (position?: ToastPosition) => ExternalToast | undefined = (position = 'bottom-right') => ({
  position,
  duration: 4000,
});

export function notify({ error, message = 'Something went wrong!', success }: { error?: string | unknown; message: string; success: boolean } | any) {
  const errorObj: any = error || message;
  switch (success) {
    case true:
      if (Array.isArray(message)) {
        message?.reverse().forEach((msg) => {
          toast.success(msg, toastConfig('top-right'));
        });
        break;
      } else {
        toast.success(message, toastConfig('top-right'));
        break;
      }

    case false:
      if (typeof errorObj === 'object') {
        for (const key in errorObj) {
          const errormessage: string = errorObj[key].message || '';
          toast.error(errormessage, toastConfig('bottom-right'));
        }
      } else if (typeof errorObj === 'string') {
        toast.error(errorObj, toastConfig('bottom-right'));
      } else {
        toast.error(errorObj, toastConfig('bottom-right'));
      }
      break;
    default:
      toast.error(message || 'Something went wrong', toastConfig('bottom-right'));
      break;
  }
}

export async function downloadFileExcel(response: any, name?: string) {
  const responseName = name || String(response?.name).split('=')?.[1]?.split('.')?.[0] || '';
  const blob = new Blob([response.bufferResponse], { type: response.type });
  const url = window.URL.createObjectURL(blob);
  const a = document.createElement('a');
  a.href = url;
  a.download = capitalizeFirstLetter(String(responseName).replace('/', ''));
  a.click();
}

export function capitalizeFirstLetter(string: string = '') {
  const splitedString = String(string)
    .split('_')
    .map((stg) => stg.charAt(0).toUpperCase() + stg.slice(1))
    .join(' ');
  return splitedString;
}

export function errorSet({ error, setError }: { error: any; setError: UseFormSetError<never> }) {
  if (
    error.message === 'Validation Error'
    // || typeof error.error === 'object'
  ) {
    const errorCom = error.error;
    if (errorCom)
      Object.keys(errorCom).forEach((field, index) => {
        const fieldName = field;
        // .split('.')?.[0];
        setError(
          fieldName as never,
          {
            type: 'manual',
            message: errorCom[field].message,
          },
          { shouldFocus: !index }
        );
      });
    else notify(error);
  } else notify(error);
}

export function decrypt(encryptedText?: string): string {
  const key = import.meta.env.VITE_SECRET_KEY;
  if (encryptedText) {
    const bytes = CryptoJS.AES.decrypt(encryptedText, key);
    return bytes.toString(CryptoJS.enc.Utf8);
  }
  return '';
}
export function encrypt(decryptedText?: string): string {
  const key = import.meta.env.VITE_SECRET_KEY;
  if (decryptedText) {
    const value = CryptoJS.AES.encrypt(JSON.stringify(decryptedText), key).toString();
    return value;
  }
  return '';
}

export function replaceString(value: string = '', splitStrng: string = '_', replace: string = '-') {
  return String(value).split(splitStrng).join(replace);
}

export function generateSlugs(slug: string = '') {
  const skipSpecialCharacters = ['@', '#', '/', '!', '%', '^', '&', '*', '(', ')', '=', '+'];
  let returnString = String(slug).split(' ').join('-').split('_').join('-');
  skipSpecialCharacters.forEach((spl) => {
    returnString = String(returnString).split(spl).join('');
  });

  return returnString;
}

export function handleNumberInput(event: ChangeEvent<HTMLInputElement>) {
  const inputValue = event.target.value;
  event.target.value = inputValue.replace(/[^0-9.]|(\.(?=.*\.))/g, '');
}

export function tabProps(index: string | number) {
  return {
    id: `product-detail-${index}`,
    'aria-controls': `product-detail-panel-${index}`,
  };
}

export const printFile = (response: any) => {
  const blob = new Blob([response.bufferResponse], { type: response.type });
  const url = URL.createObjectURL(blob);
  const printWindow: any = window.open(url);
  printWindow.onload = () => {
    printWindow.print();
  };
};
export function tokenIsValid() {
  const token = getLocalStorage(SESSIONANDLOCAL.PROJECT_ACCESS_TOKEN);
  const decodedToken = token && jwtDecode(token);
  const exp = decodedToken && decodedToken?.exp;
  return token && !(exp && Date.now() >= exp * 1000);
}

//Autocomplete filteroptio
export const filterOptions = createFilterOptions({
  matchFrom: 'any',
  stringify: (option) => {
    const { label, code, name, value } = option as OptionsType;
    const optionValue = label || code || name || value;
    return optionValue as string;
  },
  trim: true,
});

// export const findByFendComponet = (fendName: FrontEndName): ModuleType | null => {
//   // eslint-disable-next-line react-hooks/rules-of-hooks
//   const Module = useMyProfieStore()?.user?.role_id?.access_manage;
//   const handleLoopFunction = (module?: ModuleType[]): ModuleType | null => {
//     if (module)
//       for (const modules of module) {
//         if (modules.fend_component === fendName) {
//           return modules;
//         }
//         if (modules.child) {
//           const found = handleLoopFunction(modules.child);
//           if (found) return found;
//         }
//       }
//     return null;
//   };
//   return handleLoopFunction(Module);
// };

export const checkDate = (dates?: Dayjs | string) => {
  const date = dayjs(dates);
  if (dayjs(dates).isValid() && dates) {
    return date;
  } else {
    return '';
  }
};
export const hexToRgba = (hex: string, opacity: number) => {
  let r = 0,
    g = 0,
    b = 0;
  if (hex.length === 4) {
    r = parseInt(hex[1] + hex[1], 16);
    g = parseInt(hex[2] + hex[2], 16);
    b = parseInt(hex[3] + hex[3], 16);
  } else if (hex.length === 7) {
    r = parseInt(hex[1] + hex[2], 16);
    g = parseInt(hex[3] + hex[4], 16);
    b = parseInt(hex[5] + hex[6], 16);
  }
  return `rgba(${r}, ${g}, ${b}, ${opacity})`;
};
export function remToPx(value: number) {
  return `${Math.round(value * 16)}px`;
}

export function pxToRem(value: number) {
  return `${value / 16}rem`;
}
type ChangingColor = {
  changeName: 'Pending';
  type: number;
};
// Handles indicator colors
export const handleColor = (content?: string, changeName?: ChangingColor[]): ChipOwnProps['color'] => {
  const handleContent = () => {
    const customContent = changeName?.find((value) => value?.changeName === content);
    if (customContent) return customContent.changeName + customContent.type;
    else return false;
  };
  switch (handleContent() || content) {
    // Success
    case 'Available':
    case 'In Stock':
    case 'Active':
    case 'Fulfilled':
      return 'success';
    // Error
    case 'Out Of Stock':
    case 'Out of Stock':
    case 'Inactive':
    case 'Pending1':
    case 'Low Stock':
    case 'Not Qualified':
    case 'Opened':
    case 'Denied':
      return 'error';
    // Warning
    case 'Reaching Limit':
    case 'Waiting for Approval':
      return 'warning';
    // Primary color
    case 'Pending':
    case 'Primary':
    case 'Save as Draft':
    case 'Meeting Arranged':
      return 'primary';
    // Info Color
    case 'Lead Discovered':
    case 'Draft':
      return 'info';
    default:
      return 'success';
  }
};

export const setValueConfig: SetValueConfig = {
  shouldValidate: true,
};

export const handleDisablePastDays = (date: Dayjs | string) => {
  const today = dayjs();
  // const sevenDaysAfter = today.add(0, 'day');
  // Disable all from dates  from today.
  return (date as Dayjs).isBefore(today);
};
