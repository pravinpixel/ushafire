/**
 * This file is part of AutoPack.
 *
 * Its is form Field
 *
 */
import { useDebouncedCallback } from 'use-debounce';
import { useRef, useState, useEffect, MouseEvent } from 'react';
import { Control, FieldValues, UseFormWatch, useController, UseFormSetValue } from 'react-hook-form';

import { Stack } from '@mui/material';

import { useMasterList } from 'store/hooks/MasterHooks';

type ScannerComponentsProps = {
  label?: string;
  name?: string;
  control: Control<FieldValues>;
  setValue: UseFormSetValue<FieldValues>;
  watch: UseFormWatch<FieldValues>;
};

// interface

export default function ScannerComponents({ label = 'Barcode', control, setValue, watch, name }: ScannerComponentsProps) {
  //Using ref to auto focus to get scanner data
  const scanInputRef = useRef<HTMLInputElement>(null);
  const { field } = useController({
    name: name ?? 'search',
    control,
  });
  const sea = watch('search') || '';

  const [datas] = useState([]);

  const { isFetching, refetch } = useMasterList({
    params: {
      search: sea,
      page: 0,
      pageSize: 0,
    },
    url: '/bay',
  });

  const debounced = useDebouncedCallback((e) => {
    setValue('search', e);
  }, 500);

  const [focused, setFocused] = useState(false);

  function handleScanner(e: MouseEvent<HTMLElement>) {
    e.preventDefault();

    setFocused((state) => {
      state ? scanInputRef.current?.blur() : scanInputRef.current?.focus();
      return !state;
    });
  }

  useEffect(() => {
    if (sea) {
      refetch();
      // setValue('search', '');
    }
  }, [sea, setValue, refetch]);

  useEffect(() => {
    if (isFetching) {
      setValue('search', '');
      // setValue('search', '');
    }
  }, [isFetching, setValue]);

  return (
    <Stack direction={'column'} gap={15}>
      <button onClick={handleScanner}>
        {isFetching ? 'Loading' : focused ? 'Cancel' : 'Scan'} the {label}
      </button>
      {JSON.stringify(datas)}
      <input
        autoComplete="off"
        type="text"
        // hidden
        {...field}
        ref={scanInputRef}
        onChange={(e) => debounced(e.target.value)}
      />
    </Stack>
  );
}
