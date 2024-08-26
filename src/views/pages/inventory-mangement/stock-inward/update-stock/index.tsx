import { useParams } from 'react-router-dom';
import { Fragment } from 'react/jsx-runtime';

import { Grid, Paper, alpha, Button, TableBody, TableCell, Typography } from '@mui/material';

import { fDate } from 'helper/FormatHelper';
import { pxToRem } from 'helper/GlobalHelper';
import { useRouter } from 'helper/CustomHooks';
import { ComponentProps } from 'helper/types/GlobalTypes';
import { ReceivedReports } from 'helper/types/inventory-management/StockInwardType';

import { useStockInwaedUpdateQtyView } from 'store/hooks/InventoryManagementHook';

import { CustomNoRowsOverlay } from 'views/components/table-componet/NoDataRow';
import { TableHeader, TableWrapper, ExpandableTableRow } from 'views/components/table-componet/form-table';

const InSideTabelCel = ({ value }: { value?: string | number }) => (
  <Grid sx={{ py: 2, px: 2, background: ({ palette }) => alpha(palette.primary.main, 0.16) }} item md={3}>
    <Typography fontSize={pxToRem(15)} fontWeight={500}>
      {value}
    </Typography>
  </Grid>
);

const InSideTable = ({ data }: { data: ReceivedReports[] }) => {
  const Tablelabel = [
    { id: 'productName', label: 'Product Name' },
    { id: 'skuCode', label: 'SKU' },
    { id: 'inwardQty', label: 'Stock Inward Quantity' },
    { id: 'addedQty', label: 'Added Quantity' },
  ];
  return (
    <>
      <Grid container>
        {Tablelabel.map(({ label }) => (
          <Grid item key={label} md={3}>
            <Typography color={({ palette }) => palette.primary.main} sx={{ py: pxToRem(14), px: 2, fontSize: pxToRem(18.9), fontWeight: 500 }}>
              {label}
            </Typography>
          </Grid>
        ))}
      </Grid>
      <Grid container>
        {data?.map((inward) => (
          <Fragment key={inward._id}>
            <InSideTabelCel value={inward.productName} />
            <InSideTabelCel value={inward.skuCode} />
            <InSideTabelCel value={inward.inwardQty} />
            <InSideTabelCel value={inward.addedQty} />
          </Fragment>
        ))}
      </Grid>
    </>
  );
};

const UpdateStock: React.FC<ComponentProps> = ({ permission }) => {
  const { id } = useParams();
  const { data, isFetching } = useStockInwaedUpdateQtyView(id);
  const path = permission.add?.path || '';
  const access = (permission.add?.access && data?.status === 'Opened') || false;
  const router = useRouter();

  return (
    <Paper
      variant="form"
      sx={{
        p: '2rem 2rem 2.5rem 2rem',
        minHeight: '30rem',
      }}
    >
      <Typography variant="h6" mb={2}>
        Update Quantity
      </Typography>
      {data?.list && data?.list?.length >= 1 ? (
        <TableWrapper>
          <TableHeader
            headLabel={[
              { id: 'action', label: '' },
              { id: 'reportNumber', label: 'Inward No' },
              { id: 'reportDate', label: 'Inward Date' },
              { id: 'totalInwardQty', label: 'Stock Inward Total Quantity' },
              { id: 'totalAddedQty', label: 'Added Quantity' },
            ]}
          />

          <TableBody>
            {data?.list?.map((inward) => (
              <ExpandableTableRow
                key={inward.reportNumber}
                expandComponent={
                  <TableCell colSpan={12}>
                    <InSideTable data={inward.receivedReports} />
                  </TableCell>
                }
              >
                <TableCell>{inward.reportNumber}</TableCell>
                <TableCell>{inward?.reportDate ? fDate(inward.reportDate) : ''}</TableCell>
                <TableCell>{inward.totalInwardQty}</TableCell>
                <TableCell>{inward.totalAddedQty}</TableCell>
              </ExpandableTableRow>
            ))}
          </TableBody>
        </TableWrapper>
      ) : (
        <CustomNoRowsOverlay loading={isFetching} />
      )}

      <Grid container>
        <Grid item mt={5}>
          {/* Enabling button only user has access */}
          {access && (
            <Button
              onClick={() => {
                router.navigateById({
                  path,
                  access,
                  query: {
                    stock_inward_id: id || '',
                  },
                });
              }}
            >
              Update Stock
            </Button>
          )}
        </Grid>
      </Grid>
    </Paper>
  );
};
export default UpdateStock;
