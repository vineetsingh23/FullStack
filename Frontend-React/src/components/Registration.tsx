import { GENDER_OPTIONS, EMPLOYMENT_STATUS, EMPLOYMENT_TYPE, CADRE } from '../constants/constants';
import { useEffect, useState } from 'react';
import type { IDepartmentOption, IPayScaleOption, IEmployeeFormInput } from '../types/employee.ts';
import { useForm, type SubmitHandler } from 'react-hook-form';

export default function Registration() {
  const [step, setStep] = useState<number>(1);
  const [departments, setDepartments] = useState<IDepartmentOption[]>([]);
  const [payScales, setPayScales] = useState<IPayScaleOption[]>([]);
  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState<boolean>(true);


  const { register, handleSubmit, reset,trigger } = useForm<IEmployeeFormInput>(
    
  );

  const handleNext = async () => {
    let fieldToValidate: (keyof IEmployeeFormInput)[] =[];

    if (step == 1) fieldToValidate = ['employeeId','firstName','lastName','gender','email','phone','status'];
    if (step == 2) fieldToValidate = ['aadhaarNumber','panNumber','dateOfBirth','dateOfJoining','retirementDate','reportingOfficer'];
    if (step == 3) fieldToValidate = ['employmentType','cadreGroup','currentBasicPay','designation','designation','payScale']

    const isValid = await trigger(fieldToValidate);
    if(isValid) setStep((prev)=> prev+1)
  }

  const handlePrev =() => setStep((prev)=> Math.max(prev-1,1));


  const onSubmit: SubmitHandler<IEmployeeFormInput> = async (data) => {
    
    try {
      const response = await fetch('http://localhost:8080/api/employees', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(data),
      });

      const result = await response.json();

      if (!response.ok) {
        throw new Error(result.error || 'Failed to create employee');
      }

      alert('Employee created successfully');
      reset();
    } catch (err) {
      console.error('Error submitting form', err);
      alert(err instanceof Error ? err.message : 'Failed to create employee');
    }
  };

  useEffect(() => {
    const fetchData = async () => {
      try {
        const [deptRes, payRes] = await Promise.all([
          fetch('http://localhost:8080/api/departments'),
          fetch('http://localhost:8080/api/payscales'), // Adjust endpoint as needed
        ]);

        if (deptRes.ok) {
          const deptData = await deptRes.json();
          setDepartments(deptData.data || []);
        }
        if (payRes.ok) {
          const payData = await payRes.json();
          setPayScales(payData.data || []);
        }
      } catch (err) {
        setError(err instanceof Error ? err.message : 'Failed to load options');
      } finally {
        setLoading(false);
      }
    };
    fetchData();
  }, []);

  if (loading) {
    return <div className="p-4 text-center">Data is loading...</div>;
  }

  return (
    <div className="flex justify-center flex-col items-center py-6">
      <div className="min-w-sm border px-5 py-5 rounded shadow-sm bg-white">
        <h1 className="text-3xl text-center font-semibold text-blue-700 italic mb-4 border-b-2 border-green-200 px-2">
          Registration Form
        </h1>

        {error && <p className="text-red-500 mb-2 text-sm">{error}</p>}

        <form onSubmit={handleSubmit(onSubmit)}>

           {/* ['employeeId','firstName','lastName','gender','email','phone','status']; */}
          {step === 1 && (
              <div className='space-y-3'>
                   <div className="flex flex-col">
              <label>Employee ID</label>
              <input
                {...register('employeeId', { required: true })}
                className="border border-gray-400 rounded px-2 py-1.5"
                placeholder="GOV-2026-8942"
              />
            </div>

            {/* Step 2: Personal Details */}
            <div className="flex flex-col">
              <label>First Name</label>
              <input
                {...register('firstName', { required: true })}
                className="border border-gray-400 rounded px-2 py-1.5"
              />
            </div>

            <div className="flex flex-col">
              <label>Last Name</label>
              <input
                {...register('lastName', { required: true })}
                className="border border-gray-400 rounded px-2 py-1.5"
              />
            </div>
            <div className="flex flex-col">
              <label>Gender</label>
              <select
                {...register('gender', { required: true })}
                className="border border-gray-400 rounded px-2 py-1.5"
              >
                <option value="">-- Select Gender --</option>
                {GENDER_OPTIONS.map((g) => (
                  <option key={g} value={g}>{g}</option>
                ))}
              </select>
            </div>

            <div className="flex flex-col">
              <label>Email</label>
              <input
                type="email"
                {...register('email', { required: true })}
                className="border border-gray-400 rounded px-2 py-1.5"
              />
            </div>
            
            <div className="flex flex-col">
              <label>Mobile Number</label>
              <input
                {...register('phone', { required: true })}
                className="border border-gray-400 rounded px-2 py-1.5"
              />
            </div>
            <div className="flex flex-col">
              <label>Employment Status</label>
              <select
                {...register('status')}
                className="border border-gray-400 rounded px-2 py-1.5"
              >
                <option value="">Select Status</option>
                {EMPLOYMENT_STATUS.map((s) => (
                  <option key={s} value={s}>{s}</option>
                ))}
              </select>
            </div>


              </div>

          )}
          {step === 2 && (
            // ['aadhaarNumber','panNumber','dateOfBirth','dateOfJoining','retirementDate','reportingOfficer'];
             <div className="grid gap-4">
                <div className="flex flex-col">
              <label>Aadhaar Number</label>
              <input
                {...register('aadhaarNumber', { required: true })}
                className="border border-gray-400 rounded px-2 py-1.5"
              />
            </div>

            <div className="flex flex-col">
              <label>PAN Number</label>
              <input
                {...register('panNumber')}
                className="border border-gray-400 rounded px-2 py-1.5 uppercase"
              />
            </div>

            


            <div className="flex flex-col">
              <label>Date of Birth</label>
              <input
                type="date"
                {...register('dateOfBirth', { required: true })}
                className="border border-gray-400 rounded px-2 py-1.5"
              />
            </div>
               <div className="flex flex-col">
              <label>Date of Joining</label>
              <input
                type="date"
                {...register('dateOfJoining', { required: true })}
                className="border border-gray-400 rounded px-2 py-1.5"
              />
            </div>

            <div className="flex flex-col">
              <label>Date of Retirement</label>
              <input
                type="date"
                {...register('retirementDate', { required: true })}
                className="border border-gray-400 rounded px-2 py-1.5"
              />
            </div>
             <div className="flex flex-col">
              <label>Reporting Officer</label>
              <input
                {...register('reportingOfficer', { required: true })}
                className="border border-gray-400 rounded px-2 py-1.5"
              />
            </div>
            


             </div>


          )}

          {step === 3 && (

            <div className="grid gap-4">
            {/* Step 1: Official Identification */}
           

            
            <hr className="border-t border-gray-300" />

            {/* Step 3: Service & Placement Details */}
            <div className="flex flex-col">
              <label>Department</label>
              <select
                {...register('department', { required: true })}
                className="border border-gray-400 rounded px-2 py-1.5"
              >
                <option value="">Select Department</option>
                {departments.map((d) => (
                  <option key={d._id} value={d._id}>{d.departmentName}</option>
                ))}
              </select>
            </div>
            

            <div className="flex flex-col">
              <label>Designation ID</label>
              <input
                {...register('designation', { required: true })}
                className="border border-gray-400 rounded px-2 py-1.5"
              />
            </div>

            <div className="flex flex-col">
              <label>PayScale</label>
              <select
                {...register('payScale', { required: true })}
                className="border border-gray-400 rounded px-2 py-1.5"
              >
                <option value="">Select PayScale</option>
                {payScales.map((p) => (
                  <option key={p._id} value={p._id}>{p.payLevel}</option>
                ))}
              </select>
            </div>

            <div className="flex flex-col">
              <label>Current Basic Pay</label>
              <input
                type="number"
                {...register('currentBasicPay', { required: true, valueAsNumber: true })}
                className="border border-gray-400 rounded px-2 py-1.5"
              />
            </div>

            <div className="flex flex-col">
              <label>Cadre Group</label>
              <select
                {...register('cadreGroup', { required: true })}
                className="border border-gray-400 rounded px-2 py-1.5"
              >
                <option value="">Select Cadre</option>
                {CADRE.map((c) => (
                  <option key={c} value={c}>{c}</option>
                ))}
              </select>
            </div>

            <div className="flex flex-col">
              <label>Employment Type</label>
              <select
                {...register('employmentType', { required: true })}
                className="border border-gray-400 rounded px-2 py-1.5"
              >
                <option value="">Select Employment Type</option>
                {EMPLOYMENT_TYPE.map((e) => (
                  <option key={e} value={e}>{e}</option>
                ))}
              </select>
            </div>

           

            

        
          </div>
          )}
          

          <div className="flex justify-between my-4">

            {step > 1 && (
              <button type="button" onClick={handlePrev} className="px-4 py-2 bg-gray-300 rounded">Previous</button>
            )}

            {step === 3 && (
                 <button
              type="button"
              onClick={() => reset()}
              className="border-2 px-4 py-1.5 bg-green-200 rounded font-semibold hover:bg-gray-300"
            >
              Reset
            </button>

            )}
           
            {step < 3 ? (
            <button type="button" onClick={handleNext} className="px-4 py-2 bg-blue-600 text-white rounded ml-auto">
              Next
            </button>
          ) : (
            <button type="submit" className="px-4 py-2 bg-green-600 text-white rounded ml-auto">
              Submit Form
            </button>
          )}
        
          </div>
        </form>
      </div>
    </div>
  );
}