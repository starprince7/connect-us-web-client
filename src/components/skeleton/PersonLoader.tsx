interface Props {
  className?: string
}
export function LoadingPersonSkeleton({ className }: Props) {
  return (
    <>
      {Array(6)
        .fill('')
        .map((_, i) => (
          <div className='animate-pulse' key={i}>
            <div className={`${className} w-[90vw] mx-3 sm:w-64 h-24 bg-gray-200 rounded-lg`}></div>
          </div>
        ))}
    </>
  )
}
