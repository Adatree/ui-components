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
  consent: TestUtil.getTestDataConsentResponse(),
  url: `/some-url/${TestUtil.getTestDataConsentResponse().consentId}`,
};

export const Expired = Template.bind({});
Expired.args = {
  consent: { ...TestUtil.getTestDataConsentResponse(), status: Status.EXPIRED },
  url: `/some-url/${TestUtil.getTestDataConsentResponse().consentId}`,
};

export const Requested = Template.bind({});
Requested.args = {
  consent: { ...TestUtil.getTestDataConsentResponse(), status: Status.REQUESTED },
  url: `/some-url/${TestUtil.getTestDataConsentResponse().consentId}`,
};

export const Revoked = Template.bind({});
Revoked.args = {
  consent: {
    ...TestUtil.getTestDataConsentResponse(),
    status: Status.REVOKED,
    revoked: new Date(2021, 10, 2).toISOString(),
  },
  url: `/some-url/${TestUtil.getTestDataConsentResponse().consentId}`,
};
