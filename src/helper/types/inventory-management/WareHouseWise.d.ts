import { OptionsType } from '../GlobalTypes';

type WarehouseWSItemType = {
  _id?: string;
  warehouseWSId?: OptionsType | null;
  productName?: string;
  productId: OptionsType | null;
  categoryId: OptionsType | null;
  subCategoryId: OptionsType | null;
  sku: string;
  bayId: OptionsType | null;
  rackId: OptionsType | null;
  shelvesId: OptionsType | null;
  binId: OptionsType | null;
  quantity: number;
};

type WareHouseWiseFormType = {
  _id?: string;
  warehouseId?: OptionsType | null;
  warehouseName?: string;
  warehouseAddress?: string;
  warehouseCode?: string;
  warehouseWSItems?: WarehouseWSItemType[];
  import_data?: WarehouseWSItemType[];
  // eslint-disable-next-line no-unused-vars
};
