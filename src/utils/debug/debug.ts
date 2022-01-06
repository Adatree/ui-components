export const isDebug = (): boolean => {
  const isEnvDebugSet = process.env.REACT_APP_ENABLE_DEBUG === 'true';
  const isLocalDebugSet = localStorage.getItem('debug') === 'true';

  console.log(isEnvDebugSet, isLocalDebugSet);
  return isEnvDebugSet || isLocalDebugSet;
};
