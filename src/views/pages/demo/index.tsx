import * as React from 'react';
import { useForm, FieldValues, UseFormReturn } from 'react-hook-form';

import AddIcon from '@mui/icons-material/Add';
import RemoveIcon from '@mui/icons-material/Remove';
import { Box, Grid, Paper, Button, styled, Drawer, Toolbar, TextField, Typography } from '@mui/material';
import { NumberInputProps, Unstable_NumberInput as BaseNumberInput } from '@mui/base/Unstable_NumberInput';

import { pxToRem } from 'helper/GlobalHelper';
import { useModuleFinder } from 'helper/CustomHooks';

import useMyProfieStore from 'zustand-config/MyProfileZustand';

import InputField from 'views/components/form-components/InputField';
import { NAV, HEADER, SPACING } from 'views/layouts/utils/config-layout';
import DimensionField from 'views/components/form-components/DimenssionField';
import NumberInputField from 'views/components/form-components/NumberInputField';
import UploadDocumentField from 'views/components/form-components/UploadDocumentField';

const NumberInput = React.forwardRef(function CustomNumberInput(props: NumberInputProps, ref: React.ForwardedRef<HTMLDivElement>) {
  return (
    <BaseNumberInput
      slots={{
        root: StyledInputRoot,
        input: StyledInput,
        incrementButton: StyledButton,
        decrementButton: StyledButton,
      }}
      slotProps={{
        incrementButton: {
          children: <AddIcon fontSize="small" />,
          className: 'increment',
        },
        decrementButton: {
          children: <RemoveIcon fontSize="small" />,
        },
      }}
      {...props}
      ref={ref}
    />
  );
});

const DemoDevelopmentFields = () => {
  const [open, setOpen] = React.useState(false);
  const form: UseFormReturn<FieldValues, { search: string }, FieldValues> = useForm();
  const { user } = useMyProfieStore();
  const finder = useModuleFinder();
  const handleFindPermission = () => {
    const find = finder.find('designation');
    // eslint-disable-next-line no-console
    console.log(find, 'user_id ', user?.role_id?.access_manage);
  };

  return (
    <Paper
      sx={{
        m: 3,
        p: 2,
        minHeight: '80%',
        minWidth: '80%',
      }}
    >
      <Typography variant="h4" textAlign={'center'}>
        Devlopment Field
      </Typography>
      <Grid container>
        <Grid item md={6}>
          <InputField label="Product Image" name="permission" control={form.control} />
        </Grid>
        <Grid item md={6}>
          <UploadDocumentField name="imageFiled" control={form.control} />
        </Grid>
        <Grid item md={6}>
          <NumberInput aria-label="Quantity Input" min={1} max={99} />
        </Grid>
        <Grid item md={2}>
          <DimensionField name="dimension" control={form.control} label="Product Image" dimension={['L', 'B', 'H']} />
        </Grid>
        <Grid item md={2}>
          <NumberInputField name="price" control={form.control} label="Price" />
        </Grid>
        <Grid item md={6}>
          <Button onClick={() => handleFindPermission()}>find</Button>
        </Grid>
        <Grid item md={6}>
          <Button onClick={() => setOpen(!open)}>Drawer</Button>
        </Grid>
        <Drawer
          anchor="right"
          open={open}
          onClose={() => setOpen(false)}
          hideBackdrop
          sx={{
            width: '50%',
            flexShrink: 0,
            [`& .MuiDrawer-paper`]: {
              boxSizing: 'border-box',
              marginRight: '25px',
              px: NAV.PX,
              pt: pxToRem(HEADER.H_DESKTOP + SPACING),
              width: `calc(100% - ${pxToRem(NAV.WIDTH)})`,
              mb: NAV.MB,
            },
          }}
        >
          <Toolbar />
          <Box sx={{ overflow: 'auto' }}>hai</Box>
        </Drawer>
      </Grid>
    </Paper>
  );
};

export default DemoDevelopmentFields;
const blue = {
  100: '#daecff',
  200: '#b6daff',
  300: '#66b2ff',
  400: '#3399ff',
  500: '#007fff',
  600: '#0072e5',
  700: '#0059B2',
  800: '#004c99',
};

const grey = {
  50: '#F3F6F9',
  100: '#E5EAF2',
  200: '#DAE2ED',
  300: '#C7D0DD',
  400: '#B0B8C4',
  500: '#9DA8B7',
  600: '#6B7A90',
  700: '#434D5B',
  800: '#303740',
  900: '#1C2025',
};

const StyledInputRoot = styled('div')(
  ({ theme }) => `
  font-family: 'IBM Plex Sans', sans-serif;
  font-weight: 400;
  color: ${theme.palette.mode === 'dark' ? grey[300] : grey[500]};
  display: flex;
  flex-flow: row nowrap;
  justify-content: center;
  align-items: center;
`
);

const StyledInput = styled(TextField)();
//   ({ theme }) => `
//   font-size: 0.875rem;
//   font-family: inherit;
//   font-weight: 400;
//   line-height: 1.375;
//   color: ${theme.palette.mode === 'dark' ? grey[300] : grey[900]};
//   background: ${theme.palette.mode === 'dark' ? grey[900] : '#fff'};
//   border: 1px solid ${theme.palette.mode === 'dark' ? grey[700] : grey[200]};
//   box-shadow: 0px 2px 4px ${theme.palette.mode === 'dark' ? 'rgba(0,0,0, 0.5)' : 'rgba(0,0,0, 0.05)'};
//   border-radius: 8px;
//   margin: 0 8px;
//   padding: 10px 12px;
//   outline: 0;
//   min-width: 0;
//   width: 4rem;
//   text-align: center;

//   &:hover {
//     border-color: ${blue[400]};
//   }

//   &:focus {
//     border-color: ${blue[400]};
//     box-shadow: 0 0 0 3px ${theme.palette.mode === 'dark' ? blue[700] : blue[200]};
//   }

//   &:focus-visible {
//     outline: 0;
//   }
// `

const StyledButton = styled('button')(
  ({ theme }) => `
  font-family: 'IBM Plex Sans', sans-serif;
  font-size: 0.875rem;
  box-sizing: border-box;
  line-height: 1.5;
  border: 1px solid;
  border-radius: 999px;
  border-color: ${theme.palette.mode === 'dark' ? grey[800] : grey[200]};
  background: ${theme.palette.mode === 'dark' ? grey[900] : grey[50]};
  color: ${theme.palette.mode === 'dark' ? grey[200] : grey[900]};
  width: 32px;
  height: 32px;
  display: flex;
  flex-flow: row nowrap;
  justify-content: center;
  align-items: center;
  transition-property: all;
  transition-timing-function: cubic-bezier(0.4, 0, 0.2, 1);
  transition-duration: 120ms;

  &:hover {
    cursor: pointer;
    background: ${theme.palette.mode === 'dark' ? blue[700] : blue[500]};
    border-color: ${theme.palette.mode === 'dark' ? blue[500] : blue[400]};
    color: ${grey[50]};
  }

  &:focus-visible {
    outline: 0;
  }

  &.increment {
    order: 1;
  }
`
);
