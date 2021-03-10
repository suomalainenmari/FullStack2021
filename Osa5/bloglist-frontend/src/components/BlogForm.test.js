import React from 'react'
import { render, fireEvent } from '@testing-library/react'
import '@testing-library/jest-dom/extend-expect'
import { prettyDOM } from '@testing-library/dom'
import BlogForm from './BlogForm'

test('BlogForm component sends right data to the callback-function when a new blog is being created', () => {
  let component
  const addBlog = jest.fn()


  component = render(
    <BlogForm createBlog={addBlog} />
  )
  const author = component.container.querySelector('#author')
  const title = component.container.querySelector('#title')
  const url = component.container.querySelector('#url')
  const form = component.container.querySelector('form')

  fireEvent.change(author, {
    target: { value: 'Mari Suomalainen' }
  })
  fireEvent.change(title, {
    target: { value: 'Pieni elämä' }
  })
  fireEvent.change(url, {
    target: { value: 'www.kuusikonkertomus.fi' }
  })

  console.log(prettyDOM(form))
  fireEvent.submit(form)

  expect(addBlog.mock.calls[0][0].author).toBe('Mari Suomalainen')
  expect(addBlog.mock.calls[0][0].title).toBe('Pieni elämä')
  expect(addBlog.mock.calls[0][0].url).toBe('www.kuusikonkertomus.fi')
  expect(addBlog.mock.calls).toHaveLength(1)
})


