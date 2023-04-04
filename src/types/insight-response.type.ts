export interface Insight {
  name: string;
  example: string;
  dataScopes: { name: string }[];
  extraInfo?: string;
}

export interface InsightResponse {
  nonAccreditedDataRecipient: string;
  dataHandlingUrl: string;
  insights: Insight[];
}
