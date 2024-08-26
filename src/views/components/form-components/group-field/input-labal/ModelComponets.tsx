import { lazy } from 'react';
import { yupResolver } from '@hookform/resolvers/yup';
import { useForm, Resolver, FieldValues, FormProvider, SubmitHandler } from 'react-hook-form';

import LoadingButton from '@mui/lab/LoadingButton';
import { Grid, Paper, Stack, ClickAwayListener } from '@mui/material';

import { notify, errorSet } from 'helper/GlobalHelper';
import { ContactsTypeForm } from 'helper/types/sales-crm-system/ContactsTypes';
import { OptionsType, DynamicFormComponentType } from 'helper/types/GlobalTypes';
import { contactFormSchema, organizationFormSchema } from 'helper/ValidationSchema';

import { useCreateGenerateIdApi } from 'store/hooks/EssentialHooks';
import { useContactCreate, useOrganizationCreate } from 'store/hooks/SalesCrmSystemHook';

import ScrollBar from 'views/components/scroll-bar';
import Loadable from 'views/components/loader/Loadable';

const ContactDetailForm = Loadable(lazy(() => import('views/pages/sales-crm-system/contacts/_utils/ContactDetailForm')));
const OrganizationDetailForm = Loadable(lazy(() => import('views/pages/sales-crm-system/organization/_utils/OrganizationDetailForm')));

const modelComponets: DynamicFormComponentType[] = [
  {
    component: <OrganizationDetailForm />,
    name: 'OrganizationDetailForm',
    defaultValue: {
      address: '',
      businessType: null,
      contact: '',
      email: '',
      fax: '',
      website: '',
      organizationName: '',
      paymentTermsId: null,
      verticalTypeId: null,
    },
    // ifCodeGenrate: {
    //   keyName: 'organizationName',
    //   vision: 'Supplier',
    // },
    validation: organizationFormSchema,
  },
  {
    component: <ContactDetailForm />,
    name: 'ContactDetailForm',
    defaultValue: {
      contactType: null,
      createdOn: '',
      password: '',
    },
    // ifCodeGenrate: {
    //   keyName: 'organizationName',
    //   vision: 'Supplier',
    // },
    validation: contactFormSchema,
  },
];
const Finder = (modelName: DynamicFormComponentType['name']) => modelComponets.find((value) => value.name === modelName);

export const ModelLayout = ({
  onClose,
  defaultValue = {},
  modelName,
}: {
  modelName: DynamicFormComponentType['name'];
  onClose: (res?: OptionsType) => void;
  defaultValue?: object;
}) => {
  const Model = Finder(modelName);

  const { mutateAsync: OrganizationCreate } = useOrganizationCreate();
  const { mutateAsync: ContactCreate } = useContactCreate();
  const { mutateAsync: GenerateId } = useCreateGenerateIdApi();
  const handleDefaultValue = async () => {
    if (Model?.ifCodeGenrate?.vision) {
      const response = await GenerateId({ vision: Model?.ifCodeGenrate.vision });
      return { ...(Model?.defaultValue ? Model?.defaultValue : {}), ...defaultValue, [Model?.ifCodeGenrate.keyName]: response.code };
    } else {
      return { ...(Model?.defaultValue ? Model?.defaultValue : {}), ...defaultValue };
    }
  };
  const form = useForm<FieldValues>({
    defaultValues: async () => await handleDefaultValue(),
    resolver: yupResolver(Model?.validation as never) as unknown as Resolver<FieldValues>,
  });

  const {
    handleSubmit,
    setError,
    formState: { isSubmitting },
  } = form;

  const handleFormSumbit: SubmitHandler<FieldValues> = async (data) => {
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    const onSuccess = (res: any) => {
      notify(res);
      onClose(res?.data as OptionsType);
    };
    try {
      switch (Model?.name) {
        case 'OrganizationDetailForm':
          await OrganizationCreate({ formData: data }, { onSuccess });
          break;
        case 'ContactDetailForm':
          await ContactCreate({ formData: data as unknown as ContactsTypeForm }, { onSuccess });
          break;
        default:
          notify({
            success: false,
            message: 'Mention The Case',
          });
          break;
      }
    } catch (error) {
      errorSet({ error, setError });
    }
  };

  return (
    <FormProvider {...form}>
      <ClickAwayListener onClickAway={() => onClose()}>
        <Paper
          component={'form'}
          variant="form"
          sx={{
            height: '100%',
          }}
        >
          <ScrollBar
            sx={{ width: '100%', overflowX: 'hidden', minHeight: '20rem', height: '100%', padding: '3rem 2rem 2.5rem 2rem' }}
            other={{
              autoHide: false,
            }}
          >
            <Stack direction={'column'} gap={5} height={'100%'}>
              <Grid container spacing={2}>
                {Model?.component}
              </Grid>
              <Grid container>
                <Grid item md={3}>
                  <LoadingButton type="button" loading={isSubmitting} variant="contained" onClick={handleSubmit(handleFormSumbit)}>
                    Save
                  </LoadingButton>
                </Grid>
              </Grid>
            </Stack>
          </ScrollBar>
        </Paper>
      </ClickAwayListener>
    </FormProvider>
  );
};
