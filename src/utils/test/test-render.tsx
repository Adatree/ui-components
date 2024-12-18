import React, { ReactElement } from 'react';
import { render, RenderOptions } from '@testing-library/react';
import { CopyProvider } from '../../context/copy.context';
import { CopyBuilder } from '../../copy/copy';
import { Helper } from '../helper/helper';
import { DataRecipientsProvider } from '../../context/data-recipient.context';
import { ThemeProvider } from '../../providers/theme.provider';
import { defaultTheme } from '../../providers/themes/app.theme';
import { TestUtil } from './test.util';
import { Industry } from '@adatree/react-api-sdk';
import { AnalyticsProvider } from '../../context/analytics.context';

const AddProviders = ({ children }: { children: React.ReactElement }) => {
  const dataRecipients = TestUtil.testData.dataRecipient.all();
  const accreditationNum = 'ADR-1234-1234';

  const handleAnalyticsOnTrack = (event: string, id: string, description: string, action: string, value?: string) => {
    console.log(`Dummy test render analytics track called with '${event}', '${id}', '${description}', '${action}' and '${value}'`);
  };

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
          <AnalyticsProvider onTrack={handleAnalyticsOnTrack}>{children}</AnalyticsProvider>
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
