import React from 'react';
import { ComponentStory, ComponentMeta } from '@storybook/react';
import { ConsentListItem, TestUtil, Status } from '../../lib';

export default {
  title: 'Components/Atoms/Consent list item',
  component: ConsentListItem,
  argTypes: {
    backgroundColor: { control: 'color' },
  },
} as ComponentMeta<typeof ConsentListItem>;

const Template: ComponentStory<typeof ConsentListItem> = (args) => <ConsentListItem {...args} />;

export const Active = Template.bind({});
Active.args = {
  consent: TestUtil.testData.consent.active(),
  consentUrl: `/some-url/${TestUtil.testData.consent.active().consentId}`,
  dataHolderLogoUrl: TestUtil.testData.dataHolder.yellowBank().logoUri,
};

export const Expired = Template.bind({});
Expired.args = {
  consent: { ...TestUtil.testData.consent.active(), status: Status.EXPIRED },
  consentUrl: `/some-url/${TestUtil.testData.consent.active().consentId}`,
  dataHolderLogoUrl: TestUtil.testData.dataHolder.yellowBank().logoUri,
};

export const Requested = Template.bind({});
Requested.args = {
  consent: { ...TestUtil.testData.consent.active(), status: Status.REQUESTED },
  consentUrl: `/some-url/${TestUtil.testData.consent.active().consentId}`,
  dataHolderLogoUrl: TestUtil.testData.dataHolder.yellowBank().logoUri,
};

export const Revoked = Template.bind({});
Revoked.args = {
  consent: {
    ...TestUtil.testData.consent.active(),
    status: Status.REVOKED,
    revoked: new Date(2021, 10, 2).toISOString(),
  },
  consentUrl: `/some-url/${TestUtil.testData.consent.active().consentId}`,
  dataHolderLogoUrl: TestUtil.testData.dataHolder.yellowBank().logoUri,
};
