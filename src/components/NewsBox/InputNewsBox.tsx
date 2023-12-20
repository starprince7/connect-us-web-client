import { useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { createNews } from '../../store/news/reducer'
import { selectNews } from '../../store/news/reducer'
import { getNewsAsyncAction } from '../../store/news/reducer'

export default function InputNewsBox() {
  const dispatch = useDispatch()
  const { requestStatus } = useSelector(selectNews)
  const [title, setTitle] = useState('')
  const [content, setContent] = useState('')

  const handleNewsMessageSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    dispatch(createNews({ content, title }) as any)
    setTimeout(() => dispatch(getNewsAsyncAction({ page: 1 }) as any), 500)
    setTitle('')
    setContent('')
  }

  return (
    <div className='drop-shadow-xl absolute bottom-1 left-0 w-full px-3 z-10'>
      <form
        onSubmit={handleNewsMessageSubmit}
        className='rounded-lg flex items-center border space-x-2 p-1.5 bg-white'
      >
        <div className='w-full'>
          <input
            required
            type='text'
            name='title'
            value={title}
            placeholder='Title'
            className='rounded-md font-bold text-lg capitalize w-full outline-none px-2 py-3'
            onChange={(e) => setTitle(e.target.value)}
          />
          <textarea
            required
            name='content'
            value={content}
            rows={1}
            placeholder='Body...'
            className='w-full outline-none px-2 py-2.5'
            onChange={(e) => setContent(e.target.value)}
          ></textarea>
        </div>
        <button type='submit' className='rounded-lg bg-black py-2 px-10 font-semibold text-white'>
          {requestStatus == 'loading' ? 'Sending...' : 'Send'}
        </button>
      </form>
    </div>
  )
}
