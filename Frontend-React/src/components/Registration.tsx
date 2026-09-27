
import {GENDER_OPTIONS,EMPLOYMENT_STATUS,EMPLOYMENT_TYPE,CADRE} from '../constants/constants'
import {useEffect, useState} from 'react'
import type {IDepartmentOption} from '../types/employee.ts'


export default function Registration() {
  const [departments, setDepartments] = useState<IDepartmentOption[]>([]);
  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState<boolean>(false)

  


 useEffect(()=>{
    const fetchDepartments = async () => {
      try{
        const response = await fetch('http://localhost:8080/api/departments')
        if(!response.ok){
          throw new Error(`HTTP ERROR STATUS : ${response.status}`)

        }
        const result = await response.json();
        setDepartments(result.data || [])
     
      }
       catch (err) {
        setError(err instanceof Error ? err.message : 'Failed to load departments')
      } finally {
        setLoading(true)
      }
    }
    fetchDepartments()
 },[])

 if(error){
  console.log(`Error occured during fetching data : ${error}`)
 }

 if(loading){
  <div>Data is loading....</div>
 }

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
                  {GENDER_OPTIONS.map((gender)=>(

                  <option key={gender}>{gender}</option>
                  ))}
               
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
                      {departments.map((dept)=>(

                      <option key={dept._id}>{dept.departmentName}</option>
                      ))}
                      
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
                      {EMPLOYMENT_TYPE.map((emp)=>(

                      <option key={emp}>{emp}</option>
                      ))}
                   
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
                      {CADRE.map((cadre)=>(
                        <option key={cadre}>{cadre}</option>
                      ))}
               
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
                      {EMPLOYMENT_STATUS.map((emp_status)=>(

                      <option key={emp_status}>{emp_status}</option>
                      ))}
                      
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
