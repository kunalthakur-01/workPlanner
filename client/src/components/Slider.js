"use client"

function Slider({ value, onChange, min = 0, max = 100, step = 1, className = "" }) {
  const handleChange = (e) => {
    onChange(Number.parseInt(e.target.value, 10))
  }

  return (
    <div className={`w-full ${className}`}>
      <input
        type="range"
        min={min}
        max={max}
        step={step}
        value={value}
        onChange={handleChange}
        className="w-full h-2 bg-gray-200 rounded-lg appearance-none cursor-pointer"
      />
    </div>
  )
}

export default Slider
