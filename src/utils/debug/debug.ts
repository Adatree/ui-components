const isDebug = (): boolean => {
  const isEnvDebugSet = process.env.REACT_APP_ENABLE_DEBUG === 'true';
  const isLocalDebugSet = localStorage.getItem('debug') === 'true';

  return isEnvDebugSet || isLocalDebugSet;
};

export const Debugger = {
  isDebug,
};
