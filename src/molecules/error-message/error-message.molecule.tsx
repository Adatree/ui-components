import React from 'react';

import AlertCircle from 'mdi-material-ui/AlertCircle';
import SyntaxHighlighter from 'react-syntax-highlighter';
import { docco } from 'react-syntax-highlighter/dist/esm/styles/hljs';
import { FeedbackMessage } from '../../atoms/feedback-message/feedback-message.atom';
import { Accordion } from '../../atoms/accordion/accordion.molecule';
import { Box, Typography } from '@mui/material';
import { Formatter } from '../../utils/formatter/formater';

export type ErrorMessageProps = {
  message: string;
  code?: string;
  data?: object | string;
  type?: string;
  timeStamp?: Date;
  url?: string;
  supportContact?: string;
};

export const ErrorMessage: React.FC<ErrorMessageProps> = (props: ErrorMessageProps) => {
  const { message, code, data, type = 'UNKNOWN', timeStamp = new Date(), url, supportContact } = props;
  const iconFontSize = '56px';
  let parsedData = undefined;

  if (typeof data === 'string') {
    parsedData = data;
  } else {
    parsedData = JSON.stringify(data);
  }

  const errorDetails = (
    <>
      <Typography sx={{ mb: 2 }} variant="h2">
        Error: {message}
      </Typography>

      {type && (
        <>
          <Typography variant="h3">Type</Typography>
          <Typography sx={{ mb: 2 }}>{type}</Typography>
        </>
      )}

      {code && (
        <>
          <Typography variant="h3">Code</Typography>
          <Typography sx={{ mb: 2 }}>{code}</Typography>
        </>
      )}

      {url && (
        <>
          <Typography variant="h3">URL</Typography>
          <Typography sx={{ mb: 2, wordBreak: 'break-all' }}>{url}</Typography>
        </>
      )}

      <>
        <Typography variant="h3">Time</Typography>
        <Typography sx={{ mb: 2 }}>{Formatter.formatDateTimeTz(timeStamp)}</Typography>
      </>

      {parsedData && (
        <>
          <Typography variant="h3">Extra information</Typography>
          <Box sx={{ code: { display: 'block', width: '100px' } }}>
            <SyntaxHighlighter language="JSON" style={docco}>
              {parsedData}
            </SyntaxHighlighter>
          </Box>
        </>
      )}
    </>
  );

  const body = (
    <>
      <Typography>Please try reloading the page.</Typography>
      {supportContact && (
        <Typography sx={{ mt: 2 }}>
          If the problem continues please contact the support team: {supportContact}
        </Typography>
      )}

      <Box sx={{ mt: 4, width: '100%' }}>
        <Accordion title={'Show error details'} content={errorDetails} />
      </Box>
    </>
  );

  return (
    <>
      <FeedbackMessage
        message={'We are sorry but it looks like an error has occurred.'}
        icon={<AlertCircle sx={{ fontSize: iconFontSize, color: 'error.main' }} />}
      >
        {body}
      </FeedbackMessage>
    </>
  );
};
