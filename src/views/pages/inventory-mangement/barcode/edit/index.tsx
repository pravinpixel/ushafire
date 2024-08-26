/**
 * This file is part of AutoPack.
 *
 * It is a Barcode Edit
 *
 */
import { useParams } from 'react-router-dom';

import { ComponentProps } from 'helper/types/GlobalTypes';

import { useBarcodeView } from 'store/hooks/InventoryManagementHook';

import PageLoader from 'views/components/loader/PageLoader';

import BarcodeForm from '../_utils/BarcodeForm';

const BarcodeEdit: React.FC<ComponentProps> = ({ permission, parentPermission }) => {
  const { id } = useParams();
  const { data, isFetching } = useBarcodeView(id);
  return isFetching ? (
    <PageLoader />
  ) : (
    <BarcodeForm navigateLink={parentPermission?.path ?? '/'} permission={permission} defaultValue={data} title={'Create New Barcode'} />
  );
};

export default BarcodeEdit;
