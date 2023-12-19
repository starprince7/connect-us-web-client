// Chat Text block
export default function RightSideTextBlockNews({
  textContent,
  title,
  isSystem,
}: {
  textContent: string
  title: string
  isSystem: boolean
}) {
  return (
    <div className='relative p-3 rounded-md w-fit max-w-[65%] sm:max-w-[50%] ml-auto bg-neutral-900 text-white mr-5'>
      <span className='absolute -right-2 rounded-sm top-3 w-10 h-8 rotate-45 bg-neutral-900'></span>
      {isSystem && (
        <p className='w-[92%] py-1 px-1 pr-12 text-xs italic text-gray-700'>~ System Event</p>
      )}
      <p className='w-[92%] text-lg font-bold my-1 px-1 pr-12 tracking-wide'>{title}</p>
      <p className='w-[92%] py-1 px-1 pr-12'>{textContent}</p>
    </div>
  )
}
