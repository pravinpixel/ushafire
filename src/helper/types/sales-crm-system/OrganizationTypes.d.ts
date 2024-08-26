import { OptionsType } from '../GlobalTypes';
import { PaginationGetInterFace } from '../TableTypes';

type OrganizationFormType = {
  _id?: string;
  organizationName?: string;
  verticalTypeId?: OptionsType | null;
  businessType?: OptionsType | null;
  paymentTermsId?: OptionsType | null;
  contact?: string;
  email?: string;
  website?: string;
  fax?: string;
  address?: string;
  draft?: boolean;
};

interface OrganizationListResponse extends PaginationGetInterFace {
  list: OrganizationFormType[];
}
