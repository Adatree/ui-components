import React from 'react';
import { ComponentStory, ComponentMeta } from '@storybook/react';
import { PartnerMessage } from '../../lib';

export default {
  title: 'Components/Atoms/Partner Message',
  component: PartnerMessage,
  argTypes: {
    backgroundColor: { control: 'color' },
  },
} as ComponentMeta<typeof PartnerMessage>;

const Template: ComponentStory<typeof PartnerMessage> = (args) => <PartnerMessage {...args} />;

export const Default = Template.bind({});
Default.args = {
  dataHolderName: 'Red Bank Australia',
  organisation: {
    accreditationNumber: '1234-5678',
    dataSharingRevocationEmail: 'name@example.com',
    cdrPolicyUrl: 'https://www.adatree.com.au/cdrpolicy',
    logo: '/assets/images/test-company-logo.png',
    name: 'TestComapnay',
    underCdrPrinciple: true,
  },
};
