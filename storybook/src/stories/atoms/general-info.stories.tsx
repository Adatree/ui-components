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
WithAllListItems.args = {};

export const WithoutDuplicateListItem = Template.bind({});
WithoutDuplicateListItem.args = {
  hideDuplicateListItem: true,
};
