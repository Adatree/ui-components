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
  data?: {};
  type?: 'API' | 'GENERIC';
  timeStamp?: Date;
  url?: string;
};

export const ErrorMessage: React.FC<ErrorMessageProps> = (props: ErrorMessageProps) => {
  const { message, code, data, type = 'GENERIC', timeStamp = new Date(), url } = props;
  const iconFontSize = '56px';

  const errorDetails = (
    <>
      <Typography sx={{ mb: 2 }} variant="h3">
        Error: {message}
      </Typography>
      {code && <Typography sx={{ mb: 1 }}>Status code: {code}</Typography>}
      {url && type === 'API' && <Typography sx={{ mb: 1 }}>API Url: {url}</Typography>}
      <Typography sx={{ mb: 1 }}>Time: {Formatter.formatDateTime(timeStamp)}</Typography>
      {data && (
        <>
          <Typography sx={{ mb: 1 }}>Extra information</Typography>
          <Box sx={{ width: '100%' }}>
            <SyntaxHighlighter language="javascript" style={docco}>
              {JSON.stringify(data)}
            </SyntaxHighlighter>
          </Box>
        </>
      )}
    </>
  );

  const accordion = (
    <>
      <Box sx={{ width: '100%' }}>
        <Accordion title={'Show error details'} content={errorDetails} />
      </Box>
    </>
  );

  return (
    <>
      <FeedbackMessage
        message={'An error has occurred'}
        icon={<AlertCircle sx={{ fontSize: iconFontSize, color: 'error.main' }} />}
        children={accordion}
      ></FeedbackMessage>
    </>
  );
};
