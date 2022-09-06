import React from 'react';
import { ComponentStory, ComponentMeta } from '@storybook/react';
import { DataHandlingInfo } from '../../lib';

export default {
  title: 'Components/Atoms/Data Handling Information',
  component: DataHandlingInfo,
  argTypes: {
    backgroundColor: { control: 'color' },
  },
} as ComponentMeta<typeof DataHandlingInfo>;

const Template: ComponentStory<typeof DataHandlingInfo> = (args) => <DataHandlingInfo {...args} />;

const taRecords = [
  {
    name: 'Trusted Advisor 1',
    dataPolicyUrl: 'https://www.example.com',
    protectionFrameworkText: 'Protection Framework policy',
    protectionFrameworkUrl: 'https://www.example.com',
  },
  {
    name: 'Trusted Advisor 2',
    dataPolicyUrl: 'https://www.example.com',
    protectionFrameworkText: 'Protection Framework policy',
    protectionFrameworkUrl: 'https://www.example.com',
  },
  {
    name: 'Trusted Advisor 3',
    dataPolicyUrl: 'https://www.example.com',
    protectionFrameworkText: 'Protection Framework policy',
    protectionFrameworkUrl: 'https://www.example.com',
  },
];

export const WithOneTrustedAdvisor = Template.bind({});
WithOneTrustedAdvisor.args = {
  taRecords: [taRecords[0]],
};

export const WithManyTrustedAdvisors = Template.bind({});
WithManyTrustedAdvisors.args = {
  taRecords: taRecords,
};
