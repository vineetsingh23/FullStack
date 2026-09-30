



import React from "react";

interface Option {
  label: string;
  value: string | number;
}

interface CustomSelectProps extends React.SelectHTMLAttributes<HTMLSelectElement> {
  options: Option[];
  placeholder?: string;
}

export function CustomSelect({ options, placeholder, ...props }: CustomSelectProps) {
  return (
    <div className="relative flex items-center rounded-lg border border-gray-300 bg-white shadow-sm
           focus-within:border-blue-500 focus-within:ring-2 focus-within:ring-blue-500/20">
      {/* Native Select with custom styling */}
      <select className="w-full appearance-none rounded-lg bg-transparent py-2.5 pl-3.5 pr-14 
           text-gray-900 focus:outline-none" {...props}>
        {placeholder && <option value="">{placeholder}</option>}
        {options.map((option) => (
          <option key={option.value} value={option.value}>
            {option.label}
          </option>
        ))}
      </select>

      {/* Icon Box with Separator Line */}
      <div className="absolute right-0 top-0 bottom-0 flex w-20 items-center justify-center 
          px-3 bg-gray-100 rounded-r-lg border-l border-gray-300 pointer-events-none">
        <svg className="w-5 h-5 text-gray-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 9l-7 7-7-7" />
        </svg>
      </div>
    </div>
  );
}



// export default function CustomSelect() {
//   return (
//     <div className="min-w-sm">
//         <div className="relative flex items-center rounded-lg border border-gray-300 bg-white shadow-sm
//            focus-within:border-blue-500 focus-within:ring-2 focus-within:ring-blue-500/20">
//            <select  className="w-full appearance-none rounded-lg bg-transparent py-2.5 pl-3.5 pr-14 
//            text-gray-900 focus:outline-none" >
//             <option value="department">select department</option>
//             <option value="department">select department</option>
//             <option value="department">select department</option>
//         </select>
//         <div className="absolute right-0 top-0 bottom-0 flex w-20 items-center justify-center 
//            px-3 bg-gray-100 rounded-r-lg border-l border-gray-300 pointer-events-none">
            
//                 <svg className="w-5 h-5 text-gray-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
//       <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 9l-7 7-7-7" />
//     </svg>
//         </div>
//     </div>
//     </div>
//   )
// }
