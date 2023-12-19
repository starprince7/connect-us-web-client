// Chat Message Text block
export default function LeftSideTextBlockNews({
  textContent,
  title,
  isSystem,
}: {
  textContent: string
  title: string
  isSystem: boolean
}) {
  return (
    <div className='relative p-3 rounded-md w-fit  max-w-[65%] sm:max-w-[50%] bg-gray-300 ml-5'>
      <span className='absolute -left-2 rounded-sm top-3 w-10 h-8 rotate-45 bg-gray-300'></span>
      {isSystem && (
        <p className='w-[92%] ml-3 py-1 px-4 text-xs italic text-gray-700'>~ System Event</p>
      )}
      <p className='w-[92%] text-lg font-bold ml-4 my-1 px-4'>{title}</p>
      <p className='w-[92%] ml-4 py-1 px-4'>{textContent}</p>
    </div>
  )
}
