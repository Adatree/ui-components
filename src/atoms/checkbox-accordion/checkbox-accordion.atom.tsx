import React, { useState } from 'react';
import { FormControlLabel, FormGroup, Checkbox, Typography, Box, Collapse } from '@mui/material';
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

  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setIsChecked(event.target.checked);
    onChange(event.target.checked, event.target.value);
  };

  return (
    <>
      <FormGroup>
        <FormControlLabel
          label={
            <Box sx={{ display: 'flex', alignItems: 'center' }}>
              {items && items.length > 0 && (
                <Box
                  sx={{ display: 'flex', alignItems: 'center', width: '3.4rem', height: '4.2rem' }}
                  onClick={toggleAccordion}
                >
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
                </Box>
              )}
              <Typography variant="h3">{title}</Typography>
            </Box>
          }
          labelPlacement="start"
          sx={{
            justifyContent: 'space-between',
            ml: 0,
            pl: 1,
            '&:hover': { backgroundColor: 'hover.main' },
          }}
          control={
            <Checkbox
              value={checkboxValue}
              checked={isChecked}
              onChange={handleChange}
              inputProps={{ 'aria-label': 'controlled' }}
              color="cta"
            />
          }
        />
      </FormGroup>
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
