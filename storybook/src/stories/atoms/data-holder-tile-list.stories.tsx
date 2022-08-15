import React from 'react';
import { ComponentStory, ComponentMeta } from '@storybook/react';
import { DataHolderTiles, TestUtil } from '../../lib';

export default {
  title: 'Components/Atoms/Data Holder Tiles',
  component: DataHolderTiles,
  argTypes: {
    backgroundColor: { control: 'color' },
  },
} as ComponentMeta<typeof DataHolderTiles>;

const dataHolders = TestUtil.testData.dataHolder.all();
const Template: ComponentStory<typeof DataHolderTiles> = (args) => <DataHolderTiles {...args} />;

export const Default = Template.bind({});
Default.args = {
  dataHolders: dataHolders,
  onClick: (dataHolder) => {
    alert(`${dataHolder.brandName} was clicked.`);
  },
};
