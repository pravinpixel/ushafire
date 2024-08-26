import { Dayjs } from 'dayjs';

import { OptionsType } from '../GlobalTypes';
import { PaginationGetInterFace } from '../TableTypes';

type LeadFormType = {
  _id?: string;
  leadNumber?: string;
  leadDate?: Dayjs | string;
  customerId?: OptionsType | null;
  salePersonId?: OptionsType | null;
  existingCustomer?: OptionsType;
  referralSource?: OptionsType;
  leadType?: OptionsType | null;
  notes?: string;
  leadQualification?: 'Save as Draft' | 'Qualified' | 'Not Qualified';
  status?: 'Save as Draft' | 'Qualified' | 'Not Qualified' | 'Moved To Opportunity';
  leadItems?: LeadItem[];
  draft?: boolean;
  referralName?: string;
};

type LeadItem = {
  _id?: string;
  productId: OptionsType | null;
  categoryId: OptionsType | null;
  subCategoryId: OptionsType | null;
  brandId: OptionsType | null;
  sku: string;
  quantity: number;
};
interface LeadListResponse extends PaginationGetInterFace {
  list: LeadFormType[];
}
