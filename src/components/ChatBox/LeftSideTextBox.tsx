// Chat Text block
export default function LeftSideTextBlockChat({ textContent }: { textContent: string }) {
  return (
    <div className='relative p-3 rounded-md w-fit  max-w-[65%] sm:max-w-[50%] bg-gray-300 ml-5'>
      <span className='absolute -left-2 rounded-sm top-3 w-10 h-8 rotate-45 bg-gray-300'></span>
      <p className='w-[92%] ml-auto py-2 px-4'>{textContent}</p>
    </div>
  )
}
