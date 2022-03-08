import React from 'react';
import { ComponentStory, ComponentMeta } from '@storybook/react';
import { ConsentStepperResponsive } from '../../lib';

export default {
  title: 'Full examples/Stepper',
  component: ConsentStepperResponsive,
  argTypes: {
    backgroundColor: { control: 'color' },
  },
} as ComponentMeta<typeof ConsentStepperResponsive>;

const Template: ComponentStory<typeof ConsentStepperResponsive> = (args) => <ConsentStepperResponsive {...args} />;

const mockStepConent = (
  <>
    <br />
    <p>
      Lorem ipsum dolor sit amet, consectetur adipiscing elit. Donec eu mauris id sem imperdiet maximus. Nullam eros
      neque, hendrerit ut ipsum sit amet, blandit cursus nulla. Vivamus augue felis, egestas congue finibus a,
      consectetur eleifend eros. Nullam aliquam egestas consequat. Sed efficitur sit amet nulla vel eleifend. Maecenas
      et eros eu quam porttitor auctor. In molestie viverra commodo.
    </p>
  </>
);
export const Responsive = Template.bind({});
Responsive.args = {
  steps: [
    {
      label: 'CDR',
      content: (
        <>
          <h1>This is content for step 1.</h1>
          {mockStepConent}
        </>
      ),
      disableNextButton: false,
    },
    {
      label: 'How it works',
      content: (
        <>
          <h1>This is content for step 2.</h1>
          {mockStepConent}
        </>
      ),
      disableNextButton: false,
    },
    {
      label: 'Summary',
      content: (
        <>
          <h1>This is content for step 3.</h1>
          {mockStepConent}
        </>
      ),
      nextButtonLabel: 'Consent',
      disableNextButton: false,
      onPrevious: () => {
        alert('Going back');
        return '';
      },
      onNext: () => {
        alert('Consent sent');
        return '';
      },
    },
  ],
};
