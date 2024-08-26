/* eslint-disable max-lines */
/* eslint-disable @typescript-eslint/no-explicit-any */
import { lazy, ReactNode } from 'react';

// import useMyProfieStore from 'zustand-config/MyProfileZustand';

import { IconWrapper } from 'theme/svg';

import EssentialFields from 'views/pages/master/_utils/EssentialFields';
import SupplierRequiredFields from 'views/pages/supplier/_utils/SupplierRequiredFields';

import Loadable from '../views/components/loader/Loadable';
import { ModuleType, PROJECT_CONSTANTS } from './GlobalHelper';
import { useMasterInputs, MasterInputsType } from './CustomHooks';

// -------------------------------DASHBOARD-------------------------------------//
const Dashboard = Loadable(lazy(() => import('../views/pages/dashboard')));

// -------------------------------ADMIN SETTINGS-------------------------------------//
const ParentPermissionList = Loadable(lazy(() => import('../views/pages/modules/parent-module/list')));
const ChildPermissionList = Loadable(lazy(() => import('../views/pages/modules/child-module/list')));

// ------------------------------------Sales Crm System -----------------------------//

const ContactsList = Loadable(lazy(() => import('views/pages/sales-crm-system/contacts/list')));
const ContactsEdit = Loadable(lazy(() => import('views/pages/sales-crm-system/contacts/edit')));
const ContactsCreate = Loadable(lazy(() => import('views/pages/sales-crm-system/contacts/create')));

const SalesOrderList = Loadable(lazy(() => import('views/pages/sales-crm-system/sales-order/list')));
const SalesOrderEdit = Loadable(lazy(() => import('views/pages/sales-crm-system/sales-order/edit')));
const SalesOrderCreate = Loadable(lazy(() => import('views/pages/sales-crm-system/sales-order/create')));
const SalesOrderApproval = Loadable(lazy(() => import('views/pages/sales-crm-system/sales-order/approval')));

const PurchaseOrderList = Loadable(lazy(() => import('views/pages/sales-crm-system/purchase-order/list')));
const PurchaseOrderEdit = Loadable(lazy(() => import('views/pages/sales-crm-system/purchase-order/edit')));
const PurchaseOrderCreate = Loadable(lazy(() => import('views/pages/sales-crm-system/purchase-order/create')));
const PurchaseOrderApproval = Loadable(lazy(() => import('views/pages/sales-crm-system/purchase-order/approval')));

const LoansList = Loadable(lazy(() => import('views/pages/sales-crm-system/loans/list')));
const LoansEdit = Loadable(lazy(() => import('views/pages/sales-crm-system/loans/edit')));
const LoansCreate = Loadable(lazy(() => import('views/pages/sales-crm-system/loans/create')));
const LoansApproval = Loadable(lazy(() => import('views/pages/sales-crm-system/loans/approval')));

const ListLead = Loadable(lazy(() => import('views/pages/sales-crm-system/lead-management/list')));
const EditLead = Loadable(lazy(() => import('views/pages/sales-crm-system/lead-management/edit')));
const CreateLead = Loadable(lazy(() => import('views/pages/sales-crm-system/lead-management/create')));

const ListOpportunity = Loadable(lazy(() => import('views/pages/sales-crm-system/opportunity/list')));
const EditOpportunity = Loadable(lazy(() => import('views/pages/sales-crm-system/opportunity/edit')));
const CreateOpportunity = Loadable(lazy(() => import('views/pages/sales-crm-system/opportunity/create')));

const ListQuotation = Loadable(lazy(() => import('views/pages/sales-crm-system/quotation/list')));
const EditQuotation = Loadable(lazy(() => import('views/pages/sales-crm-system/quotation/edit')));
const CreateQuotation = Loadable(lazy(() => import('views/pages/sales-crm-system/quotation/create')));

const ListPoRequest = Loadable(lazy(() => import('views/pages/sales-crm-system/po-request/list')));
const EditPoRequest = Loadable(lazy(() => import('views/pages/sales-crm-system/po-request/edit')));
const CreatePoRequest = Loadable(lazy(() => import('views/pages/sales-crm-system/po-request/create')));

const ListOrganization = Loadable(lazy(() => import('views/pages/sales-crm-system/organization/list')));
const EditOrganization = Loadable(lazy(() => import('views/pages/sales-crm-system/organization/edit')));
const CreateOrganization = Loadable(lazy(() => import('views/pages/sales-crm-system/organization/create')));

const ListSalesReturn = Loadable(lazy(() => import('views/pages/sales-crm-system/sales-return/list')));
const EditSalesReturn = Loadable(lazy(() => import('views/pages/sales-crm-system/sales-return/edit')));
const CreateSalesReturn = Loadable(lazy(() => import('views/pages/sales-crm-system/sales-return/create')));

const ListLoanReturn = Loadable(lazy(() => import('views/pages/sales-crm-system/loan-return/list')));
const EditLoanReturn = Loadable(lazy(() => import('views/pages/sales-crm-system/loan-return/edit')));
const CreateLoanReturn = Loadable(lazy(() => import('views/pages/sales-crm-system/loan-return/create')));

const ListBlanketOrder = Loadable(lazy(() => import('views/pages/sales-crm-system/blanket-order/list')));
const EditBlanketOrder = Loadable(lazy(() => import('views/pages/sales-crm-system/blanket-order/edit')));
const CreateBlanketOrder = Loadable(lazy(() => import('views/pages/sales-crm-system/blanket-order/create')));
const BlanketOrderApproval = Loadable(lazy(() => import('views/pages/sales-crm-system/blanket-order/approval')));

const ListDeals = Loadable(lazy(() => import('views/pages/sales-crm-system/deals/list')));
const EditDeals = Loadable(lazy(() => import('views/pages/sales-crm-system/deals/edit')));
const CreateDeals = Loadable(lazy(() => import('views/pages/sales-crm-system/deals/create')));

const ListSalesInvoice = Loadable(lazy(() => import('views/pages/sales-crm-system/sales-invoice/list')));
const EditSalesInvoice = Loadable(lazy(() => import('views/pages/sales-crm-system/sales-invoice/edit')));
const CreateSalesInvoice = Loadable(lazy(() => import('views/pages/sales-crm-system/sales-invoice/create')));
const SalesInvoiceApproval = Loadable(lazy(() => import('views/pages/sales-crm-system/sales-invoice/approval')));
// ------------------------------------Manage Payments -------------------------------------//

const CustomerPaymentList = Loadable(lazy(() => import('views/pages/manage-payments/customer-payment/list')));
const CustomerPaymentCreate = Loadable(lazy(() => import('views/pages/manage-payments/customer-payment/create')));
const CustomerPaymentEdit = Loadable(lazy(() => import('views/pages/manage-payments/customer-payment/edit')));
const PaymentHistoryCustomer = Loadable(lazy(() => import('views/pages/manage-payments/customer-payment/payment-history')));

const PaymentHistoryVendor = Loadable(lazy(() => import('views/pages/manage-payments/vendor-payment/payment-history')));
const VendorPaymentList = Loadable(lazy(() => import('views/pages/manage-payments/vendor-payment/list')));
const VendorPaymentEdit = Loadable(lazy(() => import('views/pages/manage-payments/vendor-payment/edit')));
const VendorPaymentCreate = Loadable(lazy(() => import('views/pages/manage-payments/vendor-payment/create')));

// ------------------------------------Inventory Mangement -----------------------------//
const ProductCreate = Loadable(lazy(() => import('views/pages/inventory-mangement/product-inventory/create')));
const ProductEdit = Loadable(lazy(() => import('views/pages/inventory-mangement/product-inventory/edit')));
const ProductList = Loadable(lazy(() => import('views/pages/inventory-mangement/product-inventory/list')));
const ProductView = Loadable(lazy(() => import('views/pages/inventory-mangement/product-inventory/view')));
const SearchProduct = Loadable(lazy(() => import('views/pages/inventory-mangement/product-inventory/search')));
const PriceHistory = Loadable(lazy(() => import('views/pages/inventory-mangement/product-inventory/price-history')));

const BarcodeCreate = Loadable(lazy(() => import('views/pages/inventory-mangement/barcode/create')));
const BarcodeList = Loadable(lazy(() => import('views/pages/inventory-mangement/barcode/list')));
const BarcodeView = Loadable(lazy(() => import('views/pages/inventory-mangement/barcode/view')));
const BarcodeEdit = Loadable(lazy(() => import('views/pages/inventory-mangement/barcode/edit')));

const WareHouseWiseList = Loadable(lazy(() => import('views/pages/inventory-mangement/warehouse-wise-stock/list')));
const WareHouseWiseEdit = Loadable(lazy(() => import('views/pages/inventory-mangement/warehouse-wise-stock/edit')));
const WareHouseWiseCreate = Loadable(lazy(() => import('views/pages/inventory-mangement/warehouse-wise-stock/create')));

const StockInwardList = Loadable(lazy(() => import('views/pages/inventory-mangement/stock-inward/list')));
const StockInwardEdit = Loadable(lazy(() => import('views/pages/inventory-mangement/stock-inward/edit')));
const StockInwardCreate = Loadable(lazy(() => import('views/pages/inventory-mangement/stock-inward/create')));
const UpdateStock = Loadable(lazy(() => import('views/pages/inventory-mangement/stock-inward/update-stock')));

const StockOutwardList = Loadable(lazy(() => import('views/pages/inventory-mangement/stock-outward/list')));
const StockOutwardEdit = Loadable(lazy(() => import('views/pages/inventory-mangement/stock-outward/edit')));
const StockOutwardCreate = Loadable(lazy(() => import('views/pages/inventory-mangement/stock-outward/create')));
const WithDrawStock = Loadable(lazy(() => import('views/pages/inventory-mangement/stock-outward/withdraw-stock')));

const StockLevelIndicatorList = Loadable(lazy(() => import('views/pages/inventory-mangement/stock-level-indicators/list')));
// -------------------------------USER-------------------------------------//
const UserAdd = Loadable(lazy(() => import('../views/pages/settings/user/create')));
const UserEdit = Loadable(lazy(() => import('../views/pages/settings/user/update')));
const UserView = Loadable(lazy(() => import('../views/pages/settings/user/view')));
const UserList = Loadable(lazy(() => import('../views/pages/settings/user/list')));
// -------------------------------ROLE-------------------------------------//
const RoleEdit = Loadable(lazy(() => import('../views/pages/settings/role/update')));
const RoleList = Loadable(lazy(() => import('../views/pages/settings/role/list')));
const RoleAdd = Loadable(lazy(() => import('../views/pages/settings/role/create')));

// -------------------------------Configuration-------------------------------------//
const ConfigurationEdit = Loadable(lazy(() => import('../views/pages/settings/configuration/edit')));
const ConfigurationList = Loadable(lazy(() => import('../views/pages/settings/configuration/list')));
const ConfigurationAdd = Loadable(lazy(() => import('../views/pages/settings/configuration/create')));

// -------------------------------Master-------------------------------------//

// const PermissionList = Loadable(lazy(() => import('../views/pages/settings/permission/list')));
// const CreatePermission = Loadable(lazy(() => import('../views/pages/settings/permission/create')));
// const EditPermission = Loadable(lazy(() => import('../views/pages/settings/permission/update')));

const DepartmentList = Loadable(lazy(() => import('../views/pages/master/department/list')));
const CreateDepartment = Loadable(lazy(() => import('../views/pages/master/department/create')));
const EditDepartment = Loadable(lazy(() => import('../views/pages/master/department/edit')));

const DesignationList = Loadable(lazy(() => import('../views/pages/master/designation/list')));
const CreateDesination = Loadable(lazy(() => import('../views/pages/master/designation/create')));
const EditDesination = Loadable(lazy(() => import('../views/pages/master/designation/edit')));

const CatgeoryList = Loadable(lazy(() => import('../views/pages/master/category/list')));
const CreateCatgeory = Loadable(lazy(() => import('../views/pages/master/category/create')));
const EditCatgeory = Loadable(lazy(() => import('../views/pages/master/category/edit')));

const CountryList = Loadable(lazy(() => import('../views/pages/master/country/list')));
const CreateCountry = Loadable(lazy(() => import('../views/pages/master/country/create')));
const EditCountry = Loadable(lazy(() => import('../views/pages/master/country/edit')));

const CustomerTypeList = Loadable(lazy(() => import('../views/pages/master/customer-type/list')));
const CreateCustomerType = Loadable(lazy(() => import('../views/pages/master/customer-type/create')));
const EditCustomerType = Loadable(lazy(() => import('../views/pages/master/customer-type/edit')));

const CustomerGroupList = Loadable(lazy(() => import('../views/pages/master/customer-group/list')));
const CreateCustomerGroup = Loadable(lazy(() => import('../views/pages/master/customer-group/create')));
const EditCustomerGroup = Loadable(lazy(() => import('../views/pages/master/customer-group/edit')));

const LeadStatusList = Loadable(lazy(() => import('../views/pages/master/lead-status/list')));
const CreateLeadStatus = Loadable(lazy(() => import('../views/pages/master/lead-status/create')));
const EditLeadStatus = Loadable(lazy(() => import('../views/pages/master/lead-status/edit')));

const OpportunityStageList = Loadable(lazy(() => import('../views/pages/master/opportunity-stage/list')));
const CreateOpportunityStage = Loadable(lazy(() => import('../views/pages/master/opportunity-stage/create')));
const EditOpportunityStage = Loadable(lazy(() => import('../views/pages/master/opportunity-stage/edit')));

const BayList = Loadable(lazy(() => import('../views/pages/master/bay/list')));
const CreateBay = Loadable(lazy(() => import('../views/pages/master/bay/create')));
const EditBay = Loadable(lazy(() => import('../views/pages/master/bay/edit')));

const BrandList = Loadable(lazy(() => import('../views/pages/master/brand/list')));
const EditBrand = Loadable(lazy(() => import('../views/pages/master/brand/edit')));
const CreateBrand = Loadable(lazy(() => import('../views/pages/master/brand/create')));

const DivisionList = Loadable(lazy(() => import('../views/pages/master/division/list')));
const CreateDivision = Loadable(lazy(() => import('../views/pages/master/division/create')));
const EditDivision = Loadable(lazy(() => import('../views/pages/master/division/edit')));

const LocationList = Loadable(lazy(() => import('../views/pages/master/location/list')));
const CreateLocation = Loadable(lazy(() => import('../views/pages/master/location/create')));
const EditLocation = Loadable(lazy(() => import('../views/pages/master/location/edit')));

const ProductGroupList = Loadable(lazy(() => import('../views/pages/master/product-group/list')));
const CreateProductGroup = Loadable(lazy(() => import('../views/pages/master/product-group/create')));
const EditProductGroup = Loadable(lazy(() => import('../views/pages/master/product-group/edit')));

const ProductTypeList = Loadable(lazy(() => import('../views/pages/master/product-type/list')));
const CreateProductType = Loadable(lazy(() => import('../views/pages/master/product-type/create')));
const EditProductType = Loadable(lazy(() => import('../views/pages/master/product-type/edit')));

const SubCategoryList = Loadable(lazy(() => import('../views/pages/master/sub-category/list')));
const CreateSubCategory = Loadable(lazy(() => import('../views/pages/master/sub-category/create')));
const EditSubCategory = Loadable(lazy(() => import('../views/pages/master/sub-category/edit')));

const BusinessVerticalList = Loadable(lazy(() => import('../views/pages/master/business-vertical/list')));
const CreateBusinessVertical = Loadable(lazy(() => import('../views/pages/master/business-vertical/create')));
const EditBusinessVertical = Loadable(lazy(() => import('../views/pages/master/business-vertical/edit')));

const WareHouseList = Loadable(lazy(() => import('../views/pages/master/warehouse/list')));
const CreateWareHouse = Loadable(lazy(() => import('../views/pages/master/warehouse/create')));
const EditWareHouse = Loadable(lazy(() => import('../views/pages/master/warehouse/edit')));

const RackList = Loadable(lazy(() => import('../views/pages/master/rack/list')));
const CreateRack = Loadable(lazy(() => import('../views/pages/master/rack/create')));
const EditRack = Loadable(lazy(() => import('../views/pages/master/rack/edit')));

const StackingList = Loadable(lazy(() => import('../views/pages/master/stacking/list')));
const CreateStacking = Loadable(lazy(() => import('../views/pages/master/stacking/create')));
const EditStacking = Loadable(lazy(() => import('../views/pages/master/stacking/edit')));

const UomList = Loadable(lazy(() => import('../views/pages/master/uom/list')));
const CreateUom = Loadable(lazy(() => import('../views/pages/master/uom/create')));
const EditUom = Loadable(lazy(() => import('../views/pages/master/uom/edit')));

const CurrencyList = Loadable(lazy(() => import('../views/pages/master/currency/list')));
const CreateCurrency = Loadable(lazy(() => import('../views/pages/master/currency/create')));
const EditCurrency = Loadable(lazy(() => import('../views/pages/master/currency/edit')));

const SubVerticalList = Loadable(lazy(() => import('../views/pages/master/sub-vertical/list')));
const CreateSubVertical = Loadable(lazy(() => import('../views/pages/master/sub-vertical/create')));
const EditSubVertical = Loadable(lazy(() => import('../views/pages/master/sub-vertical/edit')));

const StockList = Loadable(lazy(() => import('../views/pages/master/stock/list')));
const CreateStock = Loadable(lazy(() => import('../views/pages/master/stock/create')));
const EditStock = Loadable(lazy(() => import('../views/pages/master/stock/edit')));

const TcTemplateList = Loadable(lazy(() => import('../views/pages/master/tc-template/list')));
const CreateTcTemplate = Loadable(lazy(() => import('../views/pages/master/tc-template/create')));
const EditTcTemplate = Loadable(lazy(() => import('../views/pages/master/tc-template/edit')));

const DeliveryTermsList = Loadable(lazy(() => import('../views/pages/master/delivery-terms/list')));
const CreateDeliveryTerms = Loadable(lazy(() => import('../views/pages/master/delivery-terms/create')));
const EditDeliveryTerms = Loadable(lazy(() => import('../views/pages/master/delivery-terms/edit')));

const PaymentTermsList = Loadable(lazy(() => import('../views/pages/master/payment-terms/list')));
const CreatePaymentTerms = Loadable(lazy(() => import('../views/pages/master/payment-terms/create')));
const EditPaymentTerms = Loadable(lazy(() => import('../views/pages/master/payment-terms/edit')));

const StateList = Loadable(lazy(() => import('../views/pages/master/state/list')));
const CreateState = Loadable(lazy(() => import('../views/pages/master/state/create')));
const EditState = Loadable(lazy(() => import('../views/pages/master/state/edit')));

const CityList = Loadable(lazy(() => import('../views/pages/master/city/list')));
const CreateCity = Loadable(lazy(() => import('../views/pages/master/city/create')));
const EditCity = Loadable(lazy(() => import('../views/pages/master/city/edit')));

const ListParentModule = Loadable(lazy(() => import('../views/pages/modules/parent-module/list')));
const AddParentModule = Loadable(lazy(() => import('../views/pages/modules/parent-module/add')));
const EditParentModule = Loadable(lazy(() => import('../views/pages/modules/parent-module/edit')));

const ListChildModule = Loadable(lazy(() => import('../views/pages/modules/child-module/list')));
const AddChildModule = Loadable(lazy(() => import('../views/pages/modules/child-module/add')));
const EditChildModule = Loadable(lazy(() => import('../views/pages/modules/child-module/edit')));

const ListType = Loadable(lazy(() => import('../views/pages/master/type/list')));
const CreateType = Loadable(lazy(() => import('../views/pages/master/type/create')));
const EditType = Loadable(lazy(() => import('../views/pages/master/type/edit')));

const ListBin = Loadable(lazy(() => import('../views/pages/master/bin/list')));
const CreateBin = Loadable(lazy(() => import('../views/pages/master/bin/create')));
const EditBin = Loadable(lazy(() => import('../views/pages/master/bin/edit')));

const ListShelf = Loadable(lazy(() => import('../views/pages/master/shelf/list')));
const CreateShelf = Loadable(lazy(() => import('../views/pages/master/shelf/create')));
const EditShelf = Loadable(lazy(() => import('../views/pages/master/shelf/edit')));

// -------------------------------Supplier-------------------------------------//
const SupplierList = Loadable(lazy(() => import('../views/pages/supplier/list')));
const SupplierAdd = Loadable(lazy(() => import('../views/pages/supplier/create')));
const SupplierEdit = Loadable(lazy(() => import('../views/pages/supplier/edit')));
const SupplierView = Loadable(lazy(() => import('../views/pages/supplier/view')));

//Under Development

const UnderDevelopement = Loadable(lazy(() => import('../views/layouts/utils/UnderDevelopment')));

export const components: (pros: ModuleType, parentPermission?: ModuleType) => any = (permission, parentPermission) => {
  return {
    dashboard: {
      component: <Dashboard />,
      list: <Dashboard />,
    },
    'dashboard-2': {
      component: <UnderDevelopement />,
      list: <Dashboard />,
    },
    'inventory-management': {
      component: <>Inventory Management</>,
      list: <>Inventory Management</>,
      view: <>View Sales Purchas</>,
      edit: <> Edit Sales Purchas</>,
      add: <>Add Sales Purchas</>,
      'product-inventory': {
        component: <ProductCreate permission={permission} parentPermission={parentPermission} />,
        list: <ProductList permission={permission} parentPermission={parentPermission} />,
        view: <ProductView permission={permission} parentPermission={parentPermission} />,
        edit: <ProductEdit permission={permission} parentPermission={parentPermission} />,
        add: <ProductCreate permission={permission} parentPermission={parentPermission} />,
        search: <SearchProduct permission={permission} parentPermission={parentPermission} />,
        'price-history': <PriceHistory permission={permission} parentPermission={parentPermission} />,
      },
      barcode: {
        component: <BarcodeList permission={permission} parentPermission={parentPermission} />,
        list: <BarcodeList permission={permission} parentPermission={parentPermission} />,
        view: <BarcodeView permission={permission} parentPermission={parentPermission} />,
        add: <BarcodeCreate permission={permission} parentPermission={parentPermission} />,
        edit: <BarcodeEdit permission={permission} parentPermission={parentPermission} />,
      },
      'warehouse-wise-stock': {
        component: <WareHouseWiseList permission={permission} parentPermission={parentPermission} />,
        list: <WareHouseWiseList permission={permission} parentPermission={parentPermission} />,
        edit: <WareHouseWiseEdit permission={permission} parentPermission={parentPermission} />,
        add: <WareHouseWiseCreate permission={permission} parentPermission={parentPermission} />,
      },
      'stock-inward': {
        component: <StockInwardList permission={permission} parentPermission={parentPermission} />,
        list: <StockInwardList permission={permission} parentPermission={parentPermission} />,
        edit: <StockInwardEdit permission={permission} parentPermission={parentPermission} />,
        add: <StockInwardCreate permission={permission} parentPermission={parentPermission} />,
        'update-stock': <UpdateStock permission={permission} parentPermission={parentPermission} />,
      },
      'stock-outward': {
        component: <StockOutwardList permission={permission} parentPermission={parentPermission} />,
        list: <StockOutwardList permission={permission} parentPermission={parentPermission} />,
        edit: <StockOutwardEdit permission={permission} parentPermission={parentPermission} />,
        add: <StockOutwardCreate permission={permission} parentPermission={parentPermission} />,
        'withdraw-quantity': <WithDrawStock permission={permission} parentPermission={parentPermission} />,
      },
      'stock-level-indicators': {
        list: <StockLevelIndicatorList permission={permission} parentPermission={parentPermission} />,
      },
    },
    'sales-and-purchase': {
      component: <>Sales Purchase</>,
      list: <>Sales Purchase</>,
      view: <>View Sales Purchas</>,
      edit: <> Edit Sales Purchas</>,
      add: <>Add Sales Purchas</>,
    },
    'sales-crm-system': {
      component: <>Sales Crm System</>,
      list: <>Sales Crm System</>,
      view: <>View Sales Crm System</>,
      edit: <> Edit Sales Crm System</>,
      add: <>Add Sales Crm System</>,
      contacts: {
        component: <ContactsList permission={permission} parentPermission={parentPermission} />,
        list: <ContactsList permission={permission} parentPermission={parentPermission} />,
        view: <>View Contacts</>,
        edit: <ContactsEdit permission={permission} parentPermission={parentPermission} />,
        add: <ContactsCreate permission={permission} parentPermission={parentPermission} />,
      },
      deals: {
        component: <ListDeals permission={permission} parentPermission={parentPermission} />,
        list: <ListDeals permission={permission} parentPermission={parentPermission} />,
        view: <>View Deals</>,
        edit: <EditDeals permission={permission} parentPermission={parentPermission} />,
        add: <CreateDeals permission={permission} parentPermission={parentPermission} />,
      },
      loans: {
        component: <LoansList permission={permission} parentPermission={parentPermission} />,
        list: <LoansList permission={permission} parentPermission={parentPermission} />,
        view: <>View Loans</>,
        edit: <LoansEdit permission={permission} parentPermission={parentPermission} />,
        add: <LoansCreate permission={permission} parentPermission={parentPermission} />,
        approval: <LoansApproval permission={permission} parentPermission={parentPermission} />,
      },
      'purchase-order': {
        component: <PurchaseOrderList permission={permission} parentPermission={parentPermission} />,
        list: <PurchaseOrderList permission={permission} parentPermission={parentPermission} />,
        view: <>View Purchase Order</>,
        edit: <PurchaseOrderEdit permission={permission} parentPermission={parentPermission} />,
        add: <PurchaseOrderCreate permission={permission} parentPermission={parentPermission} />,
        approval: <PurchaseOrderApproval permission={permission} parentPermission={parentPermission} />,
      },
      'sales-order': {
        component: <SalesOrderList permission={permission} parentPermission={parentPermission} />,
        list: <SalesOrderList permission={permission} parentPermission={parentPermission} />,
        view: <>View Sales Order</>,
        edit: <SalesOrderEdit permission={permission} parentPermission={parentPermission} />,
        add: <SalesOrderCreate permission={permission} parentPermission={parentPermission} />,
        approval: <SalesOrderApproval permission={permission} parentPermission={parentPermission} />,
      },
      'blanket-order': {
        component: <ListBlanketOrder parentPermission={parentPermission} permission={permission} />,
        list: <ListBlanketOrder parentPermission={parentPermission} permission={permission} />,
        view: <>View Blanket Order</>,
        edit: <EditBlanketOrder parentPermission={parentPermission} permission={permission} />,
        add: <CreateBlanketOrder parentPermission={parentPermission} permission={permission} />,
        approval: <BlanketOrderApproval permission={permission} parentPermission={parentPermission} />,
      },
      'sales-invoice': {
        component: <ListSalesInvoice permission={permission} parentPermission={parentPermission} />,
        list: <ListSalesInvoice permission={permission} parentPermission={parentPermission} />,
        view: <>View Sales Invoice</>,
        edit: <EditSalesInvoice permission={permission} parentPermission={parentPermission} />,
        add: <CreateSalesInvoice permission={permission} parentPermission={parentPermission} />,
        approval: <SalesInvoiceApproval permission={permission} parentPermission={parentPermission} />,
      },
      organization: {
        component: <ListOrganization parentPermission={parentPermission} permission={permission} />,
        list: <ListOrganization parentPermission={parentPermission} permission={permission} />,
        view: <>View Lead Management</>,
        edit: <EditOrganization parentPermission={parentPermission} permission={permission} />,
        add: <CreateOrganization parentPermission={parentPermission} permission={permission} />,
      },
      'lead-management': {
        component: <ListLead parentPermission={parentPermission} permission={permission} />,
        list: <ListLead parentPermission={parentPermission} permission={permission} />,
        view: <>View Lead Management</>,
        edit: <EditLead parentPermission={parentPermission} permission={permission} />,
        add: <CreateLead parentPermission={parentPermission} permission={permission} />,
      },
      opportunity: {
        component: <ListOpportunity parentPermission={parentPermission} permission={permission} />,
        list: <ListOpportunity parentPermission={parentPermission} permission={permission} />,
        view: <>View Lead Management</>,
        edit: <EditOpportunity parentPermission={parentPermission} permission={permission} />,
        add: <CreateOpportunity parentPermission={parentPermission} permission={permission} />,
      },
      quotation: {
        component: <ListQuotation parentPermission={parentPermission} permission={permission} />,
        list: <ListQuotation parentPermission={parentPermission} permission={permission} />,
        view: <>View Quotation</>,
        edit: <EditQuotation parentPermission={parentPermission} permission={permission} />,
        add: <CreateQuotation parentPermission={parentPermission} permission={permission} />,
      },
      'sales-return': {
        component: <ListSalesReturn permission={permission} parentPermission={parentPermission} />,
        list: <ListSalesReturn permission={permission} parentPermission={parentPermission} />,
        view: <>View Sales Return</>,
        edit: <EditSalesReturn permission={permission} parentPermission={parentPermission} />,
        add: <CreateSalesReturn permission={permission} parentPermission={parentPermission} />,
      },
      'loan-return': {
        component: <ListLoanReturn permission={permission} parentPermission={parentPermission} />,
        list: <ListLoanReturn permission={permission} parentPermission={parentPermission} />,
        view: <>View Sales Return</>,
        edit: <EditLoanReturn permission={permission} parentPermission={parentPermission} />,
        add: <CreateLoanReturn permission={permission} parentPermission={parentPermission} />,
      },
      'po-request': {
        component: <ListPoRequest permission={permission} parentPermission={parentPermission} />,
        list: <ListPoRequest permission={permission} parentPermission={parentPermission} />,
        view: <>View Sales Return</>,
        edit: <EditPoRequest permission={permission} parentPermission={parentPermission} />,
        add: <CreatePoRequest permission={permission} parentPermission={parentPermission} />,
      },
    },
    'manage-payments': {
      'customer-payments': {
        component: <CustomerPaymentList permission={permission} parentPermission={parentPermission} />,
        list: <CustomerPaymentList permission={permission} parentPermission={parentPermission} />,
        view: <>View Contacts</>,
        edit: <CustomerPaymentEdit permission={permission} parentPermission={parentPermission} />,
        add: <CustomerPaymentCreate permission={permission} parentPermission={parentPermission} />,
        'customer-payment-history': <PaymentHistoryCustomer permission={permission} parentPermission={parentPermission} />,
      },
      'vendor-payments': {
        component: <VendorPaymentList permission={permission} parentPermission={parentPermission} />,
        list: <VendorPaymentList permission={permission} parentPermission={parentPermission} />,
        view: <>View VendorPayment</>,
        edit: <VendorPaymentEdit permission={permission} parentPermission={parentPermission} />,
        add: <VendorPaymentCreate permission={permission} parentPermission={parentPermission} />,
        'vendor-payment-history': <PaymentHistoryVendor permission={permission} parentPermission={parentPermission} />,
      },
    },
    master: {
      component: <>Master</>,
      list: <>Master</>,
      department: {
        component: <DepartmentList permission={permission} />,
        list: <DepartmentList permission={permission} />,
        view: <>View Department</>,
        edit: <EditDepartment parentPermission={parentPermission} permission={permission} />,
        add: <CreateDepartment parentPermission={parentPermission} permission={permission} />,
      },
      designation: {
        component: <DesignationList permission={permission} />,
        list: <DesignationList permission={permission} />,
        view: <>View Designation</>,
        edit: <EditDesination parentPermission={parentPermission} permission={permission} />,
        add: <CreateDesination parentPermission={parentPermission} permission={permission} />,
      },
      'customer-group': {
        component: <CustomerGroupList permission={permission} />,
        list: <CustomerGroupList permission={permission} />,
        view: <>View Customer Group</>,
        edit: <EditCustomerGroup parentPermission={parentPermission} permission={permission} />,
        add: <CreateCustomerGroup parentPermission={parentPermission} permission={permission} />,
      },
      'lead-status': {
        component: <LeadStatusList permission={permission} />,
        list: <LeadStatusList permission={permission} />,
        view: <>View Lead Status</>,
        edit: <EditLeadStatus parentPermission={parentPermission} permission={permission} />,
        add: <CreateLeadStatus parentPermission={parentPermission} permission={permission} />,
      },
      'opportunity-stage': {
        component: <OpportunityStageList permission={permission} />,
        list: <OpportunityStageList permission={permission} />,
        view: <>View Opportunity Stage</>,
        edit: <EditOpportunityStage parentPermission={parentPermission} permission={permission} />,
        add: <CreateOpportunityStage parentPermission={parentPermission} permission={permission} />,
      },
      category: {
        component: <CatgeoryList permission={permission} />,
        list: <CatgeoryList permission={permission} />,
        view: <>View Category</>,
        edit: <EditCatgeory parentPermission={parentPermission} permission={permission} />,
        add: <CreateCatgeory parentPermission={parentPermission} permission={permission} />,
      },
      'sub-category': {
        component: <SubCategoryList permission={permission} />,
        list: <SubCategoryList permission={permission} />,
        view: <>View Sub Category</>,
        edit: <EditSubCategory parentPermission={parentPermission} permission={permission} />,
        add: <CreateSubCategory parentPermission={parentPermission} permission={permission} />,
      },
      brand: {
        component: <BrandList permission={permission} />,
        list: <BrandList permission={permission} />,
        view: <>View Brand</>,
        edit: <EditBrand parentPermission={parentPermission} permission={permission} />,
        add: <CreateBrand parentPermission={parentPermission} permission={permission} />,
      },
      location: {
        component: <LocationList permission={permission} />,
        list: <LocationList permission={permission} />,
        view: <>View Location</>,
        edit: <EditLocation parentPermission={parentPermission} permission={permission} />,
        add: <CreateLocation parentPermission={parentPermission} permission={permission} />,
      },
      warehouse: {
        component: <WareHouseList permission={permission} />,
        list: <WareHouseList permission={permission} />,
        view: <>View Warehouse</>,
        edit: <EditWareHouse parentPermission={parentPermission} permission={permission} />,
        add: <CreateWareHouse parentPermission={parentPermission} permission={permission} />,
      },
      bay: {
        component: <BayList permission={permission} />,
        list: <BayList permission={permission} />,
        view: <>View Bay</>,
        edit: <EditBay parentPermission={parentPermission} permission={permission} />,
        add: <CreateBay parentPermission={parentPermission} permission={permission} />,
      },
      rack: {
        component: <RackList permission={permission} />,
        list: <RackList permission={permission} />,
        view: <>View Rack</>,
        edit: <EditRack parentPermission={parentPermission} permission={permission} />,
        add: <CreateRack parentPermission={parentPermission} permission={permission} />,
      },
      stacking: {
        component: <StackingList permission={permission} />,
        list: <StackingList permission={permission} />,
        view: <>View Stacking</>,
        edit: <EditStacking parentPermission={parentPermission} permission={permission} />,
        add: <CreateStacking parentPermission={parentPermission} permission={permission} />,
      },
      uom: {
        component: <UomList permission={permission} />,
        list: <UomList permission={permission} />,
        view: <>View UOM</>,
        edit: <EditUom parentPermission={parentPermission} permission={permission} />,
        add: <CreateUom parentPermission={parentPermission} permission={permission} />,
      },
      country: {
        component: <CountryList permission={permission} />,
        list: <CountryList permission={permission} />,
        view: <>View Country</>,
        edit: <EditCountry parentPermission={parentPermission} permission={permission} />,
        add: <CreateCountry parentPermission={parentPermission} permission={permission} />,
      },
      state: {
        component: <StateList permission={permission} />,
        list: <StateList permission={permission} />,
        view: <>View State</>,
        edit: <EditState parentPermission={parentPermission} permission={permission} />,
        add: <CreateState parentPermission={parentPermission} permission={permission} />,
      },
      city: {
        component: <CityList permission={permission} />,
        list: <CityList permission={permission} />,
        view: <>View City</>,
        edit: <EditCity parentPermission={parentPermission} permission={permission} />,
        add: <CreateCity parentPermission={parentPermission} permission={permission} />,
      },
      currency: {
        component: <CurrencyList permission={permission} />,
        list: <CurrencyList permission={permission} />,
        view: <>View Currency</>,
        edit: <EditCurrency parentPermission={parentPermission} permission={permission} />,
        add: <CreateCurrency parentPermission={parentPermission} permission={permission} />,
      },
      'business-vertical': {
        component: <BusinessVerticalList permission={permission} />,
        list: <BusinessVerticalList permission={permission} />,
        view: <>View Business Vertical</>,
        edit: <EditBusinessVertical parentPermission={parentPermission} permission={permission} />,
        add: <CreateBusinessVertical parentPermission={parentPermission} permission={permission} />,
      },
      'sub-vertical': {
        component: <SubVerticalList permission={permission} />,
        list: <SubVerticalList permission={permission} />,
        view: <>View Sub Vertical</>,
        edit: <EditSubVertical parentPermission={parentPermission} permission={permission} />,
        add: <CreateSubVertical parentPermission={parentPermission} permission={permission} />,
      },
      'customer-type': {
        component: <CustomerTypeList permission={permission} />,
        list: <CustomerTypeList permission={permission} />,
        view: <>View Customer Type</>,
        edit: <EditCustomerType parentPermission={parentPermission} permission={permission} />,
        add: <CreateCustomerType parentPermission={parentPermission} permission={permission} />,
      },
      division: {
        component: <DivisionList permission={permission} />,
        list: <DivisionList permission={permission} />,
        view: <>View Division</>,
        edit: <EditDivision parentPermission={parentPermission} permission={permission} />,
        add: <CreateDivision parentPermission={parentPermission} permission={permission} />,
      },
      'product-group': {
        component: <ProductGroupList permission={permission} />,
        list: <ProductGroupList permission={permission} />,
        view: <>View Product Group</>,
        edit: <EditProductGroup parentPermission={parentPermission} permission={permission} />,
        add: <CreateProductGroup parentPermission={parentPermission} permission={permission} />,
      },
      stock: {
        component: <StockList permission={permission} />,
        list: <StockList permission={permission} />,
        view: <>View Stock</>,
        edit: <EditStock parentPermission={parentPermission} permission={permission} />,
        add: <CreateStock parentPermission={parentPermission} permission={permission} />,
      },
      'product-type': {
        component: <ProductTypeList permission={permission} />,
        list: <ProductTypeList permission={permission} />,
        view: <>View Product Type</>,
        edit: <EditProductType parentPermission={parentPermission} permission={permission} />,
        add: <CreateProductType parentPermission={parentPermission} permission={permission} />,
      },
      'tandc-template': {
        component: <TcTemplateList permission={permission} />,
        list: <TcTemplateList permission={permission} />,
        view: <>View T&C Template</>,
        edit: <EditTcTemplate parentPermission={parentPermission} permission={permission} />,
        add: <CreateTcTemplate parentPermission={parentPermission} permission={permission} />,
      },
      'delivery-terms-template': {
        component: <DeliveryTermsList permission={permission} />,
        list: <DeliveryTermsList permission={permission} />,
        view: <>View Delivery Terms Template</>,
        edit: <EditDeliveryTerms parentPermission={parentPermission} permission={permission} />,
        add: <CreateDeliveryTerms parentPermission={parentPermission} permission={permission} />,
      },
      'payment-terms-template': {
        component: <PaymentTermsList permission={permission} />,
        list: <PaymentTermsList permission={permission} />,
        view: <>View Payment Terms Template</>,
        edit: <EditPaymentTerms parentPermission={parentPermission} permission={permission} />,
        add: <CreatePaymentTerms parentPermission={parentPermission} permission={permission} />,
      },
      type: {
        component: <ListType permission={permission} />,
        list: <ListType permission={permission} />,
        edit: <EditType parentPermission={parentPermission} permission={permission} />,
        add: <CreateType parentPermission={parentPermission} permission={permission} />,
      },
      bin: {
        component: <ListBin permission={permission} />,
        list: <ListBin permission={permission} />,
        edit: <EditBin parentPermission={parentPermission} permission={permission} />,
        add: <CreateBin parentPermission={parentPermission} permission={permission} />,
      },
      shelf: {
        component: <ListShelf permission={permission} />,
        list: <ListShelf permission={permission} />,
        edit: <EditShelf parentPermission={parentPermission} permission={permission} />,
        add: <CreateShelf parentPermission={parentPermission} permission={permission} />,
      },
    },
    notification: {
      component: <>Notification</>,
      list: <>Notification</>,
    },
    'after-sales': {
      component: <>After Sales</>,
      list: <>After Sales</>,
    },
    'service-contracts': {
      component: <>Service Contracts</>,
      list: <>Service Contracts</>,
    },
    reports: {
      component: <>Reports</>,
      list: <>Reports</>,
    },
    documents: {
      component: <>Documents</>,
      list: <>Documents</>,
    },
    module: {
      component: <>Module</>,
      list: <>Module</>,
      'parent-module': {
        component: <ParentPermissionList permission={permission} />,
        list: <ParentPermissionList permission={permission} />,
        view: <>View</>,
        edit: <EditParentModule parentPermission={parentPermission} permission={permission} />,
        add: <AddParentModule parentPermission={parentPermission} permission={permission} />,
      },
      'child-module': {
        component: <ChildPermissionList permission={permission} />,
        list: <ChildPermissionList permission={permission} />,
        view: <>View</>,
        edit: <EditChildModule parentPermission={parentPermission} permission={permission} />,
        add: <AddChildModule parentPermission={parentPermission} permission={permission} />,
      },
    },
    page: {
      component: <>Page</>,
      list: <>Page</>,
      'parent-page': {
        component: <ListParentModule permission={permission} />,
        list: <ListParentModule permission={permission} />,
        view: <>View</>,
        edit: <EditParentModule parentPermission={parentPermission} permission={permission} />,
        add: <AddParentModule parentPermission={parentPermission} permission={permission} />,
      },
      'child-page': {
        component: <ListChildModule permission={permission} />,
        list: <ListChildModule permission={permission} />,
        view: <>View</>,
        edit: <EditChildModule parentPermission={parentPermission} permission={permission} />,
        add: <AddChildModule parentPermission={parentPermission} permission={permission} />,
      },
    },
    'admin-settings': {
      component: <>Admin Settings</>,
      list: <>Admin Settings</>,
      user: {
        component: <UserList permission={permission} />,
        list: <UserList permission={permission} />,
        view: <UserView permission={permission} />,
        edit: <UserEdit parentPermission={parentPermission} permission={permission} />,
        add: <UserAdd parentPermission={parentPermission} permission={permission} />,
      },
      // permission: {
      //   component: <PermissionList permission={permission} />,
      //   list: <PermissionList permission={permission} />,
      //   view: <UserView permission={permission} />,
      //   edit: <EditPermission parentPermission={parentPermission} permission={permission} />,
      //   add: <CreatePermission parentPermission={parentPermission} permission={permission} />,
      // },
      role: {
        component: <RoleList permission={permission} />,
        list: <RoleList permission={permission} />,
        edit: <RoleEdit parentPermission={parentPermission} permission={permission} />,
        add: <RoleAdd parentPermission={parentPermission} permission={permission} />,
      },
      configuration: {
        component: <ConfigurationList permission={permission} />,
        list: <ConfigurationList permission={permission} />,
        edit: <ConfigurationEdit parentPermission={parentPermission} permission={permission} />,
        add: <ConfigurationAdd parentPermission={parentPermission} permission={permission} />,
      },
      'email-template': {
        component: <RoleList permission={permission} />,
        list: <RoleList permission={permission} />,
        edit: <RoleEdit parentPermission={parentPermission} permission={permission} />,
        add: <RoleAdd parentPermission={parentPermission} permission={permission} />,
      },
    },
    supplier: {
      component: <SupplierList permission={permission} />,
      list: <SupplierList permission={permission} />,
      view: <SupplierView permission={permission} />,
      edit: <SupplierEdit parentPermission={parentPermission} permission={permission} />,
      add: <SupplierAdd parentPermission={parentPermission} permission={permission} />,
    },
  };
};

interface PropsType {
  name: EssentialType;
  options?: EssentialDataType;
  control: any;
  inputOptions: MasterInputsType;
  defaultValues?: object;
}

export const DynamicPopup: (props: PropsType) => ReactNode = ({ name, control, inputOptions, defaultValues }) => {
  const inputsValues = {
    ...inputOptions,
    defaultValues,
  };
  const inputs = useMasterInputs(inputsValues);
  const popupComponents: {
    // eslint-disable-next-line no-unused-vars
    [key in EssentialType]: ReactNode;
  } = {
    Supplier: <SupplierRequiredFields control={control} />,
    Department: undefined,
    'Department-sub': undefined,
    Designation: undefined,
    'Designation-sub': undefined,
    Location: undefined,
    Bay: undefined,
    Rack: undefined,
    Country: undefined,
    State: undefined,
    BusinessVertical: undefined,
    UserRole: undefined,
    UserRoleParent: undefined,
    UserRoleStatic: undefined,
    PaymentTerms: undefined,
    Brand: undefined,
    ProductType: undefined,
    ProductCategory: undefined,
    Type: undefined,
    Uom: undefined,
    Category: <EssentialFields control={control} dynamicinputs={inputs} />,
    Shelf: undefined,
    Product: undefined,
    SubCategory: <EssentialFields control={control} dynamicinputs={inputs} />,
    'Category-Subcategory': <EssentialFields control={control} dynamicinputs={inputs} />,
    ProductGroup: undefined,
    ProductId: undefined,
    Address: undefined,
    WarehouseLocation: undefined,
    Bin: undefined,
    ProductStatus: undefined,
    Warehouse: undefined,
    'Warehouse-filter-sku': undefined,
    'Product-filter-stockstatus': undefined,
    SKU: undefined,
    Customer: undefined,
    'WarehouseWS-wise-product': undefined,
    'Warehouse-filter-category': undefined,
    'Bin-warehouse': undefined,
    'Product-filter-supplier': undefined,
    'Product-filter-category': undefined,
    'Product-filter-brand': undefined,
    'StockInward-filter-supplier': undefined,
    'StockOutward-filter-customer': undefined,
    'Barcode-filter-category': undefined,
    'Warehouse-filter-product': undefined,
    Configuration: undefined,
    User: undefined,
    'Opportunity-opportunity-type': undefined,
    'Lead-lead-type': undefined,
    'User-sales-target': undefined,
    'Yes-no': undefined,
    'Product-weight': undefined,
    'Product-status': undefined,
    'SubVertical-BusinessVertical': undefined,
    Organization: undefined,
    'Language-preference': undefined,
    Gender: undefined,
    'Contact-contact-type': undefined,
    'Preferred-contact': undefined,
    'Organization-filter-subvertical': undefined,
    'Organization-filter-businessvertical': undefined,
    'Organization-filter-paymentterms': undefined,
    'Lead-filter-leadstatus': undefined,
    'Lead-filter-contacttype': undefined,
    'Lead-filter-customer': undefined,
    'Lead-filter-salesperson': undefined,
    'Quotation-filter-saleperson': undefined,
    'Quotation-filter-status': undefined,
    'Quotation-filter-leadtype': undefined,
    'Quotation-filter-customer': undefined,
    'Opportunity-filter-customer': undefined,
    'Opportunity-filter-salesperson': undefined,
    'Opportunity-filter-leadSource': undefined,
    'Opportunity-filter-opportunitystages': undefined,
    'Opportunity-filter-opportunitystatus': undefined,
    'Loan-filter-status': undefined,
    'Loan-filter-saleperson': undefined,
    'Loan-filter-customer': undefined,
    months: undefined,
    Quotation: undefined,
    'Deals-filter-customer': undefined,
    'Deals-filter-salesperson': undefined,
    'Deals-filter-contacttype': undefined,
    PaymentMode: undefined,
    'SaleOrder-filter-customer': undefined,
    'SaleOrder-filter-saleorderstatus': undefined,
    'BlanketOrder-filter-blanketorderstatus': undefined,
    'BlanketOrder-filter-customer': undefined,
    Loan: undefined,
    Sale: undefined,
    Blanket: undefined,
    TransportMode: undefined,
    SalesInvoice: undefined,
    SalesInvoiceProduct: undefined,
  };
  return popupComponents[name];
};

export const PriceComponents = () => <IconWrapper py={0}>{PROJECT_CONSTANTS.DOLLER}</IconWrapper>;
export const PercentsignComponent = () => <IconWrapper>{PROJECT_CONSTANTS.Percentsign}</IconWrapper>;
