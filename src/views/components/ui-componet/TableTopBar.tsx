import { useState, useCallback } from 'react';

import LoadingButton from '@mui/lab/LoadingButton';
import { GridRowSelectionModel } from '@mui/x-data-grid';
import { Grid, Stack, Button, Avatar, Collapse, Typography } from '@mui/material';

import { ExportIcon, FilterIcon } from 'theme/svg';

import { notify } from 'helper/GlobalHelper';
import { useRouter } from 'helper/CustomHooks';
import { PaginationInterFace, FilterInputsMenusTypes } from 'helper/types/TableTypes';

import { useMasterExport, useMasterImport } from 'store/hooks/MasterHooks';

import WholeTitle from './WholeTitle';
import TableSearchBar from './TableSearchBar';
import ImportButton from './buttons/ImportButton';
import TabelEssentialFilter from './TabelEssentialFilter';

// ------------------------------------------------------
type TableTopBarType = {
  buttonLabel: string;
  addPath?: string;
  params: PaginationInterFace;
  setParams: React.Dispatch<React.SetStateAction<PaginationInterFace>>;
  url?: string;
  mb?: number;
  ids?: GridRowSelectionModel;
  totalCount?: number;
  subtitle?: string;
  filterCount?: number;
  enabled?: {
    import?: boolean;
    export?: boolean;
    essentialFilter?: FilterInputsMenusTypes[];
    add?: boolean;
  };
};
const TableTopBar = ({
  buttonLabel,
  addPath,
  params,
  setParams,
  url = '',
  mb = 3,
  ids,
  totalCount = 0,
  subtitle,
  filterCount = 0,
  enabled = {
    export: false,
    import: false,
    essentialFilter: [],
    add: false,
  },
}: TableTopBarType) => {
  const router = useRouter();
  const [filter, setFilter] = useState(false);

  //Hooks
  const { mutate: masterExportApi, isPending } = useMasterExport();
  const { mutate: masterImportApi, isPending: importLoading } = useMasterImport();
  const handleExport = useCallback(() => {
    masterExportApi(
      {
        formData: {
          ids,
          url,
        },
        url: url + '/export/excel',
      },
      { onError: (error) => notify(error) }
    );
  }, [url, masterExportApi, ids]);

  return (
    <Stack direction={'column'} mb={mb} gap={2}>
      <Stack gap={2} direction={{ md: 'column', lg: 'row' }} justifyContent={{ md: 'normal', lg: 'space-between' }}>
        <Stack
          direction={{ md: 'column-reverse', lg: 'row' }}
          justifyContent={{ md: 'center', lg: 'start' }}
          gap={1}
          alignItems={{ md: 'center', lg: 'baseline' }}
        >
          <WholeTitle title={buttonLabel} count={totalCount} subtitle={subtitle} />
        </Stack>
        <Stack direction={{ md: 'column', lg: 'row' }} height={'100%'} width={{ md: '100%', lg: '65%' }} justifyContent={'end'} gap={1}>
          <TableSearchBar params={params} setParams={setParams} />
          {enabled?.essentialFilter && enabled?.essentialFilter?.length > 0 && (
            <Button
              id="basic-button"
              variant="export"
              onClick={() => setFilter((state) => !state)}
              sx={{
                border: ({ palette }) => `2px solid ${filterCount > 0 ? palette.primary.main : palette.customColor.ligthGreyOne}`,
              }}
              startIcon={
                <FilterIcon
                  fontSize="large"
                  sx={{
                    color: ({ palette }) => palette.grey[600],
                    mt: 1,
                  }}
                />
              }
              endIcon={
                filterCount > 0 && (
                  <Avatar
                    sx={{
                      bgcolor: ({ palette }) => palette.primary.main,
                      width: 24,
                      height: 24,
                      fontSize: '11px !important',
                    }}
                  >
                    {filterCount}
                  </Avatar>
                )
              }
            >
              Filter
            </Button>
          )}
          {enabled.add && (
            <Button
              onClick={(e) => {
                e.preventDefault();
                router.push(addPath ?? '/');
              }}
              variant="contained"
              color="secondary"
              startIcon={'+'}
              sx={{
                minWidth: '16%',
              }}
            >
              <Typography variant="body2" noWrap>
                {/* {buttonLabel ? 'Add ' + buttonLabel : 'Create New'} */}
                Create New
              </Typography>
            </Button>
          )}
          {enabled.import && <ImportButton url={url} importApi={masterImportApi} loading={importLoading} />}
          {enabled.export && (
            <LoadingButton
              variant="export"
              loading={isPending}
              onClick={() => {
                handleExport();
              }}
              sx={{
                minWidth: '10%',
              }}
              startIcon={<ExportIcon color="disabled" />}
            >
              Export
            </LoadingButton>
          )}
        </Stack>
      </Stack>
      <Collapse in={filter}>
        <Grid container spacing={2}>
          <TabelEssentialFilter params={params} setParams={setParams} essentialFilter={enabled.essentialFilter} />
        </Grid>
      </Collapse>
    </Stack>
  );
};

export default TableTopBar;
