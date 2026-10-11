import { supabase } from '../utils/supabase';

export interface EarningSheetPayload {
  stationName: string;
  date: string; // YYYY-MM-DD
  compiledBy: string;
  shifts: any[];
  previousDayCash: number;
  todayCashOnHand: number;
  cashToBank: number;
  cashInPossessionDenominations: any;
  cashToBankDenominations: any;
  isCompiled: boolean;
}

// Fetch sheet by selected date
export async function fetchEarningSheetByDate(dateStr: string) {
  const { data, error } = await supabase
    .from('daily_earning_sheets')
    .select('*')
    .eq('date', dateStr)
    .maybeSingle();

  if (error) {
    console.error('Error fetching earning sheet:', error.message);
    return null;
  }

  return data;
}

// Save or Update sheet for selected date (Upsert)
export async function saveEarningSheet(payload: EarningSheetPayload) {
  const dbRecord = {
    station_name: payload.stationName,
    date: payload.date,
    compiled_by: payload.compiledBy,
    shifts: payload.shifts,
    previous_day_cash: payload.previousDayCash,
    today_cash_on_hand: payload.todayCashOnHand,
    cash_to_bank: payload.cashToBank,
    cash_in_possession_denominations: payload.cashInPossessionDenominations,
    cash_to_bank_denominations: payload.cashToBankDenominations,
    is_compiled: payload.isCompiled,
    updated_at: new Date().toISOString(),
  };

  const { data, error } = await supabase
    .from('daily_earning_sheets')
    .upsert(dbRecord, { onConflict: 'date' })
    .select()
    .single();

  if (error) {
    console.error('Error saving earning sheet:', error.message);
    throw new Error(error.message);
  }

  return data;
}