import { useState } from 'react';

import { ComponentProps } from 'helper/types/GlobalTypes';
import { PaginationInterFace } from 'helper/types/TableTypes';
import { InitialPagniationParams } from 'helper/GlobalHelper';

import { useConfigurationListApi } from 'store/hooks/SettingHooks';

import ConfigurationTable from '../utils/ConfigurationTable';

const ConfigurationList: React.FC<ComponentProps> = ({ permission }) => {
  const [params, setParams] = useState<PaginationInterFace>(InitialPagniationParams);
  const { data, isLoading } = useConfigurationListApi({
    params,
  });

  return (
    <ConfigurationTable
      data={data?.data || []}
      params={params}
      setParams={setParams}
      isLoading={isLoading}
      redirectLink={permission?.add?.path || ''}
      url={'/role'}
      permission={permission}
    />
  );
};
export default ConfigurationList;
