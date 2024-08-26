import { Dayjs } from 'dayjs';

import { OptionsType } from '../GlobalTypes';

type DealsFormType = {
  _id?: string;
  name?: string;
  status?: boolean;
  opportunityStage: DealsopportunityStage[];
};

type DealsopportunityStageStatus = 'Approved';

type DealsopportunityStage = {
  opportunityNumber?: string;
  _id?: string;
  opportunityDate?: Dayjs | string;
  customerId?: OptionsType | null;
  leadId?: OptionsType | null;
  salePersonId?: OptionsType | null;
  opportunityType?: OptionsType | null;
  opportunityStage?: OptionsType | null;
  status?: DealsopportunityStageStatus;
  updatedAt?: Dayjs | string;
};

// type DealsListResponse = DealsFormType[] & {
//   total: number;
//   filterCount?: number;
// };
interface DealsListResponse extends PaginationGetInterFace {
  list: DealsFormType[];
  filterCount?: number;
  total?: number;
}
