import React, { ReactElement } from 'react';
import { Box, Card, CardContent, Skeleton, Tooltip, Typography } from '@mui/material';
import InfoIcon from 'mdi-material-ui/InformationOutline';

export type SectionCardProps = {
  title: string;
  subtitle: string;
  content: ReactElement;
  tooltip?: ReactElement;
};
export const SectionCard: React.FC<SectionCardProps> = (props) => {
  const { title, subtitle, content, tooltip } = props;

  return (
    <>
      <Typography variant="h2" sx={{ mb: 3 }}>
        {title ? title : <Skeleton />}
      </Typography>

      {subtitle ? (
        <Box sx={{ mb: 4, display: 'flex' }}>
          <Typography>{subtitle}</Typography>
          {tooltip && (
            <Tooltip
              title={<>{tooltip}</>}
              componentsProps={{
                tooltip: {
                  sx: {
                    color: 'typography.dark',
                    backgroundColor: 'highlight.light',
                    border: '1px solid',
                    borderColor: 'shadow.light',
                  },
                },
              }}
            >
              <InfoIcon sx={{ ml: 1, pb: '2px', cursor: 'pointer', color: '#08A4E4' }} />
            </Tooltip>
          )}
        </Box>
      ) : (
        <Skeleton sx={{ mb: 4 }} variant="text" />
      )}

      {content ? (
        <Card>
          <CardContent>{content}</CardContent>
        </Card>
      ) : (
        <Skeleton variant="rectangular" height={200} />
      )}
    </>
  );
};
