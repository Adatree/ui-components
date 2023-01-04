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

const dataHolders = TestUtil.testData.dataHolder.allBanking();
const Template: ComponentStory<typeof DataHolderTiles> = (args) => <DataHolderTiles {...args} />;

export const WithAllEnabled = Template.bind({});
WithAllEnabled.args = {
  dataHolders: dataHolders,
  onClick: (dataHolder) => {
    alert(`${dataHolder.brandName} was clicked.`);
  },
};

export const WithTwoDisabled = Template.bind({});
WithTwoDisabled.args = {
  dataHolders: dataHolders,
  disableDataHolders: [dataHolders[1], dataHolders[3]],
  onClick: (dataHolder) => {
    alert(`${dataHolder.brandName} was clicked.`);
  },
};

export const WithIrregularLogos = Template.bind({});
WithIrregularLogos.args = {
  dataHolders: [
    TestUtil.testData.dataHolder.longBank(),
    TestUtil.testData.dataHolder.redBank(),
    TestUtil.testData.dataHolder.yellowBank(),
    TestUtil.testData.dataHolder.originalEnergy(),
    TestUtil.testData.dataHolder.yourPowerEnergy(),
    TestUtil.testData.dataHolder.ecoPowerEnergy(),
    TestUtil.testData.dataHolder.tallBank(),
    TestUtil.testData.dataHolder.ozGasEnergy(),
  ],

  onClick: (dataHolder) => {
    alert(`${dataHolder.brandName} was clicked.`);
  },
};
