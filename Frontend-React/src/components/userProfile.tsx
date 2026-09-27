import React from 'react'

export default function userProfile() {
  return (
    <div className='max-w-md flex justify-center'>
        <div className="select-container md:min-w-sm">
 
  <select className="select-input">
    <option value="">Select an option...</option>
    <option value="1">Option One</option>
    <option value="2">Option Two</option>
  </select>

  {/* <!-- Custom Arrow Box with Separator Line --> */}
  <div className="select-icon-box">
    {/* <!-- Custom Arrow Icon (SVG) --> */}
    <svg className="w-5 h-5 text-gray-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
      <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 9l-7 7-7-7" />
    </svg>
  </div>
</div>


    </div>
  )
}
