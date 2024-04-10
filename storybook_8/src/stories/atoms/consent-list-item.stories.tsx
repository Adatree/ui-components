import React from 'react';
import type { Meta, StoryObj } from '@storybook/react';
import { ConsentListItem, TestUtil } from '../../lib';

const meta: Meta<typeof ConsentListItem> = {
  title: 'Components/Atoms/Consent List Item',
  component: ConsentListItem,
  parameters: {
    layout: 'padded',
  },
  tags: ['autodocs'],
};

export default meta;
type Story = StoryObj<typeof ConsentListItem>;

export const Active: Story = {
  args: {
    consent: TestUtil.testData.consent.active(),
    consentUrl: `/some-url/${TestUtil.testData.consent.active().consentId}`,
    dataHolderLogoUrl: TestUtil.testData.dataHolder.yellowBank().logoUri,
  },
};

export const ActiveWithGrantee: Story = {
  args: {
    consent: TestUtil.testData.consent.activeWithGrantee(),
    consentUrl: `/some-url/${TestUtil.testData.consent.active().consentId}`,
    dataHolderLogoUrl: TestUtil.testData.dataHolder.yellowBank().logoUri,
  },
};

export const Expired: Story = {
  args: {
    consent: TestUtil.testData.consent.expired(),
    consentUrl: `/some-url/${TestUtil.testData.consent.active().consentId}`,
    dataHolderLogoUrl: TestUtil.testData.dataHolder.yellowBank().logoUri,
  },
};

export const Requested: Story = {
  args: {
    consent: TestUtil.testData.consent.requested(),
    consentUrl: `/some-url/${TestUtil.testData.consent.active().consentId}`,
    dataHolderLogoUrl: TestUtil.testData.dataHolder.redBank().logoUri,
  },
};

export const Revoked: Story = {
  args: {
    consent: TestUtil.testData.consent.revoked(),
    consentUrl: `/some-url/${TestUtil.testData.consent.active().consentId}`,
    dataHolderLogoUrl: TestUtil.testData.dataHolder.redBank().logoUri,
  },
};
