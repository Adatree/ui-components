import React from 'react';
import { ComponentStory, ComponentMeta } from '@storybook/react';
import { Accreditation } from '../../lib';

export default {
  title: 'Components/Atoms/Accreditation',
  component: Accreditation,
  argTypes: {
    backgroundColor: { control: 'color' },
  },
} as ComponentMeta<typeof Accreditation>;

const Template: ComponentStory<typeof Accreditation> = (args) => <Accreditation {...args} />;

export const Default = Template.bind({});
Default.args = {
  accreditationNumber: '1234-5678',
  cdrPolicyUrl: 'https://www.adatree.com.au/cdrpolicy',
  companyName: 'Your Company',
};
