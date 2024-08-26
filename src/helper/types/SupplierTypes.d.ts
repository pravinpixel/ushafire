import { PaginationGetInterFace } from './TableTypes';

type SupplierTypeForm = {
  code?: string;
  name?: string;
  contact_person?: string;
  address?: string;
  contact_number?: string;
  email?: string;
  status?: boolean;
  brand_id?: OptionsType | null;
  _id?: string;
  payment_terms_id?: OptionsType | null;
  products_deals_with?: string;
  website?: string;
};
interface SupplierListResponse extends PaginationGetInterFace {
  list: SupplierTypeForm[];
}
