import { Copy } from '../../../../types/copy.type';

export const errorCopy = (): Copy['error'] => {
  return {
    required: 'This field is required.',
  };
};
