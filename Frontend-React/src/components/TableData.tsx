import React from 'react';
import { dataColumns } from '.';
import { ISiftEarning } from '../models/DailyEarning';

interface Props {
  shifts: ISiftEarning[];
  onCellChange: (rowIndex: number, key: keyof ISiftEarning, value: string) => void;
}

export default function DynamicTableBody({ shifts, onCellChange }: Props) {
  return (
    <tbody>
      {shifts.map((row, rowIndex) => (
        <tr key={rowIndex} className="hover:bg-blue-50 border-b border-gray-300">
          {/* Metadata Cells (Fixed Columns) */}
          <td className="border p-1 text-center font-bold bg-gray-50 font-mono text-xs">
            TOM {row.counterNumber}
          </td>
          <td className="border p-1 text-center font-semibold bg-gray-50 text-xs">
            Shift {row.shiftNumber}
          </td>
          <td className="border p-1 text-center font-mono text-[10px] bg-gray-50">
            {row.shiftTiming}
          </td>
          <td className="border p-0">
            <input
              type="text"
              placeholder="Operator Name"
              value={row.operatorName}
              onChange={(e) => onCellChange(rowIndex, 'operatorName', e.target.value)}
              className="w-full h-7 px-1 text-left bg-transparent focus:bg-yellow-100 focus:outline-none text-xs"
            />
          </td>

          {/* Dynamic Data Columns */}
          {dataColumns.map((col) => {
            const rawValue = row[col.key];

            return (
              <td key={col.key as string} className={`border p-0 ${col.width} bg-white`}>
                <input
                  type="number"
                  value={rawValue === 0 ? '' : (rawValue as number)}
                  placeholder="0"
                  onChange={(e) => onCellChange(rowIndex, col.key, e.target.value)}
                  className="w-full h-7 px-1 text-right text-gray-900 bg-transparent focus:bg-yellow-100 focus:outline-none font-mono text-xs [appearance:textfield] [&::-webkit-outer-spin-button]:appearance-none [&::-webkit-inner-spin-button]:appearance-none"
                />
              </td>
            );
          })}
        </tr>
      ))}
    </tbody>
  );
}