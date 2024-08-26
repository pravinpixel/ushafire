import { useState } from 'react';

import { GridColDef, GridRowSelectionModel } from '@mui/x-data-grid';
import { Tab, Box, Chip, Stack, Avatar, Typography } from '@mui/material';

import { useRouter } from 'helper/CustomHooks';
import { ModuleType, handleColor, PROJECT_CONSTANTS } from 'helper/GlobalHelper';
import { PaginationInterFace, FilterInputsMenusTypes } from 'helper/types/TableTypes';
import { ProductFormType, ProductListResponse } from 'helper/types/inventory-management/ProductInventoryType';

import { ProductListKey, useProductDelete } from 'store/hooks/InventoryManagementHook';

import DataTable from 'views/components/table-componet/DataTable';
import TableTopBar from 'views/components/ui-componet/TableTopBar';
import { TabList, TabContainer } from 'views/components/ui-componet/custom-tab';
import MoreVertIconButton from 'views/components/ui-componet/buttons/MoreVertIconButton';

type Props = {
  data: ProductListResponse;
  isLoading: boolean;
  params: PaginationInterFace;
  setParams: React.Dispatch<React.SetStateAction<PaginationInterFace>>;
  redirectLink?: string;
  fieldLabel?: string;
  refetchUrl: string;
  permission: ModuleType;
};

export const ProductTable = ({ data, isLoading, params, setParams, redirectLink = '', permission }: Props) => {
  const router = useRouter();
  // const containerRef = useRef<HTMLElement>(null);
  const [value, setValue] = useState('Active');
  const [ids, setIds] = useState<GridRowSelectionModel>([]);
  //Default null to disable slide on first mount
  // const [viewPrice, setViewPrice] = useState<string | null>(null);
  const { mutateAsync: deleteApi } = useProductDelete();
  const PriceHistoryPath = permission.addMore?.find((value) => value.fend_component === 'price-history');
  const handleChange = (_event: React.SyntheticEvent | null, newValue: string | unknown) => {
    setValue(newValue as string);
    setParams((state) => ({
      ...state,
      status: newValue,
    }));
  };
  //Dynamic Filter by name
  const filterIncludes: FilterInputsMenusTypes[] = [
    {
      essentialName: 'Product-filter-supplier',
      label: 'Supplier',
    },
    {
      essentialName: 'Product-filter-category',
      label: 'Category',
    },
    {
      essentialName: 'Product-filter-brand',
      label: 'Brand',
    },
    {
      essentialName: 'Product-filter-stockstatus',
      label: 'Stock Status',
    },
  ];

  // const handleSlideOpen = (id: string) => {
  //   //SetViewPriceId for slide and all fetch single view proce history
  //   setViewPrice(id);
  // };
  // const handleSlideClose = () => {
  //   //SetViewPriceId as type string for slide
  //   setViewPrice('');
  // };

  const columns: readonly GridColDef<ProductFormType>[] = [
    {
      field: 'productName',
      headerName: 'Product Name',
      minWidth: 220,
      renderCell: ({ row }) => (
        <Stack
          flexDirection={'row'}
          alignItems={'center'}
          gap={1}
          onClick={() => router.pushById({ path: permission?.view?.path, id: row?._id, access: permission?.view?.access })}
          sx={{
            cursor: permission?.view?.access ? 'pointer' : 'none',
          }}
        >
          <Avatar
            variant="square"
            sx={{
              height: '1.5rem',
              width: '1.5rem',
            }}
            src={row.productImages?.[0]?.imagePath}
          />
          <Typography variant="inherit">{row.productName}</Typography>
        </Stack>
      ),
      flex: 1,
    },
    { field: 'category_id', headerName: 'Category', renderCell: ({ row }) => row.productCategory?.label, minWidth: 180, flex: 1 },
    { field: 'supplier', headerName: 'Supplier', renderCell: ({ row }) => row.supplier?.label, minWidth: 180, flex: 1 },
    { field: 'brand', headerName: 'Brand', renderCell: ({ row }) => row.brand?.label, minWidth: 180, flex: 1 },
    { field: 'sellingPrice', headerName: 'Price', renderCell: ({ row }) => PROJECT_CONSTANTS.DOLLER + row.sellingPrice, minWidth: 80, flex: 1 },
    { field: 'quantityInStock', headerName: 'Quantity', renderCell: ({ row }) => row.quantityInStock, minWidth: 80, flex: 1 },
    {
      field: 'status',
      headerName: 'Status',
      renderCell: ({ row }) => <Chip size="medium" color={handleColor(row?.status)} label={row?.status} />,
      minWidth: 110,
      flex: 1,
    },
    {
      field: 'action',
      headerName: '',
      sortable: false,
      minWidth: 50,
      flex: 1,
      renderCell: ({ row }) => (
        <MoreVertIconButton
          menuItem={[
            {
              label: 'View',
              action: 'view',
              access: permission.view.access,
              path: permission.view.path,
            },
            {
              label: 'Edit',
              action: 'edit',
              access: permission.edit.access,
              path: permission.edit.path,
            },
            {
              label: 'Delete',
              action: 'delete',
              access: permission.delete.access,
            },
            {
              label: 'View Price History',
              access: true,
              menuItemProps: {
                onClick: () =>
                  router.pushById({
                    access: PriceHistoryPath?.access,
                    id: row._id,
                    path: PriceHistoryPath?.path,
                  }),
                disabled: !PriceHistoryPath?.access,
              },
            },
          ]}
          id={row._id}
          refetchUrl={ProductListKey}
          label={'Product'}
          deleteApi={deleteApi}
        />
      ),
    },
  ];

  return (
    // <Box ref={containerRef}>
    //   <Slide
    //     in={true}
    //     key={viewPrice as unknown as string}
    //     direction={viewPrice ? 'left' : 'right'}
    //     mountOnEnter
    //     unmountOnExit
    //     appear={typeof viewPrice === 'string'}
    //     container={containerRef.current}
    //   >
    //     {viewPrice ? (
    //       <Box>
    //         <ClickAwayListener onClickAway={handleSlideClose}>
    //           <Box mt={7}>
    //             <ViewPriceHistoryTable id={viewPrice} />
    //           </Box>
    //         </ClickAwayListener>
    //       </Box>
    //     ) : (
    <Box>
      <TableTopBar
        mb={0}
        enabled={{
          add: permission?.add?.access,
          essentialFilter: filterIncludes,
        }}
        addPath={redirectLink}
        buttonLabel={permission.name}
        totalCount={data?.total}
        params={params}
        setParams={setParams}
        ids={ids}
        filterCount={data?.filterCount}
      />
      <TabContainer>
        <TabList handleChange={handleChange} value={value}>
          <Tab value="Active" label="Active" />
          <Tab value="All" label="All Products" />
        </TabList>
        <DataTable
          mt={1}
          minSize={87}
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
      </TabContainer>
    </Box>
    //     )}
    //   </Slide>
    // </Box>
  );
};
