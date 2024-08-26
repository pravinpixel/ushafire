import { useParams } from 'react-router-dom';

import { decrypt } from 'helper/GlobalHelper';
import { ComponentProps } from 'helper/types/GlobalTypes';

import { useUserView } from 'store/hooks/SettingHooks';

import PageLoader from 'views/components/loader/PageLoader';

import UserForm from '../_utils/UserForm';

export default function UserEdit({ parentPermission }: ComponentProps) {
  const { id = '' } = useParams();
  const { data, isFetching } = useUserView(id);

  return isFetching ? (
    <PageLoader />
  ) : (
    <UserForm
      defaultValues={{
        ...data,
        password: decrypt(data?.hash_password),
        confirm_password: decrypt(data?.hash_password),
      }}
      title={'Edit ' + parentPermission?.name}
      navigateTo={parentPermission?.path ?? '/'}
    />
  );
}
