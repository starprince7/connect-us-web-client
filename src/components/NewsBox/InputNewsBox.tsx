export default function InputNewsBox() {
  return (
    <div className='drop-shadow-xl absolute bottom-1 left-0 w-full px-3 z-10'>
      <div className='rounded-lg flex items-center border space-x-2 p-1.5 bg-white'>
        <input
          type='text'
          className='w-full outline-none px-2 py-2.5'
          placeholder='Write a message...'
        />
        <button type='submit' className='rounded-lg bg-black py-2 px-10 font-semibold text-white'>
          Send
        </button>
      </div>
    </div>
  )
}
