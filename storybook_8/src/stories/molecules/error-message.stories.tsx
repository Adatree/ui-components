import React from 'react';
import type { Meta, StoryObj } from '@storybook/react';
import { ErrorMessage } from '../../lib';

const meta: Meta<typeof ErrorMessage> = {
  title: 'Components/Molecules/Error Message',
  component: ErrorMessage,
  parameters: {
    layout: 'centered',
  },
  tags: ['autodocs'],
};

export default meta;
type Story = StoryObj<typeof ErrorMessage>;

export const ApiError: Story = {
  args: {
    code: '503',
    data: {
      request: 'GET',
      response: {
        status: 503,
        message: 'Server encountered an error',
      },
    },
    message: 'Server encountered an error.',
    timeStamp: new Date(),
    type: 'API Error',
    url: 'api.adatree.com.au/information',
  },
};
export const GenericError: Story = {
  args: {
    code: 'ERR_001',
    message: 'This is a generic error.',
  },
};
export const WithSupportContact: Story = {
  args: {
    code: 'ERR_001',
    message: 'This is a generic error.',
    supportContact: 'support@yourcompany.com',
  },
};
export const WithLogErrorData: Story = {
  args: {
    code: 'ERR_001',
    message: 'This is a long data error.',
    data: `Error: React error
  at ConsentList (consent-list.organism.tsx:25:1)
  at renderWithHooks (react-dom.development.js:14985:1)
  at mountIndeterminateComponent (react-dom.development.js:17811:1)
  at beginWork (react-dom.development.js:19049:1)
  at HTMLUnknownElement.callCallback (react-dom.development.js:3945:1)
  at Object.invokeGuardedCallbackDev (react-dom.development.js:3994:1)
  at invokeGuardedCallback (react-dom.development.js:4056:1)
  at beginWork$1 (react-dom.development.js:23964:1)
  at performUnitOfWork (react-dom.development.js:22776:1)
  at workLoopSync (react-dom.development.js:22707:1)
  at renderRootSync (react-dom.development.js:22670:1)
  at performSyncWorkOnRoot (react-dom.development.js:22293:1)
  at react-dom.development.js:11327:1
  at unstable_runWithPriority (scheduler.development.js:468:1)
  at runWithPriority$1 (react-dom.development.js:11276:1)
  at flushSyncCallbackQueueImpl (react-dom.development.js:11322:1)
  at flushSyncCallbackQueue (react-dom.development.js:11309:1)
  at flushSync (react-dom.development.js:22467:1)
  at scheduleRefresh (react-dom.development.js:24429:1)
  at Object.renderer.scheduleRefresh (react_devtools_backend.js:6413:16)
  at react-refresh-runtime.development.js:304:1
  at Set.forEach (<anonymous>)
  at Object.performReactRefresh (react-refresh-runtime.development.js:293:1)
  at RefreshUtils.js:62:1`,
  },
};
