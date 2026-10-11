export interface IDenomination {
  d500: number;
  d200: number;
  d100: number;
  d50: number;
  d20: number;
  d10: number;
  c10: number;
  c5: number;
  c2: number;
  c1: number;
}

export interface IShiftEarning {
  counterNumber: number;
  shiftNumber: number;
  shiftTiming: string;
  operatorName: string;
  operatorId: string;

  // Paper QR Sales
  qrSaleCountTom: number;
  qrSaleAmtTom: number;
  qrSaleCountTvm: number;
  qrSaleAmtTvm: number;
  paidExitCount: number;
  paidExitAmt: number;
  qrRefundCount: number;
  qrRefundAmt: number;
  qrCancelCount: number;
  qrCancelAmt: number;

  // CSC Smart Card Sales & Refunds
  cscSaleSV2: number;
  cscSaleSV1: number;
  cscSaleAmt: number;
  cscAddValueCountTom: number;
  cscAddValueAmtTom: number;
  cscAddValueCountTvm: number;
  cscAddValueAmtTvm: number;
  ncmcAddValueCountTom: number;
  ncmcAddValueAmtTom: number;
  ncmcAddValueCountTvm: number;
  ncmcAddValueAmtTvm: number;
  cscRefundCount: number;
  cscRefundAmt: number;

  // Surcharges
  surchargeCashCount: number;
  surchargeCashAmt: number;
  surchargePurseCount: number;
  surchargePurseAmt: number;
  surCashNcmcCount: number;
  surCashNcmcAmt: number;
  surPurseNcmcCount:number
  surPurseNcmcAmt:number


  // Cashless & Adjustments (After Total AFC Earning)
  hdfcPos: number;
  upiTom: number;
  upiTvm: number;
  outSourceEarning: number;
  okUrcCount: number;
  okUrcAmt: number;
  okMrCount: number;
  okMrAmt: number;
  penaltyCashCount:number
  penaltyCashAmt:number
  penaltyHhtCount:number
  penaltyHhtAmt:number
  penaltyPurseCount:number
  penaltyPurseAmt:number
  miscEarning:number
  eib:number;

  totalAfcEarning: number;
  totalEarning:number,
  totalCashDepositedByOperator:number

  osAfc:number
  osMisc:number
  osTVM:number

  osAfcPaid:number
  osMiscPaid:number
  osTVMPaid:number

}

export interface SubCategory {
  label: string;
  hasQtyAndAmt: boolean; // If true, creates Qty + Amt columns
  qtyKey?: keyof IShiftEarning;
  amtKey?: keyof IShiftEarning;
  singleKey?: keyof IShiftEarning; // For standalone single columns
  width?: string;
}

export interface MainCategory {
  categoryLabel: string;
  bgClass: string;
  subCategories: SubCategory[];
}

export const dynamicHeaderConfig: MainCategory[] = [
  {
    categoryLabel: 'Paper QR Sales',
    bgClass: 'bg-emerald-700',
    subCategories: [
      { label: 'Paper QR (TOM)', hasQtyAndAmt: true, qtyKey: 'qrSaleCountTom', amtKey: 'qrSaleAmtTom' },
      { label: 'Paper QR (TVM)', hasQtyAndAmt: true, qtyKey: 'qrSaleCountTvm', amtKey: 'qrSaleAmtTvm' },
      { label: 'Paid Exit', hasQtyAndAmt: true, qtyKey: 'paidExitCount', amtKey: 'paidExitAmt' },
      { label: 'Refund', hasQtyAndAmt: true, qtyKey: 'qrRefundCount', amtKey: 'qrRefundAmt' },
      { label: 'Cancel', hasQtyAndAmt: true, qtyKey: 'qrCancelCount', amtKey: 'qrCancelAmt' },
    ],
  },
  {
    categoryLabel: 'CSC Smart Card Sales',
    bgClass: 'bg-teal-700',
    subCategories: [
      { label: 'SV-2 Qty', hasQtyAndAmt: false, singleKey: 'cscSaleSV2', width: 'w-12' },
      { label: 'SV-1 Qty', hasQtyAndAmt: false, singleKey: 'cscSaleSV1', width: 'w-12' },
      { label: 'CSC Amt', hasQtyAndAmt: false, singleKey: 'cscSaleAmt', width: 'w-16' },
      { label: 'Add Value (TOM)', hasQtyAndAmt: true, qtyKey: 'cscAddValueCountTom', amtKey: 'cscAddValueAmtTom' },
      { label: 'Add Value (TVM)', hasQtyAndAmt: true, qtyKey: 'cscAddValueCountTvm', amtKey: 'cscAddValueAmtTvm' },
      { label: 'NCMC Top-up (TOM)', hasQtyAndAmt: true, qtyKey: 'ncmcAddValueCountTom', amtKey: 'ncmcAddValueAmtTom' },
      { label: 'NCMC Top-up (TVM)', hasQtyAndAmt: true, qtyKey: 'ncmcAddValueCountTvm', amtKey: 'ncmcAddValueAmtTvm' },
      { label: 'CSC Refund', hasQtyAndAmt: true, qtyKey: 'cscRefundCount', amtKey: 'cscRefundAmt' },
    ],
  },
  {
    categoryLabel: 'Surcharges',
    bgClass: 'bg-red-700',
    subCategories: [
      { label: 'Cash Surcharge', hasQtyAndAmt: true, qtyKey: 'surchargeCashCount', amtKey: 'surchargeCashAmt' },
      { label: 'Purse Surcharge', hasQtyAndAmt: true, qtyKey: 'surchargePurseCount', amtKey: 'surchargePurseAmt' },
      { label: 'NCMC Surcharge (Cash/Cashless)', hasQtyAndAmt: true, qtyKey: 'surCashNcmcCount', amtKey: 'surCashNcmcAmt' },
      { label: 'NCMC Surcharge (Purse)', hasQtyAndAmt: true, qtyKey: 'surPurseNcmcCount', amtKey: 'surPurseNcmcAmt' },
    ],
  },
];

export const postAfcCategories: MainCategory[] = [
  {
    categoryLabel: 'Manual Refund and Penalty',
    bgClass: 'bg-purple-700',
    subCategories: [
      {label:'EIB', hasQtyAndAmt:false,singleKey:'eib',width:'w-16'},
      {label:'OK URC Refund', hasQtyAndAmt:true,qtyKey:'okUrcCount',amtKey:'okUrcAmt',width:'w-16'},
      {label:'OK MR Refund', hasQtyAndAmt:true,qtyKey:'okMrCount',amtKey:'okMrAmt',width:'w-16'},
      {label:'PENALTY BY CASH', hasQtyAndAmt:true,qtyKey:'penaltyCashCount',amtKey:'penaltyCashAmt',width:'w-16'},
      {label:'PENALTY BY HHT', hasQtyAndAmt:true,qtyKey:'penaltyHhtCount',amtKey:'penaltyHhtAmt',width:'w-16'},
      {label:'PENALTY BY PURSE', hasQtyAndAmt:true,qtyKey:'penaltyHhtCount',amtKey:'penaltyHhtAmt',width:'w-16'},
      { label: 'Misc Earning', hasQtyAndAmt: false, singleKey: 'miscEarning', width: 'w-16' },
      
      
      
    ],
  },
];

export const postTotalEarningCategory : MainCategory[] =[
  {
    categoryLabel: 'Cash less Earning',
    bgClass: 'bg-green-200',
    subCategories: [
      { label: 'HDFC POS', hasQtyAndAmt: false, singleKey: 'hdfcPos', width: 'w-16' },
      { label: 'UPI at TOM', hasQtyAndAmt: false, singleKey: 'upiTom', width: 'w-16' },
      { label: 'UPI at TVM', hasQtyAndAmt: false, singleKey: 'upiTvm', width: 'w-16' },
      
      { label: 'Outsource', hasQtyAndAmt: false, singleKey: 'outSourceEarning', width: 'w-16' },
      
 
  ]
}
]