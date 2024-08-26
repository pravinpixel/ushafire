import { UseFormWatch } from 'react-hook-form';

import { OptionsType } from './GlobalTypes';
import { ModuleType } from '../GlobalHelper';
import { PaginationGetInterFace } from './TableTypes';

type UserFormType = {
  code: string;
  name: string;
  email: string;
  password: string;
  designation_id: OptionsType | null;
  department_id: OptionsType | null;
  sales_target: OptionsType | null;
  role_id: OptionsType | null;
  confirm_password: string;
  status: boolean;
  is_customer_specific: boolean;
  is_brand_specific: boolean;
  is_product_category_specific: boolean;
  is_business_vertical_specific: boolean;
  _id?: string;
};
interface UserListResponse extends PaginationGetInterFace {
  list: UserFormType[];
}

type RoleFormType = {
  code: string;
  name: string;
  status: boolean;
  _id?: string;
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  access_manage: ModuleType[] | any;
};
interface RoleListResponse extends PaginationGetInterFace {
  list: RoleFormType[];
}

interface PermissionFormType {
  name?: string;
  label?: string;
  path?: string;
  show: boolean;
  access: boolean;
  _id?: string;
  view?: PermissionFormType;
  add?: PermissionFormType;
  edit?: PermissionFormType;
  list?: PermissionFormType;
  export?: PermissionFormType;
  delete?: PermissionFormType;
}
interface PermissionListResponse extends PaginationGetInterFace {
  list: PermissionFormType[];
}

interface ConfigurationFormType {
  _id?: string;
  status?: boolean;
  text?: string;
  type_id?: string;
  image_storage?: string;
}
interface ConfigurationListResponse extends PaginationGetInterFace {
  list: ConfigurationFormType[];
}

interface ParentModuleFormType {
  name?: string;
  slug?: string;
  path?: string;
  show?: boolean;
  access?: boolean;
  _id?: string;
  view?: ParentModuleFormType;
  add?: ParentModuleFormType;
  edit?: ParentModuleFormType;
  list?: ParentModuleFormType;
  export?: ParentModuleFormType;
  delete?: ParentModuleFormType;
  import?: ParentModuleFormType;
  parent_id?: OptionsType;
}
interface ParentModuleListResponse extends PaginationGetInterFace {
  list: ParentModuleFormType[];
}

interface ChildModuleFormType {
  name?: string;
  slug?: string;
  path?: string;
  show?: boolean;
  access?: boolean;
  all?: boolean;
  addMore_deleted_ids?: string[];
  configuration?: boolean;
  _id?: string;
  parent_id?: OptionsType;
  view?: ChildModuleFormType;
  add?: ChildModuleFormType;
  edit?: ChildModuleFormType;
  list?: ChildModuleFormType;
  export?: ChildModuleFormType;
  delete?: ChildModuleFormType;
  import?: ChildModuleFormType;
  addMore?: {
    name: string;
    withId: boolean;
  }[];
}
interface ChildModuleListResponse extends PaginationGetInterFace {
  list: ChildModuleFormType[];
}

type RoleContextType = {
  setValue: UseFormSetValue<RoleFormType>;
  watch?: UseFormWatch<RoleFormType>;
};

export {
  UserFormType,
  RoleFormType,
  RoleContextType,
  UserListResponse,
  RoleListResponse,
  PermissionFormType,
  ChildModuleFormType,
  ParentModuleFormType,
  ConfigurationFormType,
  PermissionListResponse,
  ChildModuleListResponse,
  ParentModuleListResponse,
  ConfigurationListResponse,
};
