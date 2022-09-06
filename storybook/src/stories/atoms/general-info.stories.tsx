import React from 'react';
import { ComponentStory, ComponentMeta } from '@storybook/react';
import { GeneralInformation } from '../../lib';

export default {
  title: 'Components/Atoms/General Information',
  component: GeneralInformation,
  argTypes: {
    backgroundColor: { control: 'color' },
  },
} as ComponentMeta<typeof GeneralInformation>;

const Template: ComponentStory<typeof GeneralInformation> = (args) => <GeneralInformation {...args} />;

export const WithAllListItems = Template.bind({});
WithAllListItems.args = {
  cdrPolicyUrl: 'https://example.com',
  dataSharingRevocationEmail: 'data.sharing.revocation@email.com',
};

export const WithoutDuplicateListItem = Template.bind({});
WithoutDuplicateListItem.args = {
  cdrPolicyUrl: 'https://example.com',
  dataSharingRevocationEmail: 'data.sharing.revocation@email.com',
  hideDuplicateListItem: true,
};
