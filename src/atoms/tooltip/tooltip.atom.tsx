import React, { ReactElement } from 'react';
import { Tooltip as MuiTooltip, Typography } from '@mui/material';
import InfoIcon from 'mdi-material-ui/InformationOutline';

export type TooltipProps = {
  content: ReactElement | string;
  title?: ReactElement;
};
export const Tooltip: React.FC<TooltipProps> = (props) => {
  const { content, title } = props;

  const body =
    typeof content === 'string' ? (
      <Typography
        sx={{
          color: 'common.white',
        }}
      >
        {content}
      </Typography>
    ) : (
      content
    );

  const text = title ? (
    <span style={{ cursor: 'pointer' }}>{title}</span>
  ) : (
    <InfoIcon sx={{ ml: 1, pb: '2px', cursor: 'pointer', color: '#08A4E4' }} />
  );

  return (
    <>
      <MuiTooltip
        title={body}
        componentsProps={{
          tooltip: {
            sx: {
              backgroundColor: 'grey.light',
              border: '1px solid',
              borderColor: 'grey.dark',
              color: 'common.white',
            },
          },
        }}
      >
        {text}
      </MuiTooltip>
    </>
  );
};
