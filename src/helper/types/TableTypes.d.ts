type PurchaseOrderTypes = 'PO' | 'PO Request';

export interface PaginationInterFace {
  page: number;
  pageSize: number;
  search?: string;
  sort?: string;
  field?: string;
  productStatus?: string[];
  status?: 'Active' | 'All' | string | unknown;
  type?: PurchaseOrderTypes;
  [key: string]: unknown;
}
export interface PaginationGetInterFace {
  [key: string]: unknown;
  page: number;
  pageSize: number;
  search?: string;
  total: number;
  totalPages: number;
  filterCount?: number;
  status?: 'Active' | 'All';
}
type FilterInputsMenusTypes = {
  label: string;
  // name: string;
  menus?: (OptionsType | string)[];
  defaultValue?: OptionsType | null;
  multiple?: boolean;
  single?: boolean;
  essentialName: EssentialType;
};
