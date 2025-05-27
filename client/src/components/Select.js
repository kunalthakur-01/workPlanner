"use client"

function Select({ options, value, onChange, placeholder = "Select an option", className = "", id, ...props }) {
  return (
    <select
      id={id}
      value={value}
      onChange={onChange}
      className={`
        w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm
        focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500
        ${className}
      `}
      {...props}
    >
      <option value="" disabled>
        {placeholder}
      </option>
      {options.map((option) => (
        <option key={option.value} value={option.value}>
          {option.label}
        </option>
      ))}
    </select>
  )
}

export default Select
