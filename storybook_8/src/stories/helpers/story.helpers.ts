import { DataRecipient, TestUtil } from '../../lib';

export const dataRecipientValues = [
  'Accredited Data Recipient',
  'Business Consumer Disclosure Consent',
  'CDR representative',
  'Trusted Adviser',
  'Trusted Adviser with a TA Service Provider',
];

const getDataRecipients = (key: string): DataRecipient[] => {
  let dataRecipients: DataRecipient[] = [];

  if (key === dataRecipientValues[0]) {
    dataRecipients = [TestUtil.testData.dataRecipient.accreditedDataRecipient()];
  } else if (key === dataRecipientValues[1]) {
    dataRecipients = [
      TestUtil.testData.dataRecipient.accreditedDataRecipient(),
      TestUtil.testData.dataRecipient.businessConsumerDisclosureConsent(),
    ];
  } else if (key === dataRecipientValues[2]) {
    dataRecipients = [
      TestUtil.testData.dataRecipient.accreditedDataRecipient(),
      TestUtil.testData.dataRecipient.cdrRepresentative(),
    ];
  } else if (key === dataRecipientValues[3]) {
    dataRecipients = [
      TestUtil.testData.dataRecipient.accreditedDataRecipient(),
      TestUtil.testData.dataRecipient.trustedAdvisor(),
    ];
  } else if (key === dataRecipientValues[4]) {
    dataRecipients = [
      TestUtil.testData.dataRecipient.accreditedDataRecipient(),
      TestUtil.testData.dataRecipient.trustedAdvisor(),
      TestUtil.testData.dataRecipient.trustedAdvisorServiceProvider(),
    ];
  }

  return dataRecipients;
};

export const StoryHelper = {
  getDataRecipients,
};
