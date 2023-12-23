interface Props {
  className?: string
  numberOfSkeletons?: number
}
export function LoadingPersonSkeleton({ className, numberOfSkeletons = 6 }: Props) {
  return (
    <>
      {Array(numberOfSkeletons)
        .fill('')
        .map((_, i) => (
          <div className='animate-pulse' key={i}>
            <div className={`${className} w-[90vw] mx-3 sm:w-64 h-24 bg-gray-200 rounded-lg`}></div>
          </div>
        ))}
    </>
  )
}
