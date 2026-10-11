import React, { useState, useEffect } from 'react';
import { supabase } from '../utils/supabase';
import { 
  dynamicHeaderConfig, 
  postAfcCategories, 
  type IShiftEarning, 
  type IDenomination 
} from '../types/earning';

const emptyDenominations = (): IDenomination => ({
  d500: 0, d200: 0, d100: 0, d50: 0, d20: 0, d10: 0,
  c10: 0, c5: 0, c2: 0, c1: 0,
});

const createDefaultShiftRow = (counter: number, shift: number): IShiftEarning => ({
  counterNumber: counter,
  shiftNumber: shift,
  shiftTiming: shift === 1 ? '06:00 - 14:00' : '14:00 - 22:00',
  operatorName: '',
  operatorId: '',
  qrSaleCountTom: 0, qrSaleAmtTom: 0,
  qrSaleCountTvm: 0, qrSaleAmtTvm: 0,
  paidExitCount: 0, paidExitAmt: 0,
  qrRefundCount: 0, qrRefundAmt: 0,
  qrCancelCount: 0, qrCancelAmt: 0,
  cscSaleSV2: 0, cscSaleSV1: 0, cscSaleAmt: 0,
  cscAddValueCountTom: 0, cscAddValueAmtTom: 0,
  cscAddValueCountTvm: 0, cscAddValueAmtTvm: 0,
  ncmcAddValueCountTom: 0, ncmcAddValueAmtTom: 0,
  ncmcAddValueCountTvm: 0, ncmcAddValueAmtTvm: 0,
  cscRefundCount: 0, cscRefundAmt: 0,
  surchargeCashCount: 0, surchargeCashAmt: 0,
  surchargePurseCount: 0, surchargePurseAmt: 0,
  surchargeNcmcCount: 0, surchargeNcmcAmt: 0,
  eib:0,
  hdfcPos: 0, upiTom: 0, upiTvm: 0, outSourceEarning: 0,
  amtNotTaken: 0,
  penalty: 0,
  totalAfcEarning: 0,
  totalEArning:0, totalCashDepositedByOperator:0,
  okUrcAmt:0,okUrcCount:0,okMrAmt:0,okMrCount:0,
  penaltyCashAmt:0,penaltyCashCount:0,penaltyHhtAmt:0,
  penaltyHhtCount:0,penaltyPurseAmt:0,
  penaltyPurseCount:0,
});

const createInitial10Shifts = (): IShiftEarning[] => {
  const shifts: IShiftEarning[] = [];
  for (let c = 1; c <= 5; c++) {
    shifts.push(createDefaultShiftRow(c, 1));
    shifts.push(createDefaultShiftRow(c, 2));
  }
  return shifts;
};

const calcDenomTotal = (d: IDenomination) =>
  d.d500 * 500 + d.d200 * 200 + d.d100 * 100 + d.d50 * 50 + d.d20 * 20 +
  d.d10 * 10 + d.c10 * 10 + d.c5 * 5 + d.c2 * 2 + d.c1 * 1;

export default function EarningDashboard() {
  const todayStr = new Date().toISOString().split('T')[0];
  const [selectedDate, setSelectedDate] = useState<string>(todayStr);
  const [stationName, setStationName] = useState('Sector 62 Noida');
  const [compilerName, setCompilerName] = useState('SAMEER MAHESHWARI');
  
  const [shifts, setShifts] = useState<IShiftEarning[]>(createInitial10Shifts());
  const [previousDayCash, setPreviousDayCash] = useState<number>(0);
  const [cashInPossession, setCashInPossession] = useState<IDenomination>(emptyDenominations());
  const [cashToBank, setCashToBank] = useState<IDenomination>(emptyDenominations());
  const [isSaving, setIsSaving] = useState(false);

  // Row creation state
  const [selTom, setSelTom] = useState('1');
  const [selShift, setSelShift] = useState('1');
  const [selTiming, setSelTiming] = useState('06:00 - 14:00');

  // Helper to calculate colSpan for Main Categories
  const calcCategoryColSpan = (subCategories: any[]) => {
    return subCategories.reduce((sum, sub) => sum + (sub.hasQtyAndAmt ? 2 : 1), 0);
  };

  // Fetch record from Supabase on date change
  useEffect(() => {
    const fetchSheetData = async () => {
      if (selectedDate > todayStr) {
        setShifts(createInitial10Shifts());
        setPreviousDayCash(0);
        setCashInPossession(emptyDenominations());
        setCashToBank(emptyDenominations());
        return;
      }

      try {
        const { data, error } = await supabase
          .from('daily_earning_sheets')
          .select('*')
          .eq('date', selectedDate)
          .maybeSingle();

        if (data && !error) {
          setStationName(data.station_name || 'Sector 62 Noida');
          setCompilerName(data.compiled_by || '');
          setShifts(data.shifts && data.shifts.length > 0 ? data.shifts : createInitial10Shifts());
          setPreviousDayCash(data.previous_day_cash || 0);
          setCashInPossession(data.cash_in_possession_denominations || emptyDenominations());
          setCashToBank(data.cash_to_bank_denominations || emptyDenominations());
          return;
        }
      } catch (err) {
        console.error('Error fetching sheet:', err);
      }

      setShifts(createInitial10Shifts());
      setCashInPossession(emptyDenominations());
      setCashToBank(emptyDenominations());
    };

    fetchSheetData();
  }, [selectedDate, todayStr]);

  const handleCellChange = (rowIndex: number, key: keyof IShiftEarning, value: string) => {
    const updated = [...shifts];
    const isNum = typeof createDefaultShiftRow(1, 1)[key] === 'number';
    updated[rowIndex] = {
      ...updated[rowIndex],
      [key]: isNum ? (value === '' ? 0 : Number(value) || 0) : value,
    };
    setShifts(updated);
  };

  const handleAddCustomRow = () => {
    const newRow = createDefaultShiftRow(Number(selTom), Number(selShift));
    newRow.shiftTiming = selTiming;
    setShifts([...shifts, newRow]);
  };

  const handleDeleteRow = (index: number) => {
    if (index < 10) {
      alert('Default 10 TOM shifts cannot be removed.');
      return;
    }
    setShifts(shifts.filter((_, i) => i !== index));
  };

  const totalBankCash = calcDenomTotal(cashToBank);
  const totalPossessionCash = calcDenomTotal(cashInPossession);

  const handleSaveSheet = async () => {
    setIsSaving(true);
    const payload = {
      station_name: stationName,
      date: selectedDate,
      compiled_by: compilerName,
      shifts,
      previous_day_cash: previousDayCash,
      cash_to_bank: totalBankCash,
      cash_in_possession_denominations: cashInPossession,
      cash_to_bank_denominations: cashToBank,
      is_compiled: true,
      updated_at: new Date().toISOString(),
    };

    try {
      const { error } = await supabase
        .from('daily_earning_sheets')
        .upsert(payload, { onConflict: 'date' });

      if (error) throw error;
      alert(`Earning sheet for ${selectedDate} saved successfully to Supabase!`);
    } catch (err: any) {
      alert(`Failed to save register: ${err.message}`);
    } finally {
      setIsSaving(false);
    }
  };

  return (
    <div className="w-full bg-slate-100 p-2 font-sans text-xs">
      {/* HEADER BAR */}
      <div className="bg-[#800000] text-white p-3 rounded-t-md flex flex-wrap justify-between items-center gap-2 mb-2 shadow">
        <div className="flex items-center space-x-2">
          <span className="font-bold">Station:</span>
          <input
            type="text"
            value={stationName}
            onChange={(e) => setStationName(e.target.value)}
            className="bg-red-900 border border-red-400 px-2 py-0.5 rounded text-white font-semibold"
          />
        </div>

        <div className="text-center font-bold text-sm tracking-wide">
          DMRC DAILY STATION EARNING REGISTER
        </div>

        <div className="flex items-center space-x-3">
          <div>
            <span className="font-bold">Date: </span>
            <input
              type="date"
              value={selectedDate}
              onChange={(e) => setSelectedDate(e.target.value)}
              className="bg-red-900 border border-red-400 px-2 py-0.5 rounded text-white font-semibold cursor-pointer"
            />
          </div>
          <button
            onClick={handleSaveSheet}
            disabled={isSaving}
            className="bg-emerald-600 hover:bg-emerald-700 text-white font-bold px-3 py-1 rounded shadow transition"
          >
            {isSaving ? 'Saving...' : 'Save to DB'}
          </button>
        </div>
      </div>

      {/* ROW ADDITION TOOLBAR */}
      <div className="mb-2 bg-white p-2 border border-gray-300 rounded shadow-sm flex flex-wrap items-center justify-between gap-2">
        <div className="flex items-center gap-2">
          <span className="font-bold text-gray-700">Add Shift Row:</span>
          <select value={selTom} onChange={(e) => setSelTom(e.target.value)} className="border p-1 rounded font-semibold bg-gray-50">
            {Array.from({ length: 10 }, (_, i) => (
              <option key={i + 1} value={i + 1}>TOM {i + 1}</option>
            ))}
          </select>

          <select value={selShift} onChange={(e) => setSelShift(e.target.value)} className="border p-1 rounded font-semibold bg-gray-50">
            <option value="1">Morning</option>
            <option value="2">Evening</option>
            
          </select>

          <select value={selTiming} onChange={(e) => setSelTiming(e.target.value)} className="border p-1 rounded font-semibold bg-gray-50">
            <option value="06:00 - 14:00">06:00 - 14:00</option>
            <option value="14:00 - 22:00">14:00 - 22:00</option>
            <option value="22:00 - 06:00">22:00 - 06:00</option>
          </select>

          <button
            onClick={handleAddCustomRow}
            className="bg-emerald-700 hover:bg-emerald-800 text-white font-bold px-3 py-1 rounded text-xs transition"
          >
            + Add Row
          </button>
        </div>

        <div className="font-bold text-gray-600">
          Total Shifts: {shifts.length}
        </div>
      </div>

      {/* DYNAMIC TABLE */}
      <div className="overflow-x-auto border border-gray-500 bg-white shadow max-h-[55vh] mb-3">
        <table className="table-fixed border-collapse min-w-max w-max select-none font-mono text-xs">
          <thead>
            {/* LEVEL 1: Main Category Row */}
            <tr className="bg-[#800000] text-white font-bold text-center">
              <th colSpan={4} rowSpan={3} className="border border-gray-600 p-1 w-80 align-middle bg-gray-800">
                COUNTER METADATA
              </th>

              {dynamicHeaderConfig.map((cat, idx) => (
                <th
                  key={idx}
                  colSpan={calcCategoryColSpan(cat.subCategories)}
                  className={`border border-gray-600 p-1 ${cat.bgClass}`}
                >
                  {cat.categoryLabel}
                </th>
              ))}

              <th rowSpan={3} className="border border-gray-600 p-1 bg-amber-500 text-black w-24 align-middle">
                TOTAL AFC EARNING
              </th>

              {postAfcCategories.map((cat, idx) => (
                <th
                  key={idx}
                  colSpan={calcCategoryColSpan(cat.subCategories)}
                  className={`border border-gray-600 p-1 ${cat.bgClass}`}
                >
                  {cat.categoryLabel}
                </th>
              ))}
               <th rowSpan={3} className="border border-gray-600 p-1 bg-amber-500 text-black w-24 align-middle">
                TOTAL EARNING
              </th>

              <th rowSpan={3} className="border border-gray-600 p-1 bg-gray-400 w-10 align-middle">
                ACT
              </th>
            </tr>

            {/* LEVEL 2: Sub-Category Row */}
            <tr className="bg-gray-200 text-black text-[10px] font-semibold text-center border-b border-gray-500">
              {[...dynamicHeaderConfig, ...postAfcCategories].map((cat) =>
                cat.subCategories.map((sub, sIdx) => (
                  <th
                    key={sIdx}
                    colSpan={sub.hasQtyAndAmt ? 2 : 1}
                    rowSpan={sub.hasQtyAndAmt ? 1 : 2}
                    className={`border p-1 ${sub.width || 'w-24'}`}
                  >
                    {sub.label}
                  </th>
                ))
              )}
            </tr>

            {/* LEVEL 3: Qty / Amt Breakdown Row */}
            <tr className="bg-gray-100 text-black text-[10px] font-semibold text-center border-b border-gray-600">
              {[...dynamicHeaderConfig, ...postAfcCategories].map((cat) =>
                cat.subCategories.map((sub, sIdx) => {
                  if (!sub.hasQtyAndAmt) return null;
                  return (
                    <React.Fragment key={`${sIdx}-qa`}>
                      <th className="border p-0.5 w-12 bg-gray-100">QTY</th>
                      <th className="border p-0.5 w-16 bg-gray-100">AMT</th>
                    </React.Fragment>
                  );
                })
              )}
            </tr>


          </thead>

          <tbody>
            {shifts.map((row, rowIndex) => {
              // Calculate Total AFC Earning dynamically across pre-AFC amount fields
              const rowAfcTotal = [...dynamicHeaderConfig].reduce((sum, cat) => {
                return sum + cat.subCategories.reduce((catSum, sub) => {
                  if (sub.amtKey) return catSum + (Number(row[sub.amtKey]) || 0);
                  if (sub.singleKey && sub.singleKey === 'cscSaleAmt') return catSum + (Number(row[sub.singleKey]) || 0);
                  return catSum;
                }, 0);
              }, 0);

              return (
                <tr key={rowIndex} className="hover:bg-blue-50 border-b border-gray-300">
                  <td className="border p-1 text-center font-bold bg-gray-50">TOM {row.counterNumber}</td>
                  <td className="border p-1 text-center font-semibold bg-gray-50">Shift {row.shiftNumber}</td>
                  <td className="border p-1 text-center text-[10px] bg-gray-50">{row.shiftTiming}</td>
                  <td className="border p-0">
                    <input
                      type="text"
                      placeholder="Operator Name"
                      value={row.operatorName}
                      onChange={(e) => handleCellChange(rowIndex, 'operatorName', e.target.value)}
                      className="w-full h-7 px-1 text-left bg-transparent focus:bg-yellow-100 focus:outline-none text-xs"
                    />
                  </td>

                  {/* Pre-AFC dynamic subcategory inputs */}
                  {dynamicHeaderConfig.map((cat) =>
                    cat.subCategories.map((sub) => {
                      if (sub.hasQtyAndAmt) {
                        const qVal = row[sub.qtyKey!];
                        const aVal = row[sub.amtKey!];
                        return (
                          <React.Fragment key={`${sub.label}-pair`}>
                            <td className="border p-0 w-12 bg-white">
                              <input
                                type="number"
                                value={qVal === 0 ? '' : qVal}
                                placeholder="0"
                                onChange={(e) => handleCellChange(rowIndex, sub.qtyKey!, e.target.value)}
                                className="w-full h-7 px-1 text-right bg-transparent focus:bg-yellow-100 focus:outline-none font-mono text-xs [appearance:textfield] [&::-webkit-outer-spin-button]:appearance-none [&::-webkit-inner-spin-button]:appearance-none"
                              />
                            </td>
                            <td className="border p-0 w-16 bg-white">
                              <input
                                type="number"
                                value={aVal === 0 ? '' : aVal}
                                placeholder="0"
                                onChange={(e) => handleCellChange(rowIndex, sub.amtKey!, e.target.value)}
                                className="w-full h-7 px-1 text-right bg-transparent focus:bg-yellow-100 focus:outline-none font-mono text-xs [appearance:textfield] [&::-webkit-outer-spin-button]:appearance-none [&::-webkit-inner-spin-button]:appearance-none"
                              />
                            </td>
                          </React.Fragment>
                        );
                      } else {
                        const sVal = row[sub.singleKey!];
                        return (
                          <td key={sub.label} className={`border p-0 ${sub.width || 'w-16'} bg-white`}>
                            <input
                              type="number"
                              value={sVal === 0 ? '' : sVal}
                              placeholder="0"
                              onChange={(e) => handleCellChange(rowIndex, sub.singleKey!, e.target.value)}
                              className="w-full h-7 px-1 text-right bg-transparent focus:bg-yellow-100 focus:outline-none font-mono text-xs [appearance:textfield] [&::-webkit-outer-spin-button]:appearance-none [&::-webkit-inner-spin-button]:appearance-none"
                            />
                          </td>
                        );
                      }
                    })
                  )}

                  {/* Total AFC Earning Display */}
                  <td className="border p-1 text-right font-bold text-amber-900 bg-amber-100 font-mono w-24">
                    ₹{rowAfcTotal.toLocaleString('en-IN')}
                  </td>

                  {/* Post-AFC (Cashless & Adjustments) Inputs */}
                  {postAfcCategories.map((cat) =>
                    cat.subCategories.map((sub) => {
                      const sVal = row[sub.singleKey!];
                      return (
                        <td key={sub.label} className={`border p-0 ${sub.width || 'w-16'} bg-white`}>
                          <input
                            type="number"
                            value={sVal === 0 ? '' : sVal}
                            placeholder="0"
                            onChange={(e) => handleCellChange(rowIndex, sub.singleKey!, e.target.value)}
                            className="w-full h-7 px-1 text-right bg-transparent focus:bg-yellow-100 focus:outline-none font-mono text-xs [appearance:textfield] [&::-webkit-outer-spin-button]:appearance-none [&::-webkit-inner-spin-button]:appearance-none"
                          />
                        </td>
                      );
                    })
                  )}

                  <td className="border p-0 text-center bg-gray-50">
                    {rowIndex >= 10 ? (
                      <button onClick={() => handleDeleteRow(rowIndex)} className="text-red-600 font-bold px-1">×</button>
                    ) : (
                      <span className="text-gray-300 select-none">-</span>
                    )}
                  </td>
                </tr>
              );
            })}
          </tbody>

          {/* FOOTER TOTALS */}
          <tfoot>
            <tr className="bg-amber-300 font-bold text-gray-900 border-t-2 border-amber-600 text-right">
              <td colSpan={4} className="border p-2 text-center bg-amber-400 font-bold">TOTAL</td>
              
              {/* Pre-AFC Column Totals */}
              {dynamicHeaderConfig.map((cat) =>
                cat.subCategories.map((sub) => {
                  if (sub.hasQtyAndAmt) {
                    const qTot = shifts.reduce((s, r) => s + (Number(r[sub.qtyKey!]) || 0), 0);
                    const aTot = shifts.reduce((s, r) => s + (Number(r[sub.amtKey!]) || 0), 0);
                    return (
                      <React.Fragment key={`${sub.label}-tot`}>
                        <td className="border p-1 text-right font-mono text-xs w-12">{qTot}</td>
                        <td className="border p-1 text-right font-mono text-xs w-16">₹{aTot.toLocaleString('en-IN')}</td>
                      </React.Fragment>
                    );
                  } else {
                    const sTot = shifts.reduce((s, r) => s + (Number(r[sub.singleKey!]) || 0), 0);
                    return (
                      <td key={sub.label} className={`border p-1 text-right font-mono text-xs ${sub.width || 'w-16'}`}>
                        {sub.singleKey === 'cscSaleAmt' ? `₹${sTot.toLocaleString('en-IN')}` : sTot}
                      </td>
                    );
                  }
                })
              )}

              {/* Total AFC Earning Grand Total */}
              <td className="border p-1 font-bold text-red-900 bg-amber-400 font-mono w-24">
                ₹{shifts.reduce((acc, row) => {
                  const rowTot = dynamicHeaderConfig.reduce((sum, cat) => {
                    return sum + cat.subCategories.reduce((catSum, sub) => {
                      if (sub.amtKey) return catSum + (Number(row[sub.amtKey]) || 0);
                      if (sub.singleKey === 'cscSaleAmt') return catSum + (Number(row[sub.singleKey]) || 0);
                      return catSum;
                    }, 0);
                  }, 0);
                  return acc + rowTot;
                }, 0).toLocaleString('en-IN')}
              </td>

              {/* Post-AFC Column Totals */}
              {postAfcCategories.map((cat) =>
                cat.subCategories.map((sub) => {
                  const sTot = shifts.reduce((s, r) => s + (Number(r[sub.singleKey!]) || 0), 0);
                  return (
                    <td key={sub.label} className={`border p-1 text-right font-mono text-xs ${sub.width || 'w-16'}`}>
                      ₹{sTot.toLocaleString('en-IN')}
                    </td>
                  );
                })
              )}

              <td className="border p-1 bg-amber-400"></td>
            </tr>
          </tfoot>
        </table>
      </div>

      {/* CASH DENOMINATION PANELS */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <DenominationBox
          title="CASH IN POSSESSION (MANUAL PHYSICAL COUNT)"
          denom={cashInPossession}
          setDenom={setCashInPossession}
          total={totalPossessionCash}
          bgColor="bg-emerald-50 border-emerald-400 text-emerald-900"
        />

        <DenominationBox
          title="CASH TO BANK DENOMINATIONS (EOD DEPOSIT)"
          denom={cashToBank}
          setDenom={setCashToBank}
          total={totalBankCash}
          bgColor="bg-blue-50 border-blue-400 text-blue-900"
        />
      </div>
    </div>
  );
}

function DenominationBox({ title, denom, setDenom, total, bgColor }: any) {
  const notes = [
    { label: '₹500', key: 'd500' }, { label: '₹200', key: 'd200' },
    { label: '₹100', key: 'd100' }, { label: '₹50', key: 'd50' },
    { label: '₹20', key: 'd20' },   { label: '₹10', key: 'd10' },
    { label: '₹10 Coin', key: 'c10' }, { label: '₹5 Coin', key: 'c5' },
    { label: '₹2 Coin', key: 'c2' },   { label: '₹1 Coin', key: 'c1' },
  ];

  return (
    <div className={`p-3 rounded border shadow-sm ${bgColor}`}>
      <h3 className="font-bold border-b pb-1 mb-2 text-xs">{title}</h3>
      <div className="grid grid-cols-2 gap-2 text-xs">
        {notes.map((n) => (
          <div key={n.key} className="flex justify-between items-center bg-white p-1 rounded border">
            <span className="font-semibold text-gray-700">{n.label}:</span>
            <input
              type="number"
              placeholder="0"
              value={denom[n.key] || ''}
              onChange={(e) => setDenom({ ...denom, [n.key]: Number(e.target.value) || 0 })}
              className="w-16 text-right border rounded px-1 font-mono text-xs [appearance:textfield] [&::-webkit-outer-spin-button]:appearance-none [&::-webkit-inner-spin-button]:appearance-none"
            />
          </div>
        ))}
      </div>
      <div className="mt-2 text-right font-bold text-sm border-t pt-1">
        Total Cash: ₹{total.toLocaleString('en-IN')}
      </div>
    </div>
  );
}