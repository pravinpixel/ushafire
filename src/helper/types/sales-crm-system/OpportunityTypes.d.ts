import { Dayjs } from 'dayjs';

import { OptionsType } from '../GlobalTypes';
import { PaginationGetInterFace } from '../TableTypes';

type OpportunityFormType = {
  _id?: string;
  opportunityNumber?: string;
  leadNumber?: string;
  opportunityDate?: Dayjs | string;
  customerId?: OptionsType | null;
  leadId?: OptionsType | null;
  leadDate?: Dayjs | string;
  leadType?: OptionsType | null;
  salePersonId?: OptionsType | null;
  opportunityType?: OptionsType | null;
  status?: 'Save as Draft' | 'Pending' | 'Approved' | 'Moved To Quotation';
  opportunityItems?: OpportunityItem[];
  draft?: boolean;
  opportunityStage?: OptionsType | null;
};

type OpportunityItem = {
  _id?: string;
  opportunityId?: OptionsType | null;
  productId?: OptionsType | null;
  categoryId?: OptionsType | null;
  subCategoryId?: OptionsType | null;
  brandId?: OptionsType | null;
  quantity?: number;
  sku?: string;
  quantity?: number;
};
interface OpportunityListResponse extends PaginationGetInterFace {
  list: OpportunityFormType[];
}
