import { ComponentProps } from 'helper/types/GlobalTypes';
import { UserFormType } from 'helper/types/AdminSettingTypes';

import { useGenerateIdApi } from 'store/hooks/EssentialHooks';

import PageLoader from 'views/components/loader/PageLoader';

import UserForm from '../_utils/UserForm';

const UserAdd: React.FC<ComponentProps> = ({ parentPermission }) => {
  const { data: generateID, isFetching } = useGenerateIdApi({
    vision: 'User',
  });
  const defaultValues: UserFormType = {
    code: generateID?.code || '',
    name: '',
    email: '',
    password: '',
    designation_id: null,
    department_id: null,
    sales_target: null,
    role_id: null,
    confirm_password: '',
    status: true,
    is_customer_specific: false,
    is_brand_specific: false,
    is_product_category_specific: false,
    is_business_vertical_specific: false,
  };

  return isFetching ? (
    <PageLoader />
  ) : (
    <UserForm defaultValues={defaultValues} title={'Create New ' + parentPermission?.name} navigateTo={parentPermission?.path ?? '/'} />
  );
};
export default UserAdd;
