import { useParams } from 'react-router-dom';

import { useChildModuleView } from 'store/hooks/ModuleHooks';

import PageLoader from 'views/components/loader/PageLoader';

import ChildModuleForm from '../../_utils/ModuleForm';

export default function ChildModuleEdit() {
  const { id = '' } = useParams();
  const { data, isFetching } = useChildModuleView(id);
  return isFetching ? <PageLoader /> : <ChildModuleForm defaultValues={data} title="Edit Child Module" type="child" />;
}
