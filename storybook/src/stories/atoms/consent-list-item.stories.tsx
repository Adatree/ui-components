import React from 'react';
import { ComponentStory, ComponentMeta } from '@storybook/react';
import { ConsentListItem, TestUtil } from '../../lib';

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
  consent: TestUtil.testData.consent.expired(),
  consentUrl: `/some-url/${TestUtil.testData.consent.active().consentId}`,
  dataHolderLogoUrl: TestUtil.testData.dataHolder.yellowBank().logoUri,
};

export const Requested = Template.bind({});
Requested.args = {
  consent: TestUtil.testData.consent.requested(),
  consentUrl: `/some-url/${TestUtil.testData.consent.active().consentId}`,
  dataHolderLogoUrl: TestUtil.testData.dataHolder.redBank().logoUri,
};

export const Revoked = Template.bind({});
Revoked.args = {
  consent: TestUtil.testData.consent.revoked(),
  consentUrl: `/some-url/${TestUtil.testData.consent.active().consentId}`,
  dataHolderLogoUrl: TestUtil.testData.dataHolder.redBank().logoUri,
};
