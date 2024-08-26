import { useFormContext } from 'react-hook-form';

import { Grid, Typography } from '@mui/material';

import * as Helper from 'helper/GlobalHelper';
import { LeadFormType } from 'helper/types/sales-crm-system/LeadManagementTypes';

import RadioGroupField from 'views/components/form-components/RadioGroupField';

import CrmProductGroup from '../../_utils/CrmProductGroup';

// -----------------------------------------------------------------------------------------------

// ------------------------------------------------------------------------------------------------

const LeadQualifiction = () => {
  const { control } = useFormContext<LeadFormType>();

  return (
    <>
      <Grid item xs={12}>
        <Typography variant="h6">Lead Qualification</Typography>
      </Grid>
      <Grid item xs={12}>
        <RadioGroupField control={control as never} name="leadQualification" options={Helper.LeadQualificationOptions} />
      </Grid>
      <CrmProductGroup fieldName={'leadItems'} />
    </>
  );
};

export default LeadQualifiction;
