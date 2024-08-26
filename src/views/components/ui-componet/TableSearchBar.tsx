import React from 'react';
import { useForm } from 'react-hook-form';
import { useDebouncedCallback } from 'use-debounce';

import { Stack, InputAdornment, outlinedInputClasses } from '@mui/material';

import { CommentIcon } from 'theme/svg';

import { PaginationInterFace } from 'helper/types/TableTypes';

import InputField from '../form-components/InputField';

type SearchType = {
  search: string;
};

const TableSearchBar = ({
  params,
  setParams,
}: {
  params: PaginationInterFace;
  setParams: React.Dispatch<React.SetStateAction<PaginationInterFace>>;
}) => {
  const { control } = useForm<SearchType>({
    defaultValues: {
      search: '',
    },
  });

  const handleSearchChange = useDebouncedCallback((event: React.ChangeEvent<HTMLInputElement>) => {
    const { value } = event.target;
    setParams({
      ...params,
      page: 0,
      search: value,
    });
  }, 500);

  return (
    <Stack component={'form'} direction={'row'} width={{ sm: '100%', md: '100%', lg: '80%' }}>
      <InputField
        name="search"
        control={control}
        onChange={handleSearchChange}
        fieldProps={{
          size: 'medium',
          sx: {
            backgroundColor: (theme) => theme.palette.common.white,
            [`& .${outlinedInputClasses.input}`]: {
              height: '10px',
            },
          },
          InputProps: {
            startAdornment: (
              <InputAdornment position="start">
                <CommentIcon />
              </InputAdornment>
            ),
          },
          placeholder: 'Search By Keyword',
        }}
      />
    </Stack>
  );
};

export default TableSearchBar;
