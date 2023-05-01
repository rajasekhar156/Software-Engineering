//import React from 'react'
import {render, screen} from '@testing-library/react'
import '@testing-library/jest-dom'
import userEvent from '@testing-library/user-event'
import Sum  from './sum'

test('click', () => {
    
  render(<Sum/>);
  //let c = screen.getByLabelText('Check');
  let c = screen.getByTestId('id2')
  expect(c).toHaveTextContent('Check');
})