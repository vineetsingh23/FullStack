import { useEffect, useState } from 'react'
import type {IDepartmentOption} from '../types/employee'

export default function login() {
  const [departments, setDepartments] = useState<IDepartmentOption[]>([])
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);


  useEffect (()=>{
    const fetchDepartments = async () =>{
      try {
        const response = await fetch('http://localhost:8080/api/departments')
        if (!response.ok){
          throw new Error(`HTTP ERROR STATUS: ${response.status}`)
        }
        const result = await response.json();
        setDepartments(result.data)
      } catch (err) {
        setError(err instanceof Error ? err.message : 'Failed to load departments')
      } finally {
        setLoading(false)
      }

    
    }
    fetchDepartments();
  },[])
  return (
    <div className='text-center flex mx-auto justify-center flex-col w-1/2'>

      <h1 >List of departments</h1>

      <select name="departments" id="department">

        <option value="department">--select dep--
             {loading && <p>Loading departments...</p>}

        </option>

      

      {departments.map((dep)=>(
        <option key={dep._id}>{dep.departmentName}</option>
      ))}


      </select>
      {error && <p>{error}</p>}

   

   
   
    
    </div>
  )
}
