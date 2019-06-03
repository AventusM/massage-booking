import React from 'react'
import 'jest-dom/extend-expect'
import { render, cleanup } from 'react-testing-library'
import Timelist from './Timelist'

afterEach(cleanup)

test('Timelist renders content', () => {
  const list = [
    {
      id: 1,
      week: 1,
      appointment_id: 1,
      startTime: 8.15,
      day: 1,
    },
    {
      id: 5,
      week: 1,
      appointment_id: 1,
      startTime: 8.3,
      day: 1,
    },
    {
      id: 2,
      week: 1,
      appointment_id: 1,
      startTime: 9.15,
      day: 2,
    },

    {
      id: 3,
      week: 2,
      appointment_id: 2,
      startTime: 10.15,
      day: 1,
    },

    {
      id: 4,
      week: 2,
      appointment_id: null,
      startTime: 11.15,
      day: 2,
    },
  ]

  const component = render(<Timelist list={list} />)

  expect(component.container).toHaveTextContent(
    '8.15',
    '8.30',
    '9.15',
    '10.15',
    '11.15',
    'Reserve'
  )
})

test('Timelist renders content', () => {
  const list = []

  const component = render(<Timelist list={list} />)

  expect(component.container).toHaveTextContent(
    'No appointments available for selected day'
  )
})

test('Timelist includes button ', () => {
  const list = [
    {
      id: 1,
      week: 1,
      appointment_id: 1,
      startTime: 8.15,
      day: 1,
    },
  ]

  const component = render(<Timelist list={list} />)

  const button = component.getByText('Reserve')

  expect(button).toBeDefined()

  expect(component.container).toHaveTextContent('8.15')
})

test('Timelist includes clickable button ', () => {
  const list = [
    {
      id: 1,
      week: 1,
      appointment_id: 1,
      startTime: 8.15,
      day: 1,
    },
  ]

  const component = render(<Timelist list={list} />)

  const button = component.getByText('Reserve')

  expect(component.container).toHaveTextContent('8.15')
})
