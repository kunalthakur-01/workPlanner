import React from 'react'
import { useForm } from 'react-hook-form'

const DialogBox = ({ inputs, title, handler }) => {
  const { register, handleSubmit } = useForm()
  const submitForm = (d) => {
    alert(JSON.stringify(d))
  }
  return (
    
      <div className="inset-0 bg-black/10 absolute grid place-items-center z-[99]">
        <div className="bg-white p-4 rounded w-[500px]">
          <div className="mb-4 flex justify-between">{title || "No title set"} <span className="cursor-pointer" onClick={()=>handler(false)}>x</span></div>
          <div  className="grid gap-y-2">
          <form onSubmit={handleSubmit(submitForm)}>  
          {
              inputs.map((item,key)=>{
                return(
                  <div key={key}>
                  <label className="text-xs text-gray-500">{item.name}</label>
                  <input placeholder={item.name} type={item.type} {...register(item.name.split(" ").join(""))} className="text-sm border rounded py-2 w-full px-3"/>
                  </div>
                )
              })
            }
            <button className="bg-primary text-white px-4 py-2 rounded text-sm mt-4 w-full">Create project</button>
            </form>  
          </div>
        </div>

      </div>
  )
}

export default DialogBox
