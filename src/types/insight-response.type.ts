export interface InsightResponse {
  name: string;
  example: string;
  dataScopes: { name: string }[];
  dataRecipients?: string[];
  extraInfo?: string;
}
