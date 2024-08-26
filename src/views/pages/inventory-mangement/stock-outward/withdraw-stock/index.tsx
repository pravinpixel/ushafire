import { useParams } from 'react-router-dom';
import { Fragment } from 'react/jsx-runtime';

import { Grid, Paper, alpha, Button, TableBody, TableCell, Typography } from '@mui/material';

import { fDate } from 'helper/FormatHelper';
import { pxToRem } from 'helper/GlobalHelper';
import { useRouter } from 'helper/CustomHooks';
import { ComponentProps } from 'helper/types/GlobalTypes';
import { ReceivedReports } from 'helper/types/inventory-management/StockOutwardType';

import { useStockOutwardUpdateQtyView } from 'store/hooks/InventoryManagementHook';

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
    { id: 'inwardQty', label: 'Warehouse Location' },
    { id: 'addedQty', label: 'Warehouse Quantity' },
  ];
  return (
    <>
      <Grid container>
        {Tablelabel.map(({ label }) => (
          <Grid item key={label} md={3}>
            <Typography color={({ palette }) => palette.primary.main} sx={{ py: pxToRem(14), px: 2, fontSize: pxToRem(16), fontWeight: 500 }}>
              {label}
            </Typography>
          </Grid>
        ))}
      </Grid>
      <Grid container>
        {data?.map((outward) => (
          <Fragment key={outward._id}>
            <InSideTabelCel value={outward.productName} />
            <InSideTabelCel value={outward.skuCode} />
            <InSideTabelCel value={outward.outwardQty} />
            <InSideTabelCel value={outward.addedQty} />
          </Fragment>
        ))}
      </Grid>
    </>
  );
};

const WithDrawStock: React.FC<ComponentProps> = ({ permission }) => {
  const { id } = useParams();
  const router = useRouter();
  const { data, isFetching } = useStockOutwardUpdateQtyView(id);

  const path = permission.add?.path || '';
  const access = (permission.add?.access && data?.status === 'Opened') || false;

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
              { id: 'reportNumber', label: 'Outward No' },
              { id: 'reportDate', label: 'Outward Date' },
              { id: 'totalAddedQty', label: 'Withdraw Quantity' },
            ]}
          />

          <TableBody>
            {data?.list?.map((outward) => (
              <ExpandableTableRow
                key={outward.reportNumber}
                expandComponent={
                  <TableCell colSpan={12}>
                    <InSideTable data={outward.issuedReports} />
                  </TableCell>
                }
              >
                <TableCell>{outward.reportNumber}</TableCell>
                <TableCell>{outward?.reportDate ? fDate(outward.reportDate) : ''}</TableCell>
                <TableCell>{outward.totalInwardQty}</TableCell>
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
                    stock_outward_id: id || '',
                  },
                });
              }}
            >
              Withdraw Quantity
            </Button>
          )}
        </Grid>
      </Grid>
    </Paper>
  );
};
export default WithDrawStock;
