import React, { useState } from 'react';
import { Checkbox, Typography, Box, Collapse } from '@mui/material';
import ChevronRight from 'mdi-material-ui/ChevronRight';

export type CheckboxAccordionProps = {
  title: string;
  checkboxValue: string;
  checked?: boolean;
  items?: string[];
  subtitle?: string;
  openLabel?: string;
  closeLabel?: string;
  onChange: (isChecked: boolean, value: string) => void;
};

export const CheckboxAccordion: React.FC<CheckboxAccordionProps> = (props) => {
  const { title, subtitle, checkboxValue, checked = false, items, onChange } = props;
  const [isOpen, setIsOpen] = useState<boolean>(false);
  const [isChecked, setIsChecked] = useState<boolean>(checked);

  const toggleAccordion = (event: React.SyntheticEvent) => {
    event.preventDefault();
    setIsOpen(!isOpen);
  };

  const handleChange = () => {
    setIsChecked(!isChecked);
    onChange(!isChecked, checkboxValue);
  };

  return (
    <>
      <Box
        sx={{ display: 'flex', alignItems: 'center', cursor: 'pointer', '&:hover': { backgroundColor: 'hover.main' } }}
      >
        <Box
          sx={{
            display: 'flex',
            flex: '0 0 auto',
            alignItems: 'center',
            justifyContent: 'center',
            width: '4.2rem',
            height: '100%',
            minHeight: '4.2rem',
          }}
          onClick={toggleAccordion}
        >
          {items && items.length > 0 && (
            <ChevronRight
              className={isOpen ? 'open' : 'close'}
              sx={{
                '&.open': {
                  transform: 'rotate(90deg)',
                  transition: 'transform 0.2s',
                },
                '&.close': {
                  transform: 'rotate(0deg)',
                  transition: 'transform 0.2s',
                },
              }}
            />
          )}
        </Box>
        <Box
          sx={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', width: '100%' }}
          onClick={handleChange}
        >
          <Box sx={{ flex: '1 1 auto' }}>
            <Typography variant="body1">{title}</Typography>
          </Box>
          <Box sx={{ flex: '0 0 auto' }}>
            <Checkbox
              value={checkboxValue}
              checked={isChecked}
              inputProps={{ 'aria-label': 'controlled' }}
              color="cta"
            />
          </Box>
        </Box>
      </Box>

      {items && items.length > 0 && (
        <Collapse in={isOpen}>
          <Box sx={{ p: 2 }}>
            {subtitle && (
              <Typography sx={{ mb: 1, opacity: 0.7 }} variant="h4">
                {subtitle}
              </Typography>
            )}

            <ul>
              {items.map((item: string, i: number) => (
                <li key={i} style={{ listStyle: 'inside', paddingLeft: '2px' }}>
                  {item}
                </li>
              ))}
            </ul>
          </Box>
        </Collapse>
      )}
    </>
  );
};
