export function LoadingPersonSkeleton() {
  return (
    <>
      {Array(6)
        .fill('')
        .map((_, i) => (
          <div className='animate-pulse' key={i}>
            <div className='w-full sm:w-64 h-24 bg-gray-200 rounded-lg'></div>
          </div>
        ))}
    </>
  )
}
