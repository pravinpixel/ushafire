import { PaginationGetInterFace } from '../TableTypes';

type WarehouseWiseTypeForm = {
  _id?: string;
  warehouseWSId?: OptionsType | null;
  location?: string;
  categoryId?: OptionsType | null;
  subCategoryId?: OptionsType | null;
  productName?: string;
  contact_person?: string;
  skuId?: OptionsType | null;
  quantity?: number;
  bayId?: OptionsType | null;
  rackId?: OptionsType | null;
  shelvesId?: OptionsType | null;
  binId?: OptionsType | null;
  locationId?: OptionsType | null;
  warehouseAddress?: OptionsType | null;
  warehouseLocation?: OptionsType | null;
  productId?: OptionsType | null;
};

interface WarehouseWiseListType extends WarehouseWiseTypeForm {
  warehouseId?: {
    address?: string;
    code?: string;
    location_id?: string;
    name?: string;
    _id?: string;
  };
}

interface WarehouseWiseListResponse extends PaginationGetInterFace {
  list: WarehouseWiseListType[];
}
