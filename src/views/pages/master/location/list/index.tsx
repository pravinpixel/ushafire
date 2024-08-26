import { useState } from 'react';

import { ComponentProps } from 'helper/types/GlobalTypes';
import { MasterListResponse } from 'helper/types/MasterType';
import { PaginationInterFace } from 'helper/types/TableTypes';
import { InitialPagniationParams } from 'helper/GlobalHelper';

import { useMasterList } from 'store/hooks/MasterHooks';

import MasterTable from '../../_utils/MasterTable';

const LocationList: React.FC<ComponentProps> = ({ permission }) => {
  const [params, setParams] = useState<PaginationInterFace>(InitialPagniationParams);
  const url = '/location';
  const { data, isLoading } = useMasterList({
    params,
    url: url,
  });
  return (
    <MasterTable
      data={data as unknown as MasterListResponse}
      params={params}
      url={url}
      setParams={setParams}
      isLoading={isLoading}
      buttonLabel="Location"
      fieldLabel="Location"
      permission={permission}
    />
  );
};

export default LocationList;
