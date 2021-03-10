import React from 'react'
import { render, fireEvent } from '@testing-library/react'
import '@testing-library/jest-dom/extend-expect'
import { prettyDOM } from '@testing-library/dom'
import Blog from './Blog'

describe('Blog component ', () => {

  let component
  let likeBlog = jest.fn()

  beforeEach(() => {

    const user = {
      name: 'Testi nimi',
      username: 'testiusername'
    }

    const blog = {
      title: 'testiotsikko',
      author: 'testikirjoittaja',
      url: 'www.testiurl.com',
      likes: 3,
      user:user
    }


    component = render(
      <Blog blog={blog} user={user} updateBlog={likeBlog} />
    )
  })

  test('renders only blog title and blog author on default', () => {
    const div = component.container.querySelector('.hiddenBlogFields')
    console.log(prettyDOM(div))
    expect(div).toHaveStyle('display:none')
  })

  test('renders all fields when view-button is pushed', () => {
    const button = component.getByText('view')
    fireEvent.click(button)

    const div = component.container.querySelector('.hiddenBlogFields')
    const otherdiv = component.container.querySelector('.defaultBlogFields')
    console.log(prettyDOM(div))
    console.log(prettyDOM(otherdiv))

    expect(div).not.toHaveStyle('display: none')
    expect(otherdiv).not.toHaveStyle('display: none')
  })

  test('if like-button is pressed twice, the event handler is being called twice', () => {
    const button = component.getByText('like')
    fireEvent.click(button)
    fireEvent.click(button)
    expect(likeBlog.mock.calls).toHaveLength(2)


  })

})