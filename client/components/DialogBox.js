import React from 'react'

const DialogBox = ({inputs,title,handler}) => {
  return (
    
      <div className="inset-0 bg-black/10 absolute grid place-items-center z-[99]">
        <div className="bg-white p-4 rounded w-[500px]">
          <div className="mb-4 flex justify-between">{title || "No title set"} <span className="cursor-pointer" onClick={()=>handler(false)}>x</span></div>
          <div  className="grid gap-y-2">
            {
              inputs.map((item,key)=>{
                return(
                  <div key={key}>
                  <label className="text-xs text-gray-500">{item.name}</label>
                  <input placeholder={item.name} type={item.type} name={item.name.split(" ").join("")} className="text-sm border rounded py-2 w-full px-3"/>
                  </div>
                )
              })
            }
            <button onClick={()=>alert("Hello")} className="bg-primary text-white px-4 py-2 rounded text-sm">Create project</button>

          </div>
        </div>

      </div>
  )
}

export default DialogBox
