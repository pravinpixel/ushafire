import { useState } from 'react';

import { Avatar } from '@mui/material';
import { GridColDef, GridRowSelectionModel } from '@mui/x-data-grid';

import { ModuleType } from 'helper/GlobalHelper';
import { defaultImage } from 'helper/AssetHelper';
import { PaginationInterFace } from 'helper/types/TableTypes';
import { BarcodeTypeForm, BarcodeListResponse } from 'helper/types/inventory-management/BarcodeType';

import { BarcodeListsKey, useBarcodeDelete } from 'store/hooks/InventoryManagementHook';

import DataTable from 'views/components/table-componet/DataTable';
import TableTopBar from 'views/components/ui-componet/TableTopBar';
import PrinterButton from 'views/components/ui-componet/buttons/printerButton';
import ViewEditDeleteButton from 'views/components/ui-componet/buttons/ViewEditDeleteButton';

import BarcodeView from '../view';

type Props = {
  data: BarcodeListResponse;
  isLoading: boolean;
  params: PaginationInterFace;
  setParams: React.Dispatch<React.SetStateAction<PaginationInterFace>>;
  redirectLink?: string;
  buttonLabel: string;
  fieldLabel?: string;
  url: string;
  permission: ModuleType;
};

export const BarcodeTable = ({ buttonLabel, data, isLoading, params, setParams, url, redirectLink = '', permission }: Props) => {
  const { mutateAsync: deleteApi, isPending } = useBarcodeDelete();
  const [ids, setIds] = useState<GridRowSelectionModel>([]);
  const columns: readonly GridColDef<BarcodeTypeForm>[] = [
    { field: 'categoryId', headerName: 'Category', renderCell: ({ row }) => row.categoryId?.name, minWidth: 180, flex: 1 },
    { field: 'subcategoryId', headerName: 'Sub Category', renderCell: ({ row }) => row.subcategoryId?.name, minWidth: 180, flex: 1 },
    { field: 'productName', headerName: 'Product', minWidth: 180, flex: 1 },
    { field: 'quantity', headerName: 'Quantity', renderCell: ({ row }) => row.productId?.quantity, minWidth: 180, flex: 1 },
    {
      field: 'barcodeImage',
      headerName: 'Barcode',
      sortable: false,
      minWidth: 220,
      flex: 1,
      renderCell: ({ row }) => <Avatar variant="square" src={(row?.barcodeImage as string) ?? defaultImage} />,
    },
    {
      field: 'action',
      headerName: '',
      sortable: false,
      minWidth: 220,
      flex: 1,
      renderCell: ({ row }) =>
        permission.view.access &&
        row?.barcodeImage && (
          <>
            <BarcodeView id={row?._id} barcodeNumber={row?.barcode} imagesrcs={row?.barcodeImage || ''} />
            <PrinterButton id={row?._id} type="barcode" />
            <ViewEditDeleteButton
              id={row?._id ?? ''}
              deleteApi={deleteApi}
              isPending={isPending}
              label={buttonLabel}
              path={permission.path ?? '/'}
              url={BarcodeListsKey}
              deleteId={row?._id}
              enabled={{ deleted: true, edit: true, view: false }}
            />
          </>
        ),
    },
  ];

  return (
    <>
      <TableTopBar
        enabled={{
          add: permission?.add?.access,
          essentialFilter: [
            {
              // name: 'category',
              essentialName: 'Category',
              label: 'Barcode-filter-category',
            },
          ],
        }}
        addPath={redirectLink}
        buttonLabel={buttonLabel}
        totalCount={data?.total}
        params={params}
        setParams={setParams}
        url={url}
        ids={ids}
        filterCount={data?.filterCount}
      />
      <DataTable
        params={params}
        setParams={setParams}
        dataGridProps={{
          loading: isLoading,
          checkboxSelection: true,
          isRowSelectable: () => true,
          onRowSelectionModelChange: (newRowSelectionModel) => {
            setIds(newRowSelectionModel);
          },
        }}
        row={data?.list}
        columns={columns}
        total={data?.totalPages}
      />
    </>
  );
};
