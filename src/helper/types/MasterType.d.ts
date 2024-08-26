import { Dayjs } from 'dayjs';

import { GridRowSelectionModel } from '@mui/x-data-grid';

import { PaginationGetInterFace } from './TableTypes';
import { OptionsType, EssentialType } from './GlobalTypes';

export type MasterForm = {
  code?: string;
  name?: string;
  address?: string;
  status?: boolean;
  _id?: string;
  url?: string;
  slab?: string;
  location_id?: OptionsType;
  rack_id?: OptionsType;
  bay_id?: OptionsType;
  rackId?: OptionsType;
  shelfId?: OptionsType;
  categoryId?: OptionsType;
  symbol?: string;
  vertical_id?: OptionsType;
  date?: Dayjs;
  quantity?: number;
  description?: string;
  country_id?: OptionsType;
  product_id?: string;
  state_id?: OptionsType;
  brand_logo?: string | object;
  ids?: GridRowSelectionModel;
};

export type InputsType = {
  [x: string]: boolean | GridSize | undefined;
  xs?: boolean | GridSize;
  name: keyof MasterForm;
  label?: string;
  defaultValue?: string;
  type?: string;
  sm?: number;
  readOnly?: boolean;
  disabled?: boolean;
  loading?: boolean;
  md?: number;
  options?: OptionsType[];
  addName?: EssentialType | string | undefined;
};
export interface MasterListResponse extends PaginationGetInterFace {
  list: MasterForm[];
}
