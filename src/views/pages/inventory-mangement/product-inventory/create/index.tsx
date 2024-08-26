import { ComponentProps } from 'helper/types/GlobalTypes';
import { ProductFormType } from 'helper/types/inventory-management/ProductInventoryType';

import ProductForm from '../_utils/ProductForm';

const ProductCreate: React.FC<ComponentProps> = ({ permission, parentPermission }) => {
  const defaultValue: ProductFormType = {
    productName: '',
    productCode: '',
    productImages: [],
    SKU: '',
    description: '',
    productType: null,
    type: null,
    UOM: null,
    newItemNumber: '',
    oldItemNumber: '',
    alternativeItemNumber: '',
    DuplicateItemCode: '',
    itemCategoryCode: null,
    productGroupCode: null,
    inventoryValueZero: false,
    Blocked: false,
    SkipApproval: false,
    dontShowCommissionReport: false,
    shelfNumber: null,
    QuantityOnSalesOrder: '',
    inventory: '',
    stockoutWarning: { label: 'Yes', value: 'Yes' },
    unitVolume: '',
    supplier: null,
    productCategory: null,
    manufacturer: '',
    productStatus: { label: 'Active', value: 'Active' },
    salesUOM: null,
    fixedCommissionPercentage: null,
    productSubCategory: null,
    brand: null,
    relatedProducts: [],
    productUrls: [
      {
        title: '',
        url: '',
      },
    ],
  };

  return (
    <ProductForm navigateLink={parentPermission?.path ?? '/'} permission={permission} defaultValue={defaultValue} title={'Create New Product'} />
  );
};

export default ProductCreate;
