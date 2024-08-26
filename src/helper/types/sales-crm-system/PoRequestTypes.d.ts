import { PaginationGetInterFace } from '../TableTypes';

type PoRequestFormType = {
  _id?: string;
};

type PoRequestItem = {
  _id?: string;
};

interface PoRequestListResponse extends PaginationGetInterFace {
  list: PoRequestFormType[];
}