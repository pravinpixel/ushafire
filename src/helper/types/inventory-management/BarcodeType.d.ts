import { PaginationGetInterFace } from '../TableTypes';

type BarcodeTypeForm = {
  _id?: string;
  value: string;
  categoryId?: OptionsType | null;
  subcategoryId?: OptionsType | null;
  productId?: OptionsType | null;
  barcodeImage: string | undefined;
  product: OptionsType;
  productName?: string;
  category: OptionsType;
  subcategory: OptionsType;
  productCode?: string;
  sku?: string;
  quantity: string;
  barcode: string;
  productName?: string;
};
interface BarcodeListResponse extends PaginationGetInterFace {
  list: BarcodeTypeForm[];
}
