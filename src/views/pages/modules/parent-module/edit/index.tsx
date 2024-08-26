import { useParams } from 'react-router-dom';

import { useParentModuleView } from 'store/hooks/ModuleHooks';

import PageLoader from 'views/components/loader/PageLoader';

import ModuleForm from '../../_utils/ModuleForm';

export default function ParentModuleEdit() {
  const { id = '' } = useParams();
  const { data, isFetching } = useParentModuleView(id);
  return isFetching ? <PageLoader /> : <ModuleForm defaultValues={data} title="Edit Parent Module" type="parent" />;
}
