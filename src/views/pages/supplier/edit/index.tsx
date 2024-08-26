import { useParams } from 'react-router-dom';

import { useSupplierView } from 'store/hooks/SupplierHooks';

import PageLoader from 'views/components/loader/PageLoader';

import SupplierForm from '../_utils/SupplierForm';

export default function SupplierEdit() {
  const { id } = useParams();
  const { data, isFetching } = useSupplierView(id);

  return isFetching ? <PageLoader /> : <SupplierForm defaultValues={{ ...data }} title="Edit Supplier" />;
}
