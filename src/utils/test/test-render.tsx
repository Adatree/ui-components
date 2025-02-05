import React, { ReactNode } from 'react';
import { render, RenderOptions } from '@testing-library/react';
import { CopyProvider } from '../../context/copy.context';
import { CopyBuilder } from '../../copy/copy';
import { Helper } from '../helper/helper';
import { DataRecipientsProvider } from '../../context/data-recipient.context';
import { ThemeProvider } from '../../providers/theme.provider';
import { defaultTheme } from '../../providers/themes/app.theme';
import { TestUtil } from './test.util';
import { Industry } from '@adatree/react-api-sdk-dashboard';
import { AnalyticsProvider } from '../../context/analytics.context';

const AddProviders = ({ children }: { children: React.ReactNode }) => {
  const dataRecipients = TestUtil.testData.dataRecipient.all();
  const accreditationNum = 'ADR-1234-1234';

  const handleAnalyticsOnTrack = (event: string) => {
    console.log(`Dummy test render analytics track called with event '${event}'`);
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

const customRender = (ui: ReactNode, options?: Omit<RenderOptions, 'wrapper'>) =>
  render(ui, { wrapper: AddProviders, ...options });

// re-export everything
export { fireEvent, screen } from '@testing-library/react';

// override render method
export { customRender as render };
