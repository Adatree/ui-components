import React from 'react';
import { ComponentStory, ComponentMeta } from '@storybook/react';
import { ReviewStep, TestUtil } from '../../lib';

export default {
  title: 'Atomic Components/Organisms/Consent steps/Review step',
  component: ReviewStep,
  argTypes: {
    backgroundColor: { control: 'color' },
  },
} as ComponentMeta<typeof ReviewStep>;

const Template: ComponentStory<typeof ReviewStep> = (args) => <ReviewStep {...args} />;

export const Default = Template.bind({});
Default.args = {
  useCase: TestUtil.getTestDataHomeUseCase(),
};
