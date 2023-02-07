import * as React from 'react';
import '@testing-library/jest-dom';
import { render, fireEvent, screen } from '@testing-library/react';
import { Accordion } from './accordion.molecule';

test('Open the Accordion when the button is clicked', () => {
  const titleText = 'Accordion title';
  const contentText = 'Accordion content';
  render(<Accordion title={titleText} content={<p>{contentText}</p>} />);

  expect(screen.queryByText(contentText)).not.toBeVisible();

  fireEvent.click(screen.getByText(/title/i));

  expect(screen.queryByText(contentText)).toBeVisible();
});
