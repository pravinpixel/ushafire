import React from 'react';
import { useFormContext } from 'react-hook-form';

import { IconButton, InputLabel } from '@mui/material';

import { PlusIcon } from 'theme/svg';

import { OptionsType, DynamicFormComponentType } from 'helper/types/GlobalTypes';

import CustomDrawerWithDynamic from './CustomDrawerWithDynamic';

type Props = {
  required?: boolean;
  label?: string;
  modelName: DynamicFormComponentType['name'];
  setName: string;
  onSuccess?: (res?: OptionsType) => void;
};

const CustomInputLabal = ({ required, label, modelName, setName, onSuccess }: Props) => {
  const [open, setOpen] = React.useState(false);
  const { setValue } = useFormContext();
  const handleResponse = ({ essential }: { essential?: OptionsType }) => {
    essential && setValue(setName, essential);
    onSuccess && onSuccess(essential);
    setOpen(false);
  };
  return (
    <InputLabel
      sx={{
        marginBottom: 0,
      }}
      required={required}
    >
      {label}
      <IconButton size="small" onClick={() => setOpen(true)}>
        <PlusIcon fontSize="small" />
      </IconButton>
      <CustomDrawerWithDynamic
        key={`custom-drawer-${label}`}
        modelName={modelName}
        open={open}
        onClose={(res) => handleResponse({ essential: res })}
      />
    </InputLabel>
  );
};

export default CustomInputLabal;
