import * as React from 'react';
import '@testing-library/jest-dom';
import { Accreditation } from './accreditation.atom';
import { render, screen } from '../../utils/test/test-render';

test('Render the Accreditation component without under CDR Principal', () => {
  const companyName = 'Company Name';
  const accreditationNumber = '1234';

  render(
    <Accreditation accreditationNumber={accreditationNumber} companyName={companyName} underCdrPrincipal={false} />,
  );
  expect(screen.queryByText(companyName)).toBeVisible();
  expect(screen.queryByText(`Accredited Data Recipient: ${accreditationNumber}`)).toBeVisible();
});
