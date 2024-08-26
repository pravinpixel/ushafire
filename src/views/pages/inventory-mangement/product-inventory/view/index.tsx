import { useParams } from 'react-router-dom';

import { ComponentProps } from 'helper/types/GlobalTypes';

import { useProductView } from 'store/hooks/InventoryManagementHook';

import PageLoader from 'views/components/loader/PageLoader';

import ProductViewDetails from '../_utils/ProductViewDetails';

const ProductView: React.FC<ComponentProps> = ({ parentPermission }) => {
  const { id } = useParams();
  const { data, isLoading } = useProductView(id);
  return isLoading ? <PageLoader /> : <ProductViewDetails data={data} permission={parentPermission} />;
};

export default ProductView;
