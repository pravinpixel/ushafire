import { SupplierTypeForm } from 'helper/types/SupplierTypes';

import { useGenerateIdApi } from 'store/hooks/EssentialHooks';

import PageLoader from 'views/components/loader/PageLoader';

import SupplierForm from '../_utils/SupplierForm';

const SupplierAdd = () => {
  const { data: generateID, isFetching } = useGenerateIdApi({
    vision: 'Supplier',
  });

  const defaultValues: SupplierTypeForm = {
    code: generateID?.code || '',
    name: '',
    contact_person: '',
    address: '',
    contact_number: '',
    status: true,
    email: '',
    brand_id: null,
    _id: '',
    payment_terms_id: null,
    products_deals_with: '',
    website: '',
  };

  return isFetching ? <PageLoader /> : <SupplierForm title="Create New Supplier" defaultValues={defaultValues} />;
};

export default SupplierAdd;
