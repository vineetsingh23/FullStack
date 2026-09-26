

export default function Registration() {
  return (
    <div className='flex justify-center flex-col  items-center'>
      



      <div>
        <div>
          <h1>Registration Form</h1>
          <form>
            <div className="grid gap-4">
              <div className="flex flex-col">
                <label htmlFor="firstname">First Name</label>
                <input className="border border-gray-400 rounded px-2 py-1.5"/>
              </div>
               <div className="flex flex-col">
                <label htmlFor="lastname">Last Name</label>
                <input className="border border-gray-400 rounded px-2 py-1.5"/>
              </div>
               <div className="flex flex-col">
                <label htmlFor="date" >Date of Birth</label>
                <input type="date"  className="border border-gray-400 rounded px-2 py-1.5"/>
              </div>
              <div className="flex flex-col">
                <label htmlFor="select" >Gender</label>
                <select className="border border-gray-400 rounded px-2 py-1.5">
                  <option value="gender">--Select Gender--</option>
                  <option value="gender">Male</option>
                  <option value="gender">Female</option>
                  <option value="gender">Other</option>
                </select>
               
              </div>
                <div className="flex flex-col gap-2">
                <label htmlFor="date" >Address</label>
                <input type="text" placeholder="address 1"  className="border border-gray-400 rounded px-2 py-1.5"/>
                <input type="text" placeholder="address 2"  className="border border-gray-400 rounded px-2 py-1.5"/>
                <input type="text" placeholder="address 3"  className="border border-gray-400 rounded px-2 py-1.5"/>
                <input type="number" placeholder="pincode"  className="border border-gray-400 rounded px-2 py-1.5"/>

              </div>

              <div className="flex flex-col">
                <label htmlFor="date" >Aadhaar Number</label>
                <input type="number" placeholder="aadhaar number"  className="border border-gray-400 rounded px-2 py-1.5"/>
              </div>

              <div className="flex flex-col">
                <label htmlFor="pan" >PAN Number</label>
                <input type="number" placeholder="pan number"  className="border border-gray-400 rounded px-2 py-1.5"/>
              </div>

               <div className="flex flex-col">
                <label htmlFor="contact" >Mobile Number</label>
                <input type="number" placeholder="mobile number"  className="border border-gray-400 rounded px-2 py-1.5"/>
              </div>

                <div className="flex flex-col">
                <label htmlFor="department" >Department</label>
                    <select name="department" id="department" className="border border-gray-400 rounded px-2 py-1.5">
                      <option value="department">Select Department</option>
                      <option value="department">Operation</option>
                      <option value="department">Maintenance</option>
                      <option value="department">Project</option>
                      <option value="department">Civil</option>
                    </select>
                </div>

                  <div className="flex flex-col">
                <label htmlFor="designation" >Designation</label>
                <input type="text" placeholder="designation"  className="border border-gray-400 rounded px-2 py-1.5"/>
              </div>

                 <div className="flex flex-col">
                <label htmlFor="employmentType" >Employment Type</label>
                    <select name="employmentType" id="department" className="border border-gray-400 rounded px-2 py-1.5">
                      <option value="employmentType">Select Employment Type</option>
                      <option value="employmentType">Permanent</option>
                      <option value="employmentType">Contractual</option>
                      <option value="employmentType">Deputation</option>
                      <option value="employmentType">Probationary</option>
                    </select>
                </div>
              
                  <div className="flex justify-between">
                <label htmlFor="payscale" >Pay Scale</label>
                 <span>46000-125000</span>
              </div>

                <div className="flex flex-col gap-2">
                <label htmlFor="currentBasic" >Current Basic Pay</label>
                <input type="text" placeholder="current basic pay"  className="border border-gray-400 rounded px-2 py-1.5"/>
              </div>

                  <div className="flex flex-col">
                <label htmlFor="cadre" >Cadre</label>
                    <select name="cadre" id="cadre" className="border border-gray-400 rounded px-2 py-1.5">
                      <option value="cadre">Select Cadre</option>
                      <option value="cadre">Non supervisor</option>
                      <option value="cadre">Supervisor</option>
                      <option value="cadre">senior supervisor</option>
                      <option value="cadre">assistant manager</option>
                    </select>
                </div>

                 <div className="flex flex-col gap-2">
                <label htmlFor="doj" >Date of joining</label>
                <input type="date" placeholder="joining date"  className="border border-gray-400 rounded px-2 py-1.5"/>
              </div>

                <div className="flex flex-col gap-2">
                <label htmlFor="dor" >Date of Retirement</label>
                <input type="date" placeholder="retirement date"  className="border border-gray-400 rounded px-2 py-1.5"/>
              </div>

              <div className="flex flex-col gap-2">
                <label htmlFor="current posting" >Current Posting</label>
                <input type="text" placeholder="Current posting"  className="border border-gray-400 rounded px-2 py-1.5"/>
              </div>

               <div className="flex flex-col">
                <label htmlFor="status" >Employment Status</label>
                    <select name="status" id="department" className="border border-gray-400 rounded px-2 py-1.5">
                      <option value="status">Select Employment Status</option>
                      <option value="status">Active</option>
                      <option value="status">Transferred</option>
                      <option value="status">Suspended</option>
                      <option value="status">Retired</option>
                    </select>
                </div>

                
                  <div className="flex justify-between">
                <label htmlFor="reporting to" >Reporting Officer</label>
                 <span>AM: VK Verma</span>
              </div>

              
              
              
            </div>
          </form>
        </div>
      </div>






    </div>
  )
}
