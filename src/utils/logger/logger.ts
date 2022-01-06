import { Debugger } from '../debug/debug';

const emitLogMessage = (
  messageType: 'debug' | 'info' | 'warn' | 'error',
  message: string,
  ...supportingDetails: unknown[]
) => {
  // eslint-disable-next-line no-console
  console[messageType](message, ...supportingDetails);
};

const debug = (primaryMessage: string, ...supportingData: unknown[]): void => {
  if (Debugger.isDebug()) {
    emitLogMessage('debug', primaryMessage, ...supportingData);
  }
};
const warn = (primaryMessage: string, ...supportingData: unknown[]): void => {
  emitLogMessage('warn', primaryMessage, ...supportingData);
};
const error = (primaryMessage: string, ...supportingData: unknown[]): void => {
  emitLogMessage('error', primaryMessage, ...supportingData);
};
const info = (primaryMessage: string, ...supportingData: unknown[]): void => {
  emitLogMessage('info', primaryMessage, ...supportingData);
};

export const Logger = {
  debug,
  warn,
  error,
  info,
};
