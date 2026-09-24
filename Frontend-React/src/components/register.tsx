import React, { useState, useEffect } from 'react';
import { useForm,type SubmitHandler } from 'react-hook-form';
import type {
  IEmployeeFormInput,
  IDepartmentOption,
  IPayScaleOption,
} from '../types/employee';

const TOTAL_STEPS = 4;

export const PaginatedEmployeeForm: React.FC = () => {
  const [currentStep, setCurrentStep] = useState<number>(1);

  // Dropdown list states
  const [departments, setDepartments] = useState<IDepartmentOption[]>([]);
  const [payScales, setPayScales] = useState<IPayScaleOption[]>([]);
  const [loadingDropdowns, setLoadingDropdowns] = useState<boolean>(true);

  const {
    register,
    handleSubmit,
    trigger,
    getValues,
    formState: { errors, isSubmitting },
  } = useForm<IEmployeeFormInput>({
    mode: 'onChange',
    defaultValues: {
      employmentType: 'Probationary',
      cadreGroup: 'Group A',
      gender: 'Male',
      department: '',
      payScale: '',
      currentPostingLocation: {
        city: '',
        state: '',
        officeAddress: '',
      },
    },
  });

  // Fetch dropdown collections on mount
  useEffect(() => {
    const fetchOptions = async () => {
      try {
        const [deptRes, payRes] = await Promise.all([
          fetch('/api/departments'),
          fetch('/api/payscales'),
        ]);

        const deptData = await deptRes.json();
        const payData = await payRes.json();

        if (deptData.success) {
          setDepartments(deptData.data || []);
        }
        if (payData.success) {
          setPayScales(payData.data || []);
        }
      } catch (error) {
        console.error('Failed to load department or pay scale options:', error);
      } finally {
        setLoadingDropdowns(false);
      }
    };

    fetchOptions();
  }, []);

  // Validate active step fields before moving forward
  const handleNext = async () => {
    let fieldsToValidate: (keyof IEmployeeFormInput)[] = [];

    if (currentStep === 1) {
      fieldsToValidate = ['employeeId', 'aadhaarNumber'];
    } else if (currentStep === 2) {
      fieldsToValidate = ['firstName', 'lastName', 'email', 'phone', 'dateOfBirth'];
    } else if (currentStep === 3) {
      fieldsToValidate = ['department', 'designation', 'payScale', 'currentBasicPay', 'dateOfJoining', 'retirementDate'];
    }

    const isStepValid = await trigger(fieldsToValidate);
    if (isStepValid && currentStep < TOTAL_STEPS) {
      setCurrentStep((prev) => prev + 1);
    }
  };

  const handlePrevious = () => {
    if (currentStep > 1) {
      setCurrentStep((prev) => prev - 1);
    }
  };

  const handleSaveDraft = () => {
    const currentFormData = getValues();
    console.log('Draft Data Saved:', currentFormData);
    alert(`Draft progress saved at Step ${currentStep}!`);
  };

  const onSubmit: SubmitHandler<IEmployeeFormInput> = async (data) => {
    try {
      const response = await fetch('/api/employees', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(data),
      });

      const result = await response.json();
      if (response.ok && result.success) {
        alert('Government Employee registered successfully!');
      } else {
        alert(`Error: ${result.message || 'Registration failed'}`);
      }
    } catch (error) {
      console.error('Submission error:', error);
      alert('Network error. Failed to connect to server.');
    }
  };

  return (
    // Outer Container: Locks maximum screen height so outer page won't scroll
    <div>
      <div>
        left
      </div>
        <div className="flex flex-col h-[85vh] max-w-4xl mx-auto my-auto bg-white shadow-xl rounded-xl border border-gray-200 overflow-hidden">
      
      {/* HEADER & STEP INDICATOR */}
      <div className="p-5 bg-slate-50 border-b border-gray-200 shrink-0 w-1/2">
        <h2 className="text-xl font-bold text-slate-800">
          Government Employee Registration
        </h2>
        <p className="text-xs text-gray-500 mt-0.5">
          Step {currentStep} of {TOTAL_STEPS}
        </p>

        <div className="w-full bg-gray-200 h-2 rounded-full mt-3 overflow-hidden">
          <div
            className="bg-blue-600 h-2 transition-all duration-300 ease-in-out"
            style={{ width: `${(currentStep / TOTAL_STEPS) * 100}%` }}
          />
        </div>
      </div>

      {/* INNER SCROLLABLE FORM AREA */}
      <div className="flex-1 overflow-y-auto p-6">
        <form id="paginated-form" onSubmit={handleSubmit(onSubmit)}>
          
          {/* STEP 1: OFFICIAL IDENTIFICATION */}
          {currentStep === 1 && (
            <div className="space-y-4">
              <h3 className="text-md font-semibold text-slate-700 border-b pb-2">
                1. Official Identification
              </h3>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                <div>
                  <label className="block text-xs font-medium text-gray-700 mb-1">Employee ID *</label>
                  <input
                    type="text"
                    placeholder="GOV-2026-1001"
                    {...register('employeeId', { required: 'Employee ID is required' })}
                    className="w-full px-3 py-2 border rounded-md text-sm border-gray-300 focus:ring-2 focus:ring-blue-200 outline-none"
                  />
                  {errors.employeeId && <p className="text-xs text-red-500 mt-1">{errors.employeeId.message}</p>}
                </div>

                <div>
                  <label className="block text-xs font-medium text-gray-700 mb-1">Aadhaar Number *</label>
                  <input
                    type="text"
                    placeholder="123456789012"
                    {...register('aadhaarNumber', {
                      required: 'Aadhaar is required',
                      pattern: { value: /^\d{12}$/, message: 'Must be 12 digits' },
                    })}
                    className="w-full px-3 py-2 border rounded-md text-sm border-gray-300 focus:ring-2 focus:ring-blue-200 outline-none"
                  />
                  {errors.aadhaarNumber && <p className="text-xs text-red-500 mt-1">{errors.aadhaarNumber.message}</p>}
                </div>

                <div>
                  <label className="block text-xs font-medium text-gray-700 mb-1">PAN Number</label>
                  <input
                    type="text"
                    placeholder="ABCDE1234F"
                    {...register('panNumber', {
                      pattern: { value: /^[A-Z]{5}[0-9]{4}[A-Z]{1}$/, message: 'Invalid PAN' },
                    })}
                    className="w-full px-3 py-2 border border-gray-300 rounded-md text-sm uppercase focus:ring-2 focus:ring-blue-200 outline-none"
                  />
                  {errors.panNumber && <p className="text-xs text-red-500 mt-1">{errors.panNumber.message}</p>}
                </div>
              </div>
            </div>
          )}

          {/* STEP 2: PERSONAL DETAILS */}
          {currentStep === 2 && (
            <div className="space-y-4">
              <h3 className="text-md font-semibold text-slate-700 border-b pb-2">
                2. Personal Details
              </h3>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                <div>
                  <label className="block text-xs font-medium text-gray-700 mb-1">First Name *</label>
                  <input
                    type="text"
                    {...register('firstName', { required: 'First name is required' })}
                    className="w-full px-3 py-2 border border-gray-300 rounded-md text-sm outline-none focus:ring-2 focus:ring-blue-200"
                  />
                  {errors.firstName && <p className="text-xs text-red-500 mt-1">{errors.firstName.message}</p>}
                </div>

                <div>
                  <label className="block text-xs font-medium text-gray-700 mb-1">Last Name *</label>
                  <input
                    type="text"
                    {...register('lastName', { required: 'Last name is required' })}
                    className="w-full px-3 py-2 border border-gray-300 rounded-md text-sm outline-none focus:ring-2 focus:ring-blue-200"
                  />
                  {errors.lastName && <p className="text-xs text-red-500 mt-1">{errors.lastName.message}</p>}
                </div>

                <div>
                  <label className="block text-xs font-medium text-gray-700 mb-1">Official Email *</label>
                  <input
                    type="email"
                    placeholder="employee@gov.in"
                    {...register('email', { required: 'Email is required' })}
                    className="w-full px-3 py-2 border border-gray-300 rounded-md text-sm outline-none focus:ring-2 focus:ring-blue-200"
                  />
                  {errors.email && <p className="text-xs text-red-500 mt-1">{errors.email.message}</p>}
                </div>

                <div>
                  <label className="block text-xs font-medium text-gray-700 mb-1">Phone Number *</label>
                  <input
                    type="tel"
                    {...register('phone', { required: 'Phone is required' })}
                    className="w-full px-3 py-2 border border-gray-300 rounded-md text-sm outline-none focus:ring-2 focus:ring-blue-200"
                  />
                  {errors.phone && <p className="text-xs text-red-500 mt-1">{errors.phone.message}</p>}
                </div>

                <div>
                  <label className="block text-xs font-medium text-gray-700 mb-1">Date of Birth *</label>
                  <input
                    type="date"
                    {...register('dateOfBirth', { required: 'DOB is required' })}
                    className="w-full px-3 py-2 border border-gray-300 rounded-md text-sm outline-none focus:ring-2 focus:ring-blue-200"
                  />
                  {errors.dateOfBirth && <p className="text-xs text-red-500 mt-1">{errors.dateOfBirth.message}</p>}
                </div>

                <div>
                  <label className="block text-xs font-medium text-gray-700 mb-1">Gender *</label>
                  <select
                    {...register('gender', { required: true })}
                    className="w-full px-3 py-2 border border-gray-300 rounded-md text-sm outline-none focus:ring-2 focus:ring-blue-200"
                  >
                    <option value="Male">Male</option>
                    <option value="Female">Female</option>
                    <option value="Transgender">Transgender</option>
                    <option value="Other">Other</option>
                  </select>
                </div>
              </div>
            </div>
          )}

          {/* STEP 3: SERVICE & PAY PLACEMENT (DROPDOWNS REPLACING OBJECTID INPUTS) */}
          {currentStep === 3 && (
            <div className="space-y-4">
              <h3 className="text-md font-semibold text-slate-700 border-b pb-2">
                3. Service & Placement Details
              </h3>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                
                {/* Department Dropdown */}
                <div>
                  <label className="block text-xs font-medium text-gray-700 mb-1">Select Department *</label>
                  <select
                    {...register('department', { required: 'Please select a department' })}
                    disabled={loadingDropdowns}
                    className="w-full px-3 py-2 border border-gray-300 rounded-md text-sm outline-none focus:ring-2 focus:ring-blue-200 bg-white"
                  >
                    <option value="">
                      {loadingDropdowns ? 'Loading departments...' : '-- Select Department --'}
                    </option>
                    {departments.map((dept) => (
                      <option key={dept._id} value={dept._id}>
                        {dept.departmentName} ({dept.code})
                      </option>
                    ))}
                  </select>
                  {errors.department && <p className="text-xs text-red-500 mt-1">{errors.department.message}</p>}
                </div>

                {/* Designation Input */}
                <div>
                  <label className="block text-xs font-medium text-gray-700 mb-1">Designation *</label>
                  <input
                    type="text"
                    placeholder="Under Secretary"
                    {...register('designation', { required: 'Designation is required' })}
                    className="w-full px-3 py-2 border border-gray-300 rounded-md text-sm outline-none focus:ring-2 focus:ring-blue-200"
                  />
                  {errors.designation && <p className="text-xs text-red-500 mt-1">{errors.designation.message}</p>}
                </div>

                {/* PayScale Dropdown */}
                <div>
                  <label className="block text-xs font-medium text-gray-700 mb-1">Select Pay Scale *</label>
                  <select
                    {...register('payScale', { required: 'Please select a pay scale' })}
                    disabled={loadingDropdowns}
                    className="w-full px-3 py-2 border border-gray-300 rounded-md text-sm outline-none focus:ring-2 focus:ring-blue-200 bg-white"
                  >
                    <option value="">
                      {loadingDropdowns ? 'Loading pay scales...' : '-- Select Pay Scale --'}
                    </option>
                    {payScales.map((scale) => (
                      <option key={scale._id} value={scale._id}>
                        {scale.payLevel} (Grade Pay: ₹{scale.gradePay})
                      </option>
                    ))}
                  </select>
                  {errors.payScale && <p className="text-xs text-red-500 mt-1">{errors.payScale.message}</p>}
                </div>

                {/* Current Basic Pay */}
                <div>
                  <label className="block text-xs font-medium text-gray-700 mb-1">Current Basic Pay (₹) *</label>
                  <input
                    type="number"
                    placeholder="56100"
                    {...register('currentBasicPay', { required: 'Basic pay required', valueAsNumber: true })}
                    className="w-full px-3 py-2 border border-gray-300 rounded-md text-sm outline-none focus:ring-2 focus:ring-blue-200"
                  />
                  {errors.currentBasicPay && <p className="text-xs text-red-500 mt-1">{errors.currentBasicPay.message}</p>}
                </div>

                {/* Date of Joining */}
                <div>
                  <label className="block text-xs font-medium text-gray-700 mb-1">Date of Joining *</label>
                  <input
                    type="date"
                    {...register('dateOfJoining', { required: 'Joining date required' })}
                    className="w-full px-3 py-2 border border-gray-300 rounded-md text-sm outline-none focus:ring-2 focus:ring-blue-200"
                  />
                  {errors.dateOfJoining && <p className="text-xs text-red-500 mt-1">{errors.dateOfJoining.message}</p>}
                </div>

                {/* Retirement Date */}
                <div>
                  <label className="block text-xs font-medium text-gray-700 mb-1">Retirement Date *</label>
                  <input
                    type="date"
                    {...register('retirementDate', { required: 'Retirement date required' })}
                    className="w-full px-3 py-2 border border-gray-300 rounded-md text-sm outline-none focus:ring-2 focus:ring-blue-200"
                  />
                  {errors.retirementDate && <p className="text-xs text-red-500 mt-1">{errors.retirementDate.message}</p>}
                </div>
              </div>
            </div>
          )}

          {/* STEP 4: POSTING LOCATION */}
          {currentStep === 4 && (
            <div className="space-y-4">
              <h3 className="text-md font-semibold text-slate-700 border-b pb-2">
                4. Posting Location
              </h3>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                <div>
                  <label className="block text-xs font-medium text-gray-700 mb-1">City *</label>
                  <input
                    type="text"
                    placeholder="New Delhi"
                    {...register('currentPostingLocation.city', { required: 'City is required' })}
                    className="w-full px-3 py-2 border border-gray-300 rounded-md text-sm outline-none focus:ring-2 focus:ring-blue-200"
                  />
                  {errors.currentPostingLocation?.city && (
                    <p className="text-xs text-red-500 mt-1">{errors.currentPostingLocation.city.message}</p>
                  )}
                </div>

                <div>
                  <label className="block text-xs font-medium text-gray-700 mb-1">State *</label>
                  <input
                    type="text"
                    placeholder="Delhi"
                    {...register('currentPostingLocation.state', { required: 'State is required' })}
                    className="w-full px-3 py-2 border border-gray-300 rounded-md text-sm outline-none focus:ring-2 focus:ring-blue-200"
                  />
                  {errors.currentPostingLocation?.state && (
                    <p className="text-xs text-red-500 mt-1">{errors.currentPostingLocation.state.message}</p>
                  )}
                </div>

                <div>
                  <label className="block text-xs font-medium text-gray-700 mb-1">Office Address *</label>
                  <input
                    type="text"
                    placeholder="Lodhi Road"
                    {...register('currentPostingLocation.officeAddress', { required: 'Address is required' })}
                    className="w-full px-3 py-2 border border-gray-300 rounded-md text-sm outline-none focus:ring-2 focus:ring-blue-200"
                  />
                  {errors.currentPostingLocation?.officeAddress && (
                    <p className="text-xs text-red-500 mt-1">{errors.currentPostingLocation.officeAddress.message}</p>
                  )}
                </div>
              </div>
            </div>
          )}
        </form>
      </div>

      {/* FOOTER ACTIONS */}
      <div className="p-4 bg-slate-50 border-t border-gray-200 shrink-0 flex items-center justify-between">
        <button
          type="button"
          onClick={handlePrevious}
          disabled={currentStep === 1}
          className="px-4 py-2 border border-gray-300 rounded-lg text-xs font-medium text-gray-700 bg-white hover:bg-gray-50 disabled:opacity-40 disabled:cursor-not-allowed"
        >
          Previous
        </button>

        <div className="flex items-center space-x-3">
          <button
            type="button"
            onClick={handleSaveDraft}
            className="px-4 py-2 border border-slate-300 rounded-lg text-xs font-medium text-slate-700 bg-white hover:bg-slate-100 shadow-sm"
          >
            Save Draft
          </button>

          {currentStep < TOTAL_STEPS ? (
            <button
              type="button"
              onClick={handleNext}
              className="px-5 py-2 bg-blue-600 hover:bg-blue-700 text-white rounded-lg text-xs font-medium shadow-sm transition"
            >
              Next Step
            </button>
          ) : (
            <button
              type="submit"
              form="paginated-form"
              disabled={isSubmitting}
              className="px-6 py-2 bg-emerald-600 hover:bg-emerald-700 text-white rounded-lg text-xs font-medium shadow-sm transition disabled:bg-emerald-300"
            >
              {isSubmitting ? 'Submitting...' : 'Submit Final Application'}
            </button>
          )}
        </div>
      </div>

    </div>
    </div>
  
  );
};

export default PaginatedEmployeeForm;