export interface InsightResponse {
  name: string;
  example: string;
  dataHolderName: string;
  dataScopes: { name: string }[];
  dataRecipients?: string[];
  extraInfo?: string;
}
