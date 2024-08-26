import { Grid } from '@mui/material';

import { useDashBoardList } from 'store/hooks/EssentialHooks';

import {
  LoanApproval,
  OrdersPipline,
  BlanketApproval,
  PurchaceApproval,
  SaleOrderApproval,
  TopSellingProducts,
  SaleInvoiceApproval,
} from './ApprovalTables';

function DashBoardList() {
  const { data } = useDashBoardList();
  return (
    <Grid container spacing={2}>
      <Grid item xs={12} md={12}>
        <PurchaceApproval data={data?.purchaseOrder} />
      </Grid>
      <Grid item xs={12} md={12}>
        <SaleOrderApproval data={data?.saleOrder} />
      </Grid>
      <Grid item xs={12} md={12}>
        <SaleInvoiceApproval data={data?.salesInvoice} />
      </Grid>
      <Grid item xs={12} md={6}>
        <TopSellingProducts />
      </Grid>
      <Grid item xs={12} md={6}>
        <OrdersPipline />
      </Grid>
      <Grid item xs={12} md={12}>
        <BlanketApproval data={data?.blanketOrder} />
      </Grid>
      <Grid item xs={12} md={12}>
        <LoanApproval data={data?.loan} />
      </Grid>
    </Grid>
  );
}

export default DashBoardList;
