

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
                <label htmlFor="date" >Aadhaar Number</label>
                <input type="number" placeholder="aadhaar number"  className="border border-gray-400 rounded px-2 py-1.5"/>
              </div>
              
              
            </div>
          </form>
        </div>
      </div>






    </div>
  )
}
