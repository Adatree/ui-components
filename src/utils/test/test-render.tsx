import React, { ReactElement } from 'react';
import { render, RenderOptions } from '@testing-library/react';
import { CopyProvider } from '../../context/copy.context';
import { CopyBuilder } from '../../copy/copy';
import { Helper } from '../helper/helper';
import { DataRecipientsProvider } from '../../context/data-recipient.context';
import { ThemeProvider } from '../../providers/theme.provider';
import { defaultTheme } from '../../providers/themes/app.theme';
import { TestUtil } from './test.util';
import { Industry } from '../../generated/consent';

const AddProviders = ({ children }: { children: React.ReactNode }) => {
  const dataRecipients = TestUtil.testData.dataRecipient.all();
  const accreditationNum = 'ADR-1234-1234';

  return (
    <ThemeProvider theme={defaultTheme}>
      <DataRecipientsProvider accreditationNum={accreditationNum} initialDataRecipients={dataRecipients}>
        <CopyProvider
          initialCopy={CopyBuilder.generateCopy(
            Helper.getAdrDataRecipients(dataRecipients),
            Helper.getPrimaryDataRecipients(dataRecipients),
            Industry.Banking,
          )}
        >
          {children}
        </CopyProvider>
      </DataRecipientsProvider>
    </ThemeProvider>
  );
};

const customRender = (ui: ReactElement, options?: Omit<RenderOptions, 'wrapper'>) =>
  render(ui, { wrapper: AddProviders, ...options });

// re-export everything
export * from '@testing-library/react';

// override render method
export { customRender as render };
