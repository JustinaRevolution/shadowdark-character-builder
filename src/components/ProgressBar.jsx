export default function ProgressBar({ steps, current }) {
  return (
    <div className="w-full flex items-center gap-1 mb-8">
      {steps.map((label, i) => (
        <div key={label} className="flex-1 flex flex-col items-center gap-1">
          <div
            className={`h-2 w-full rounded-full ${
              i < current ? 'bg-amber-500' : i === current ? 'bg-amber-300' : 'bg-stone-700'
            }`}
          />
          <span className={`text-xs hidden sm:block ${i === current ? 'text-amber-300' : 'text-stone-500'}`}>
            {label}
          </span>
        </div>
      ))}
    </div>
  )
}
