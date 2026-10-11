# React + TypeScript + Vite

This template provides a minimal setup to get React working in Vite with HMR and some Oxlint rules.

Currently, two official plugins are available:

- [@vitejs/plugin-react](https://github.com/vitejs/vite-plugin-react/blob/main/packages/plugin-react) uses [Oxc](https://oxc.rs)
- [@vitejs/plugin-react-swc](https://github.com/vitejs/vite-plugin-react/blob/main/packages/plugin-react-swc) uses [SWC](https://swc.rs/)

## React Compiler

The React Compiler is not enabled on this template because of its impact on dev & build performances. To add it, see [this documentation](https://react.dev/learn/react-compiler/installation).

## Expanding the Oxlint configuration

If you are developing a production application, we recommend enabling type-aware lint rules by installing `oxlint-tsgolint` and editing `.oxlintrc.json`:

```json
{
  "$schema": "./node_modules/oxlint/configuration_schema.json",
  "plugins": ["react", "typescript", "oxc"],
  "options": {
    "typeAware": true
  },
  "rules": {
    "react/rules-of-hooks": "error",
    "react/only-export-components": ["warn", { "allowConstantExport": true }]
  }
}
```

See the [Oxlint rules documentation](https://oxc.rs/docs/guide/usage/linter/rules) for the full list of rules and categories.

```
export interface ColumnDef {
  key: keyof IShiftEarning;
  label: string;
  width: string;
  isAmount?: boolean;
}

export interface HeaderCategory {
  categoryLabel: string;
  bgClass: string;
  columns: ColumnDef[];
}

export interface IDenomination {
  d500: number; d200: number; d100: number; d50: number; d20: number; d10: number;
  c10: number; c5: number; c2: number; c1: number;
}

// Full Data Shape Interface for DMRC Shift Register
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
  cscSaleSV2: number; // Qty
  cscSaleSV1: number; // Qty
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
  surchargeNcmcCount: number;
  surchargeNcmcAmt: number;

  // Cashless & Adjustments (Placed AFTER Total AFC Earning)
  hdfcPos: number;
  upiTom: number;
  upiTvm: number;
  outSourceEarning: number;
  amtNotTaken: number;
  penalty: number;

  totalAfcEarning: number;
}

// Grouped categories BEFORE Total AFC Earning
export const tableCategories: HeaderCategory[] = [
  {
    categoryLabel: 'Paper QR Sales',
    bgClass: 'bg-emerald-700',
    columns: [
      { key: 'qrSaleCountTom', label: 'Qty', width: 'w-12' },
      { key: 'qrSaleAmtTom', label: 'Amt', width: 'w-16', isAmount: true },
      { key: 'qrSaleCountTvm', label: 'Qty', width: 'w-12' },
      { key: 'qrSaleAmtTvm', label: 'Amt', width: 'w-16', isAmount: true },
      { key: 'paidExitCount', label: 'Qty', width: 'w-12' },
      { key: 'paidExitAmt', label: 'Amt', width: 'w-16', isAmount: true },
      { key: 'qrRefundCount', label: 'Qty', width: 'w-12' },
      { key: 'qrRefundAmt', label: 'Amt', width: 'w-16', isAmount: true },
      { key: 'qrCancelCount', label: 'Qty', width: 'w-12' },
      { key: 'qrCancelAmt', label: 'Amt', width: 'w-16', isAmount: true },
    ],
  },
  {
    categoryLabel: 'CSC Smart Card Sales',
    bgClass: 'bg-teal-700',
    columns: [
      { key: 'cscSaleSV2', label: 'SV-2 Qty', width: 'w-12' },
      { key: 'cscSaleSV1', label: 'SV-1 Qty', width: 'w-12' },
      { key: 'cscSaleAmt', label: 'Amt', width: 'w-16', isAmount: true },
      { key: 'cscAddValueCountTom', label: 'Qty', width: 'w-12' },
      { key: 'cscAddValueAmtTom', label: 'Amt', width: 'w-16', isAmount: true },
      { key: 'cscAddValueCountTvm', label: 'Qty', width: 'w-12' },
      { key: 'cscAddValueAmtTvm', label: 'Amt', width: 'w-16', isAmount: true },
      { key: 'ncmcAddValueCountTom', label: 'Qty', width: 'w-12' },
      { key: 'ncmcAddValueAmtTom', label: 'Amt', width: 'w-16', isAmount: true },
      { key: 'ncmcAddValueCountTvm', label: 'Qty', width: 'w-12' },
      { key: 'ncmcAddValueAmtTvm', label: 'Amt', width: 'w-16', isAmount: true },
      { key: 'cscRefundCount', label: 'Qty', width: 'w-12' },
      { key: 'cscRefundAmt', label: 'Amt', width: 'w-16', isAmount: true },
    ],
  },
  {
    categoryLabel: 'Surcharges',
    bgClass: 'bg-red-700',
    columns: [
      { key: 'surchargeCashCount', label: 'Qty', width: 'w-12' },
      { key: 'surchargeCashAmt', label: 'Amt', width: 'w-16', isAmount: true },
      { key: 'surchargePurseCount', label: 'Qty', width: 'w-12' },
      { key: 'surchargePurseAmt', label: 'Amt', width: 'w-16', isAmount: true },
      { key: 'surchargeNcmcCount', label: 'Qty', width: 'w-12' },
      { key: 'surchargeNcmcAmt', label: 'Amt', width: 'w-16', isAmount: true },
    ],
  },
];

// Cashless & Adjustments columns that appear AFTER Total AFC Earning
export const postAfcColumns: ColumnDef[] = [
  { key: 'hdfcPos', label: 'HDFC POS', width: 'w-16', isAmount: true },
  { key: 'upiTom', label: 'UPI TOM', width: 'w-16', isAmount: true },
  { key: 'upiTvm', label: 'UPI TVM', width: 'w-16', isAmount: true },
  { key: 'outSourceEarning', label: 'Outsource', width: 'w-16', isAmount: true },
  { key: 'amtNotTaken', label: 'Amt Not Taken', width: 'w-16', isAmount: true },
  { key: 'penalty', label: 'Penalty', width: 'w-16', isAmount: true },
];
```
