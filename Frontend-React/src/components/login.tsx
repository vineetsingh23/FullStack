import { CardFooter } from "./ui/card"


export default function Login() {
  return (
    <div className="item-center justify-center flex bg-slate-800">
      <div className="flex sm:min-w-md items-center justify-center h-screen ">
        <form className="border px-4 py-2 rounded-md border-gray-500 bg-white shadow-xl min-w-md">
          <div className="grid grid-cols-1 gap-4">
            <h1 className="text-center font-bold text-xl border-b-2 ">Login form</h1>

         <div className=" flex flex-col mt-4">
           <label htmlFor="email">Email</label>
           <input type="text" placeholder="email"className="border px-4 py-1.5 rounded border-gray-300 focus:ring-2 focus:ring-gray-400" />
          </div>
            <div className=" flex flex-col">
           <label htmlFor="email">Password</label>
           <input type="text" placeholder="password"className="border px-4 py-1.5 rounded border-gray-300 focus:ring-2 focus:ring-gray-400" />
          </div>
         
<div className="flex justify-between px-4 my-4 bg-gray-200 py-3 ">
        
            <button type="reset" className="border border-gray-600 px-4 py-1.5 rounded">Reset</button>
            <button className="border border-blue-600 px-4 py-1.5 rounded">Submit</button>
</div>
          
      
         </div>
        </form>
      </div>
      
    </div>
  )
}
 
