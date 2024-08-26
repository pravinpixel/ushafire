import { ComponentProps } from 'helper/types/GlobalTypes';
import { BarcodeTypeForm } from 'helper/types/inventory-management/BarcodeType';

import BarcodeForm from '../_utils/BarcodeForm';

const BarcodeCreate: React.FC<ComponentProps> = ({ permission, parentPermission }) => {
  const defaultValue: BarcodeTypeForm = {
    productName: '',
    product: '',
    barcodeImage: '',
    category: '',
    subcategory: '',
    productCode: '',
    sku: '',
    value: '',
    quantity: '',
    barcode: '',
  };

  return (
    <BarcodeForm navigateLink={parentPermission?.path ?? '/'} permission={permission} defaultValue={defaultValue} title={'Create New Barcode'} />
  );
};

export default BarcodeCreate;
