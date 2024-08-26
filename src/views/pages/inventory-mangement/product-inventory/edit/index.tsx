import { useParams } from 'react-router-dom';

import { ComponentProps } from 'helper/types/GlobalTypes';

import { useProductView } from 'store/hooks/InventoryManagementHook';

import PageLoader from 'views/components/loader/PageLoader';

import ProductForm from '../_utils/ProductForm';

const ProductEdit: React.FC<ComponentProps> = ({ permission, parentPermission }) => {
  const { id } = useParams();
  const { data, isFetching } = useProductView(id);
  const defaultValue = {
    ...data,
    productUrls:
      data?.productUrls && data?.productUrls?.length > 0
        ? data?.productUrls
        : [
            {
              title: '',
              url: '',
            },
          ],
  };

  return isFetching ? (
    <PageLoader />
  ) : (
    <ProductForm
      navigateLink={parentPermission?.path ?? '/'}
      defaultValue={defaultValue as never}
      permission={permission}
      title={'Edit ' + parentPermission?.name}
    />
  );
};

export default ProductEdit;
