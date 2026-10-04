
import { useEffect, useState } from 'react';
import {Menubar} from '@base-ui/react'
import type { IEmployeeRecord } from '../types/employee';
import { tableHeaders } from '../types/employee';

export default function EmployeeData() {
  const [employees, setEmployees] = useState<IEmployeeRecord[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchEmployees = async () => {
      setLoading(true);
      setError(null);
      try {
        const response = await fetch('http://localhost:8080/api/employees');

        if (!response.ok) {
          throw new Error(`HTTP Error: Status ${response.status}`);
        }
        const result = await response.json();

        if (!Array.isArray(result.data)) {
          throw new Error('The employee API response did not contain an employee list.');
        }
        setEmployees(result.data as IEmployeeRecord[]);
      } catch (err) {
        setError(err instanceof Error ? err.message : 'An error occurred.');
      } finally {
        setLoading(false);
      }
    };
    void fetchEmployees();
  }, []);

  return (
    <div className="w-full">
      <h1 className="border-b-2 border-gray-400 py-4 text-center text-3xl font-semibold text-gray-500">
        Employee Data Table
      </h1>
      <Menubar
        items={[
          { label: 'Add Employee', onClick: () => console.log('Add Employee clicked') },
        ]}
      />  


      <input type="search" aria-label="Search employees" className="my-4 rounded-md border-2 px-4 py-2" />

      <div className="my-4 overflow-x-auto">
        {loading ? (
          <p className="p-4 text-center">Loading employees...</p>
        ) : error ? (
          <p role="alert" className="p-4 text-center text-red-600">{error}</p>
        ) : (
          <table className="my-2 w-full min-w-max border-collapse text-left">
            <thead>
              <tr className="bg-gray-100">
                {tableHeaders.map((head) => (
                  <th key={head} scope="col" className="whitespace-nowrap border-b-2 px-4 py-3 font-semibold">
                    {head}
                  </th>
                ))}
              </tr>
            </thead>
            <tbody>
              {employees.length === 0 ? (
                <tr>
                  <td colSpan={tableHeaders.length} className="p-4 text-center text-gray-500">
                    No employees found.
                  </td>
                </tr>
              ) : (
                employees.map((emp, idx) => {
                  const formatDate = (value: string) => {
                    const date = new Date(value);
                    return Number.isNaN(date.getTime())
                      ? '—'
                      : new Intl.DateTimeFormat(undefined, { dateStyle: 'medium', timeZone: 'UTC' }).format(date);
                  };

                  return (
                    <tr key={emp.employeeId} className="text-left hover:bg-gray-100">

                      <td className="whitespace-nowrap border-b border-violet-200 px-4 py-3">
                        <button
                          onClick={() => console.log(`Edit employee ${emp.employeeId}`)}
                          className="rounded bg-blue-500 px-3 py-1 text-white hover:bg-blue-600"  
                        >
                          Edit
                        </button>
                        <button
                          onClick={() => console.log(`Delete employee ${emp.employeeId}`)}
                          className="ml-2 rounded bg-red-500 px-3 py-1 text-white hover:bg-red-600"
                        >
                          Delete
                        </button>
                      </td>
                      <td className="whitespace-nowrap border-b border-violet-200 px-4 py-3">{idx + 1}</td>
                      <td className="whitespace-nowrap border-b border-violet-200 px-4 py-3">{emp.employeeId}</td>
                      <td className="whitespace-nowrap border-b border-violet-200 px-4 py-3">
                        {emp.firstName} {emp.lastName}
                      </td>
                      <td className="whitespace-nowrap border-b border-violet-200 px-4 py-3">{emp.designation}</td>
                      <td className="whitespace-nowrap border-b border-violet-200 px-4 py-3">{emp.phone}</td>
                      <td className="whitespace-nowrap border-b border-violet-200 px-4 py-3">{formatDate(emp.dateOfBirth)}</td>
                      <td className="whitespace-nowrap border-b border-violet-200 px-4 py-3">{emp.gender}</td>
                      <td className="whitespace-nowrap border-b border-violet-200 px-4 py-3">{emp.email}</td>
                      <td className="whitespace-nowrap border-b border-violet-200 px-4 py-3">
                        {emp.department?.departmentName ?? '—'}
                      </td>
                      <td className="whitespace-nowrap border-b border-violet-200 px-4 py-3">
                        {emp.payScale?.payLevel ?? '—'}
                      </td>
                      <td className="whitespace-nowrap border-b border-violet-200 px-4 py-3">
                        {typeof emp.currentBasicPay === 'number'
                          ? emp.currentBasicPay.toLocaleString()
                          : '—'}
                      </td>
                      <td className="whitespace-nowrap border-b border-violet-200 px-4 py-3">{emp.cadreGroup}</td>
                      <td className="whitespace-nowrap border-b border-violet-200 px-4 py-3">{emp.employmentType}</td>
                      <td className="whitespace-nowrap border-b border-violet-200 px-4 py-3">{formatDate(emp.dateOfJoining)}</td>
                      <td className="whitespace-nowrap border-b border-violet-200 px-4 py-3">{formatDate(emp.retirementDate)}</td>
                      <td className="whitespace-nowrap border-b border-violet-200 px-4 py-3">{emp.status}</td>
                      <td className="whitespace-nowrap border-b border-violet-200 px-4 py-3">
                        {emp.reportingOfficer || '—'}
                      </td>
                    </tr>
                  );
                })
              )}
            </tbody>
          </table>
        )}
      </div>
    </div>
  );
}
