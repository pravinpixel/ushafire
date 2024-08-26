import { AxiosResponse } from 'axios';
import { useRef, useCallback } from 'react';
import { UseMutateFunction } from '@tanstack/react-query';

import LoadingButton from '@mui/lab/LoadingButton';

import { ExportIcon } from 'theme/svg';

import { notify } from 'helper/GlobalHelper';

type Props = {
  url: string;
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  importApi: UseMutateFunction<AxiosResponse<unknown, unknown>, Error, any, unknown>;
  loading?: boolean;
};

export default function ImportButton({ url, importApi, loading = false }: Props) {
  const fileInputRef = useRef<HTMLInputElement>(null);
  const handleImport = useCallback(() => {
    fileInputRef?.current?.files &&
      importApi(
        {
          url: url + '/import/excel',

          formData: { import_excel: fileInputRef?.current?.files?.[0], url },
        },
        { onSuccess: (res) => notify(res), onError: (error) => notify(error) }
      );
  }, [importApi, url]);
  return (
    <LoadingButton
      variant="export"
      onClick={() => {
        fileInputRef?.current?.click();
      }}
      loading={loading}
      startIcon={
        <ExportIcon
          sx={{
            rotate: '180deg',
          }}
          color="disabled"
        />
      }
      sx={{
        minWidth: '10%',
      }}
    >
      Import
      <input type="file" key={Math.random()} accept=".xlsx" ref={fileInputRef} hidden onChange={handleImport} />
    </LoadingButton>
  );
}
