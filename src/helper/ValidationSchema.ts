/* eslint-disable max-lines */
import * as yup from 'yup';

import { OptionsType } from './types/GlobalTypes';
import { PROJECT_CONSTANTS } from './GlobalHelper';
import { BreakUpItems } from './types/sales-crm-system/BlanketOrderTypes';
import { SalesReturnItem } from './types/sales-crm-system/SalesReturnTypes';
import { validateSizeImage, validationValidteImage } from './imagevalidation';
import { StockBSRBDetails } from './types/inventory-management/StockInwardType';
// import { ProductQtySplit } from './types/inventory-management/StockInwardType';

// import { validateSizeImage, validationValidteImage } from './imagevalidation';

export const emailRegExp = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z^\s]{2,})+$/;
export const mobileRegExp = /^(\d{3}-\d{3}-\d{4}|\d{10})$/;
export const websiteRegExp = /((https?):\/\/)?(www.)?[a-z0-9]+(\.[a-z]{2,}){1,3}(#?\/?[a-zA-Z0-9#]+)*\/?(\?[a-zA-Z0-9-_]+=[a-zA-Z0-9-%]+&?)?$/;
export const nameReqExp = /^[a-zA-Z ]+$/;

// CommonShema
const customStringSchema = (label?: string) =>
  yup
    .string()
    .typeError(label ? label + ' is required' : 'Required')
    .required(label ? label + ' is required' : 'Required');
// .trim()
// .strict()
const customNumberSchema = (label?: string) =>
  yup
    .number()
    .typeError(label ? label + ' is required' : 'Required')
    .required(label ? label + ' is required' : 'Required');
const customOptionSchema = (label?: string) =>
  yup
    .object()
    .typeError(label ? label + ' is required' : 'Required')
    .required(label ? label + ' is required' : 'Required');
// const customQuantitySchema = (label?: string) =>
//   yup
//     .number()
//     .min(1, 'Quantity must be at least 1')
//     .required(label ? label + ' is required' : 'Required')
//     .typeError(label ? label + ' is required' : 'Required');
const customEmailSchema = (label?: string) => customStringSchema(label).matches(emailRegExp, 'Please enter valid email');
const customMobileSchema = (label?: string) => customStringSchema(label).matches(mobileRegExp, 'Invalid Number format');
const customWebSiteSchema = (label?: string) => customStringSchema(label).matches(websiteRegExp, 'Enter valid website');
const customNameSchema = (label?: string) => customStringSchema(label).matches(nameReqExp, 'Only alphabetic characters allowed');
const customCommentSchema = (label?: string) =>
  customStringSchema(label).max(
    PROJECT_CONSTANTS.TextAreaMaxCount,
    (label ? label : 'Word') + ' should be less than ' + PROJECT_CONSTANTS.TextAreaMaxCount + 'character'
  );

// -----------------------------------------------------------------------------
const loginSchema = yup.object().shape({
  email: customEmailSchema('Email'),
  password: customStringSchema('Password'),
});
const masterFormTypeOneSchema = (name?: string) =>
  yup.object().shape({
    name: customStringSchema(name + ' Name'),
    code: customStringSchema(name + ' Code'),
    status: yup.boolean().required('Required'),
  });

const masterFormTypeTwoSchema = (name?: string) =>
  yup.object().shape({
    name: customStringSchema(name + ' Name'),
    status: yup.boolean().required('Required'),
  });

const masterFormSchemaThree = (dynamicKey: string, dynamicName?: string, label?: string) =>
  yup.object().shape({
    name: customStringSchema(label + ' Name'),
    code: customStringSchema(label + ' Code'),
    [dynamicKey]: customOptionSchema(dynamicName),
    status: yup.boolean().required('Required'),
  });

const masterFormThreeSchema = yup.object().shape({
  name: customStringSchema('Customer Group Name'),
  code: customStringSchema('Customer Group Code'),
  slab: customStringSchema('Discount Slab'),
  status: yup.boolean().required('Required'),
});
const masterFormWarehouseSchema = yup.object().shape({
  name: customStringSchema('WareHouse Name'),
  code: customStringSchema('WareHouse Code'),
  location_id: customOptionSchema('WareHouse Location'),
  address: customStringSchema('WareHouse Address'),
  status: yup.boolean().required('Required'),
});

const masterFormCurrencySchema = yup.object().shape({
  name: customStringSchema('Currency Name'),
  code: customStringSchema('Currency Code'),
  symbol: customStringSchema('Currency Symbol'),
  status: yup.boolean().required('Required'),
});
const masterFormStockSchema = yup.object().shape({
  product_id: customStringSchema('Product Name'),
  date: yup.string().required('Stock Date'),
  quantity: customStringSchema('Quantity'),
  status: yup.boolean().required('Required'),
});
const masterFormTemplatechema = yup.object().shape({
  name: customStringSchema('Template Name'),
  status: yup.boolean().required('Required'),
  description: customCommentSchema('Description'),
});

const masterImageFormSchema = yup.object().shape({
  name: customStringSchema('Brand Name'),
  code: customStringSchema('Brand Code'),
  brand_logo: yup
    .mixed()
    .required('Image is required')
    .test('required-if', 'Image is required', function (value) {
      return value === '' ? false : true;
    })
    .test('required-one', 'Not a valid image type', function (value) {
      return validationValidteImage(value as string | object);
    })
    .test('required-two', 'Image Upto 2Mb ', function (value) {
      return validateSizeImage(value as string | object);
    }),
  // .test('required-if', `The Image  needs to be the ${imgDimensions.width} x ${imgDimensions.height}`, function (value) {
  //     return validateImageDimensions(value as Blob | MediaSource);
  // }),
  // .imageDimensionCheck('test', 1988, 3056),
  status: yup.boolean().required('Required'),
});

//Admin settings
const adminFormUsersSchema = yup.object().shape({
  code: customStringSchema('User ID'),
  name: customNameSchema('Name'),
  email: customStringSchema('Email'),
  password: customStringSchema('Password').min(8).max(32),
  confirm_password: customStringSchema('Confirm password').oneOf([yup.ref('password'), ''], 'Confirm password field must match New password'),
  department_id: customOptionSchema('Department Name'),
  designation_id: customOptionSchema('Designation Name'),
  status: yup.boolean().required('Required'),
  sales_target: customOptionSchema('Sales Target Name'),
  role_id: customOptionSchema('Roles Name').typeError('Roles Name'),
});

const adminFormConfigurationSchema = yup.object().shape({
  type_id: customOptionSchema('Type'),
  text: customStringSchema('Prefix Text'),
});

const adminFormRoleSchema = yup.object().shape({
  code: customNumberSchema('Role ID'),
  name: customStringSchema('Name'),
});

//modules
const modulesChildSchema = yup.object().shape({
  name: customStringSchema('Name'),
  // parent_id: yup.object().required('Rack Name is required'),
});

//supplier
const supplierFormSchema = yup.object().shape({
  code: customNumberSchema('Supplier code'),
  name: customStringSchema('Name'),
  contact_person: customStringSchema('Contact Preson'),
  brand_id: yup.object().required('Brand'),
  address: customStringSchema('Address'),
  contact_number: customMobileSchema('Contact no'),
  email: customStringSchema('Email'),
  payment_terms_id: yup.object().required('Payment Terms'),
  products_deals_with: customStringSchema('Products Deals with'),
  website: customWebSiteSchema('Website'),
});

// Product
//supplier
const productFormSchema = yup.object().shape({
  productName: customStringSchema('Product Name'),
  productCode: customStringSchema('Product Code'),
  // productImages: yup
  //   .array()
  //   .typeError('required')
  //   .of(
  //     yup
  //       .mixed()
  //       .test('required-one', 'Not a valid image type', function (value) {
  //         return validationValidteImage(value as string | object);
  //       })
  //       .test('required-two', 'Image Upto 2Mb ', function (value) {
  //         return validateSizeImage(value as string | object);
  //       })
  //   ),
  SKU: customStringSchema('SKU'),
  description: customStringSchema('Description'),
  productType: customOptionSchema('Product Type'),
  type: customOptionSchema('Required').required('Type'),
  UOM: customOptionSchema('Required').required('Unit'),
  newItemNumber: customStringSchema('New Item Number'),
  oldItemNumber: customStringSchema('Old Item Number'),
  alternativeItemNumber: customStringSchema('Alternative Item Number'),
  DuplicateItemCode: customStringSchema('Duplicate Item Code'),
  dimension: yup.object().shape({
    L: customNumberSchema('required'),
    B: customNumberSchema('required'),
    H: customNumberSchema('required'),
  }),
  weight: yup.object().shape({
    weight: customNumberSchema('Weight'),
    unit: yup.string().notRequired(),
  }),
  itemCategoryCode: customOptionSchema('Item Category Code'),
  productGroupCode: customOptionSchema('Product Group Code'),
  fixedCommissionPercentage: customNumberSchema('Fixed Commission Percentage'),
  shelfNumber: customOptionSchema('Shelf Number'),
  QuantityOnSalesOrder: customStringSchema('Quantity On Sales Order'),
  inventory: customStringSchema('Inventory'),
  stockoutWarning: customOptionSchema('Stockout Warning'),
  brand: customOptionSchema('Brand'),
  unitVolume: customStringSchema('Unit Volume Warning'),
  quantityOnPunchOrder: customNumberSchema('Quantity On Punch Order'),
  minimumOrderQuantity: customNumberSchema('Minimum Order Quantity'),
  supplier: customOptionSchema('Supplier'),
  productCategory: customOptionSchema('Category'),
  manufacturer: customStringSchema('Manufacturer'),
  // quantityInStock: customNumberSchema('Quantity in Stock required').required('Quantity in Stock required'),
  productStatus: customOptionSchema('Product Status'),
  salesUOM: customOptionSchema('Sales UOM'),
  costPrice: customNumberSchema('Cost Price required'),
  sellingPrice: customNumberSchema('Selling Price required'),
  taxPercentage: customNumberSchema('Tax Percentage required'),
  sellingPriceAfterDiscount: customNumberSchema('Selling Price After Discount'),
});
const barcodeFormSchema = yup.object().shape({
  productId: customOptionSchema('Product'),
  productName: customStringSchema('Product Name'),
  // categoryId: customOptionSchema('Category'),
  // subcategoryId: customOptionSchema('Sub Category'),
  // productCode: customStringSchema('Product Code'),
  // sku: customStringSchema('SKU'),
  barcode: customStringSchema('Barcode'),
  quantity: customStringSchema('No of Quantity'),
});
const stockInwardFormSchema = yup.object().shape({
  stockInwardNumber: customStringSchema('Stock Number'),
  stockInwardDate: customStringSchema('Stock Date'),
  supplierId: customOptionSchema('Supplier'),
  modeOfTransfer: customOptionSchema('Mode of Transfer'),
  warehouseId: customOptionSchema('Warehouse'),
  purpose: customCommentSchema('Purpose'),
  stockInwardItems: yup.array().of(
    yup.object().shape({
      productId: customOptionSchema('Product'),
      categoryId: customOptionSchema('Category'),
      subCategoryId: customOptionSchema('Sub Category'),
      hsnCode: customStringSchema('HSN'),
      sku: customStringSchema('SKU'),
      existingQuantity: customStringSchema('Existing Quantity'),
      inwardQuantity: customNumberSchema('QTY').min(0, 'Quantity must be greater than or equal to 0'),
      // totalQuantity: customStringSchema('QTY'),
      addedStockTotalQuantity: customNumberSchema('Total Quantity'),
      addedQuantity: customNumberSchema('Added Quantity'),
      // quantity: yup.number().min(1, 'Quantity must be at least 1').required('Quantity'),
      // uom: yup.number().min(1, 'UOM must be at least 1').required('UOM'),
      rate: customStringSchema('Rate'),
      subTotal: customStringSchema('SubTotal'),
      discount: customStringSchema('Discount'),
      tax: customStringSchema('Tax'),
      total: customStringSchema('Total'),
    })
  ),
});
const stockInwardUpdateQuantitySchema = yup.object().shape({
  quantity: customNumberSchema('Quantity').min(0, 'Exceeds available stock quantity'),
  productQtySplit: yup.array().of(
    yup.object().shape({
      bayId: customOptionSchema('Bay ID'),
      rackId: customOptionSchema('Rack ID'),
      shelvesId: customOptionSchema('Shelves ID'),
      binId: customOptionSchema('Bin ID'),
      // addQuantity: yup
      //   .number()
      //   .required('Required')
      //   .typeError('Required')
      //   .test('check-available-quantity', 'Quantity must not be greater then avaliable quantity', function (value) {
      //     if (value) {
      //       const { totalQuantity = 0, productQtySplit = [{ addQuantity: 0 }] } = this.from?.[1].value as never;
      //       const total = parseFloat(productQtySplit.reduce((partialSum, a) => partialSum + a.addQuantity, 0) as unknown as string);
      //       return total <= totalQuantity;
      //     } else {
      //       return true;
      //     }
      //   }),
    })
  ),
});

// .max(200, 'Added Quantity cannot exceed Existing Quantity')
const stockInwardSplitQuantitySchema = yup.object().shape({
  quantity: customNumberSchema('Quantity').min(0, 'Exceeds available stock quantity'),
  productQtySplit: yup.array().of(
    yup.object().shape({
      warehouseId: customOptionSchema('Warehouse'),
      warehouseIdData: yup.array().of(
        yup.object().shape({
          bayId: customOptionSchema('Bay ID'),
          rackId: customOptionSchema('Rack ID'),
          shelvesId: customOptionSchema('Shelves ID'),
          binId: customOptionSchema('Bin ID'),
        })
      ),
    })
  ),
  tempQuantity: customNumberSchema().test('not-same-as-quantity', 'Total Not Equal to Quantity', function (value) {
    return value === 0;
  }),
});
const stockOutwardUpdateQuantitySchema = yup.object().shape({
  productQtySplit: yup.array().of(
    yup.object().shape({
      warehouseId: customOptionSchema('Warehouse'),
      warehouseIdData: yup.array().of(
        yup.object().shape({
          bayId: customOptionSchema('Bay ID'),
          rackId: customOptionSchema('Rack ID'),
          shelvesId: customOptionSchema('Shelves ID'),
          binId: customOptionSchema('Bin ID'),
          withdrawQuantity: customNumberSchema().test('check-available-quantity', 'Exceed from avaiable qty', function (value) {
            if (value) {
              const total = this?.parent?.maximumQuantity || 0;
              return total >= value;
            } else {
              return true;
            }
          }),
        })
      ),
    })
  ),
  outwardQuantity: customNumberSchema().test('not-same-as-quantity', 'Total Not Equal to Quantity', function (value) {
    const WQty = (this.parent.productQtySplit as StockBSRBDetails[]).reduce(
      (sum, breakUp) => sum + (breakUp?.warehouseIdQuantity ? breakUp?.warehouseIdQuantity : 0),
      0
    );
    return value >= WQty;
  }),
});

const stockOutwardFormSchema = yup.object().shape({
  stockOutwardNumber: customStringSchema('Stock Number'),
  stockOutwardDate: customStringSchema('Stock Date'),
  // customerId: customOptionSchema('Customer'),
  // modeOfTransfer: customOptionSchema('Mode of Transfer'),
  // warehouseId: customOptionSchema('Warehouse'),
  purpose: customCommentSchema('Purpose'),
  stockOutwardItems: yup.array().of(
    yup.object().shape({
      withdrawQuantity: customNumberSchema('Quantity').min(1, 'Quantity Must be more than Add Qty'),
      // warehouseId: customOptionSchema('Warehouse'),
    })
  ),
});

const warehousewiseFormSchema = yup.object().shape({
  warehouseId: customOptionSchema('Warehouse Location'),
  warehouseWSItems: yup.array().of(
    yup.object().shape({
      productId: customOptionSchema('Product'),
      bayId: customOptionSchema('Bay ID'),
      rackId: customOptionSchema('Rack ID'),
      shelvesId: customOptionSchema('Shelves ID'),
      binId: customOptionSchema('Bin ID'),
      quantity: customNumberSchema('Quantity').min(1, 'Quantity must be at least 1'),
    })
  ),
});

const purchaseorderFormSchema = yup.object().shape({
  poNumber: customStringSchema('PO No'),
  poDate: customStringSchema('PO date'),
  supplier: customOptionSchema('Supplier Name'),
  paymentTerms: customOptionSchema('Payment Terms'),
  purchaseOrderItems: yup.array().of(
    yup.object().shape({
      productId: customOptionSchema('Product'),
      SKU: customStringSchema('SKU'),
      quantity: customNumberSchema('Quantity').min(1, 'Quantity must be at least 1'),
    })
  ),
});
const vendorPaymentFormSchema = yup.object().shape({
  poNumber: customStringSchema('PO No'),
  poDate: customStringSchema('PO date'),
  supplier: customOptionSchema('Supplier Name'),
  totalAmount: customNumberSchema('Total Amount'),
  totalProduct: customNumberSchema('Total Product'),
  totalPaid: customNumberSchema('Total Paid'),
  pendingDue: customNumberSchema('Pending Due'),
  vendorPaymentItems: yup.array().of(
    yup.object().shape({
      paymentMode: customOptionSchema('Payment Mode'),
      transactionDate: customStringSchema('Transaction Date'),
      transactionNo: customStringSchema('Transaction No'),
      totalAmount: customNumberSchema('Total Amount'),
    })
  ),
});
const customerPaymentFormSchema = yup.object().shape({
  salesInvoiceNo: customStringSchema('PO No'),
  salesInvoiceDate: customStringSchema('PO dtae'),
  customerId: customOptionSchema('Supplier Name'),
  totalAmount: customNumberSchema('Total Amount'),
  totalProduct: customNumberSchema('Total Product'),
  totalPaid: customNumberSchema('Total Paid'),
  pendingDue: customNumberSchema('Pending Due'),
  beneficiaryName: customStringSchema('Beneficiary Name'),
  beneficiaryAccountNo: customStringSchema('Beneficiary Account No'),
  beneficiaryBankName: customStringSchema('Beneficiary Bank Name'),
  beneficiaryIFSCCode: customStringSchema('Beneficiary IFSC Code'),
  customerPaymentItems: yup.array().of(
    yup.object().shape({
      paymentMode: customOptionSchema('Payment Mode'),
      accountNumber: customStringSchema('Account Number'),
      bankName: customStringSchema('Bank Name'),
      branch: customStringSchema('Branch'),
      IFSCCode: customStringSchema('IFSC Code'),
      transactionDate: customStringSchema('Transaction Date'),
      transactionNo: customStringSchema('Transaction No'),
      totalAmount: customNumberSchema('Total Amount'),
    })
  ),
});
const leadFormSchema = yup.object().shape({
  leadDate: customStringSchema('Lead date'),
  leadNumber: customStringSchema('Lead No'),
  existingCustomer: customOptionSchema('Existing Customer'),
  notes: customCommentSchema('Notes'),
  referralSource: customOptionSchema('ReferralSource'),
  customerId: customOptionSchema('Customer'),
  leadType: customOptionSchema('Lead Type'),
  salePersonId: customOptionSchema('Sales Person'),
  leadItems: yup.array().of(
    yup.object().shape({
      productId: customOptionSchema('Product'),
      quantity: customNumberSchema('Quantity').min(1, 'Quantity must be at least 1'),
    })
  ),
});

const salesReturnFormSchema = yup.object().shape({
  returnNo: customStringSchema('Return number'),
  returnDate: customStringSchema('Return Date'),
  salesInvoiceId: customOptionSchema('Sales Invoice Id'),
  returnReason: customStringSchema('Return Reason'),
  returnStatus: customStringSchema('Return Status'),
  remarks: customCommentSchema('remarks'),

  salesReturnItems: yup.array().of(
    yup.object().shape({
      productId: customOptionSchema('Product'),
      quantity: customNumberSchema('Quantity').min(1, 'Quantity must be at least 1'),
      returnQuantity: yup.number().test('is-test-requied', 'Sum of Return & Damage Qty', function (returnQuantity = 0) {
        const parent = this?.parent as SalesReturnItem;
        const quantity = parent?.quantity || 0;
        const damagedQuantity = parent?.damagedQuantity || 0;
        return damagedQuantity + returnQuantity <= quantity;
      }),
    })
  ),
});

const salesInvoiceSchema = yup.object().shape({
  service: customStringSchema('Service'),
  salesInvoiceDate: customStringSchema('Sales Invoice Date'),
  transportMode: customStringSchema('Transport Mode'),
  vehicleNumber: customStringSchema('Vehicle Number'),
  termOfPayment: yup.object().typeError('Terms of payment is required').required('Terms of payment is required'),
  // notes: customStringSchema('Notes').max(
  //   PROJECT_CONSTANTS.TextAreaMaxCount,
  //   'Notes should be less than ' + PROJECT_CONSTANTS.TextAreaMaxCount + 'character'
  // ),
  // referralSource: yup.object().typeError('ReferralSource is required').required('ReferralSource is required'),
  // customerId: yup.object().typeError('Customer is required').required('Customer is required'),
  // leadType: yup.object().typeError('Lead Type is required').required('Lead Type is required'),
  // salePersonId: yup.object().typeError('Sales Person is required').required('Sales Person is required'),
  // leadItems: yup.array().of(
  //   yup.object().shape({
  //     productId: customOptionSchema('Product'),
  //     quantity: yup.number().min(1, 'Quantity must be at least 1').required('Quantity is required').typeError('Quantity is required'),
  //   })
  // ),
});
const blanketItemSchema = yup.object().shape({
  productId: customOptionSchema('Product'),
  month: customOptionSchema('Month'),
  quantity: customNumberSchema().min(1, 'Quantity must be at least 1'),
  frequency: customNumberSchema().min(1, 'Frequency must be at least 1'),
  monthWiseQuantity: customNumberSchema().min(1, 'Quantity must be at least 1'),
  deliverySlot: customNumberSchema().min(1, 'DeliverySlot must be at least 1'),
  rate: customNumberSchema('Rate'),
  subTotal: customNumberSchema('SubTotal'),
  discount: customNumberSchema('Discount'),
  tax: customNumberSchema('Tax'),
  total: customNumberSchema('Total'),
});
const loanItemSchema = yup.object().shape({
  productId: customOptionSchema('Product'),
  quantity: customNumberSchema('Quantity').min(1, 'Quantity must be at least 1'),
  rate: customNumberSchema('Rate'),
  subTotal: customNumberSchema('SubTotal'),
  commission: customNumberSchema('Commission'),
  total: customNumberSchema('Total'),
});
const saleOrderItemSchema = yup.object().shape({
  productId: customOptionSchema('Product'),
  quantity: customNumberSchema('Quantity').min(1, 'Quantity must be at least 1'),
  rate: customNumberSchema('Rate'),
  subTotal: customNumberSchema('SubTotal'),
  discount: customNumberSchema('Discount'),
  tax: customNumberSchema('Tax'),
  total: customNumberSchema('Total'),
});

const quotationFormSchema = yup.object().shape({
  quotationDate: customStringSchema('Quotation date'),
  deliveryDate: customStringSchema('Delivery date'),
  generateQuotationBy: customStringSchema('Generate Quotation By'),
  quotationItems: yup.array().of(
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    yup.lazy((_value, parent: any) => {
      const leadType = parent?.from?.[0]?.value.leadType?.label;
      switch (leadType) {
        case 'Blanket':
          return blanketItemSchema;
        case 'Loan':
          return loanItemSchema;
        default:
          return saleOrderItemSchema;
      }
    })
  ),
});

const loanFormSchema = yup.object().shape({
  loanNumber: customStringSchema('Loan Number'),
  purpose: customStringSchema('Purpose'),
  remarks: customStringSchema('Remarks'),
  location: customStringSchema('Location'),
  loanDate: customStringSchema('Loan date'),
  dateOfReturn: customStringSchema('Return Date of required'),
  customerId: customOptionSchema('Customer Name'),
  salePersonId: customOptionSchema('Employee Name'),
  loanItem: yup.array().of(loanItemSchema),
});

const saleOrderFormSchema = yup.object().shape({
  saleOrderDate: customStringSchema('Sale Order Date'),
  quotationDate: customStringSchema('Quotation Date'),
  saleInvoiceCommitmentDate: customStringSchema('Sale Invoice Commitment Date'),
  saleItem: yup.array().of(saleOrderItemSchema),
});

const blanketOrderSchema = yup.object().shape({
  location: customStringSchema('Location'),
  shippingAddress: customStringSchema('Shipping Address'),
  billingAddress: customStringSchema('Billing Address'),
  quotationDate: customStringSchema('Quotation Date'),
  blanketOrderDate: customStringSchema('Blanket Order'),
  deliveryDate: customStringSchema('Delivery date'),
  paymentMode: customOptionSchema('Payment Mode'),
  blanketOrderItems: yup.array().of(blanketItemSchema),
});

const contactFormSchema = yup.object().shape({
  contactType: customOptionSchema('Contact Type'),
  password: customStringSchema('Password'),
  address: customStringSchema('Address'),
  // alternativeContact: customStringSchema('Alternative Contact'),
  company: yup.mixed().when(['contactType'], {
    is: (contactType: OptionsType) => !!(contactType?.label === 'Business'),
    then: () => customOptionSchema('Company'),
    otherwise: () => yup.mixed().notRequired(),
  }),
  comments: customStringSchema('Comments'),

  customerName: customNameSchema('Customer Name'),
  customerPhoto: yup
    .mixed()
    .required('Image is required')
    .test('required-if', 'Image is required', function (value) {
      return value === '' ? false : true;
    })
    .test('required-one', 'Not a valid image type', function (value) {
      return validationValidteImage(value as string | object);
    })
    .test('required-two', 'Image Upto 2Mb ', function (value) {
      return validateSizeImage(value as string | object);
    }),
  designation: customStringSchema('Designation'),
  email: customEmailSchema('Email'),
  gender: customOptionSchema('Gender'),
  languagePreference: customOptionSchema('Languagepreference'),
  mobile: customMobileSchema('Mobile'),
  preferredContactMethod: customOptionSchema('Preferred Contact Method'),
  alternativeMobileNumber: customMobileSchema('Alternative Mobile Number').test(
    'not-same-as-mobile',
    'The same mobile number cannot be used',
    function (value) {
      return value !== this.parent.mobile;
    }
  ),
  // website: yup.string().required('Website is required'),
  // company: yup.string().required('Company is required'),
});
const organizationFormSchema = yup.object().shape({
  address: customStringSchema('Address'),
  businessType: customOptionSchema('BusinessType'),
  contact: customMobileSchema('Contact'),
  email: customEmailSchema('Email'),
  fax: customMobileSchema('Fax'),
  organizationName: customNameSchema('Organization Name'),
  paymentTermsId: customOptionSchema('PaymentTerms'),
  verticalTypeId: customOptionSchema('VerticalType'),
  website: customWebSiteSchema('Website'),
});
const opportunityFormSchema = yup.object().shape({
  customerId: customOptionSchema('Customer'),
  opportunityDate: customStringSchema('Opportunity Date'),
  opportunityType: customOptionSchema('Opportunity Type'),
  salePersonId: customOptionSchema('SalePerson'),
  leadType: customOptionSchema('Lead Type'),
  opportunityItems: yup.array().of(
    yup.object().shape({
      productId: customOptionSchema('Product'),
      quantity: customNumberSchema('Quantity').min(1, 'Quantity must be at least 1'),
    })
  ),
});
const breakUpFormSchema = yup.object().shape({
  breakUps: yup.array().of(
    yup.object().shape({
      quantity: customNumberSchema(),
    })
  ),
  maximumQuantity: customNumberSchema().test('not-same-as-quantity', 'Total Not Equal to Quantity', function (value) {
    return value === (this.parent.breakUps as BreakUpItems[]).reduce((sum, breakUp) => sum + (breakUp?.quantity ? breakUp?.quantity : 0), 0);
  }),
  // maximumQuantity: yup.number().test('not-same-as-quantity', function (value) {
  //   const totalQuantity = (this.parent.breakUps as BreakUpItems[]).reduce((sum, breakUp) => sum + (breakUp?.quantity ? breakUp?.quantity : 0), 0);
  //   // Create a dynamic error message
  //   const errorMessage = `Total (${value}) does not equal the sum of quantities (${totalQuantity}).`;
  //   // Return the result of the test
  //   return value === totalQuantity || this.createError({ message: errorMessage });
  // }),
});
export {
  loginSchema,
  leadFormSchema,
  loanFormSchema,
  contactFormSchema,
  breakUpFormSchema,
  productFormSchema,
  barcodeFormSchema,
  supplierFormSchema,
  blanketOrderSchema,
  modulesChildSchema,
  salesInvoiceSchema,
  adminFormRoleSchema,
  quotationFormSchema,
  saleOrderFormSchema,
  adminFormUsersSchema,
  opportunityFormSchema,
  stockInwardFormSchema,
  masterFormThreeSchema,
  masterFormStockSchema,
  masterImageFormSchema,
  masterFormSchemaThree,
  salesReturnFormSchema,
  organizationFormSchema,
  stockOutwardFormSchema,
  vendorPaymentFormSchema,
  masterFormTypeOneSchema,
  masterFormTypeTwoSchema,
  masterFormTemplatechema,
  warehousewiseFormSchema,
  purchaseorderFormSchema,
  masterFormCurrencySchema,
  customerPaymentFormSchema,
  masterFormWarehouseSchema,
  adminFormConfigurationSchema,
  stockInwardSplitQuantitySchema,
  stockInwardUpdateQuantitySchema,
  stockOutwardUpdateQuantitySchema,
};
