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

export const CdrPrincipal = Template.bind({});
CdrPrincipal.args = {
  accreditationNumber: '1234-5678',
  companyName: 'TestCompany',
};

export const UnderCdrPrincipal = Template.bind({});
UnderCdrPrincipal.args = {
  accreditationNumber: '1234-5678',
  companyName: 'TestCompany',
  underCdrPrincipal: true,
};
