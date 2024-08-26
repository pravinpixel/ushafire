import { useMemo } from 'react';
import { useParams } from 'react-router-dom';

import { InputsType } from 'helper/types/MasterType';
import { ComponentProps } from 'helper/types/GlobalTypes';
import { masterFormTemplatechema } from 'helper/ValidationSchema';

import { useMasterView } from 'store/hooks/MasterHooks';

import PageLoader from 'views/components/loader/PageLoader';

import MasterForm from '../../_utils/MasterForm';

const EditPaymentTerms: React.FC<ComponentProps> = ({ parentPermission }) => {
  const { id } = useParams();
  const url = `/payment-terms/${id}`;
  const { data, isFetching } = useMasterView(url);
  const label = parentPermission?.name ?? '';

  const inputs: InputsType[] = useMemo(() => {
    return [
      {
        name: 'name',
        label: label + ' Name',
        type: 'text',
        md: 6,
        sm: 8,
        xs: 12,
      },
      {
        name: 'status',
        label: 'Status',
        type: 'checkbox',
        md: 6,
        sm: 4,
        xs: 12,
      },
      {
        name: 'description',
        label: 'Description',
        type: 'textarea',
        md: 12,
        sm: 12,
        xs: 12,
      },
    ];
  }, [label]);

  return isFetching ? (
    <PageLoader />
  ) : (
    <MasterForm
      title={'Edit ' + label}
      // navigateTo={parentPermission?.path ?? '/'}
      label={label}
      url={url}
      defaultValue={data}
      inputs={inputs}
      validations={masterFormTemplatechema}
      navigateLink={parentPermission?.path ?? '/'}
    />
  );
};

export default EditPaymentTerms;
