import { version } from '../../package.json';

export function useAppConfig() {
  const buildDate = APP_BUILD_DATE;
  const buildInfo = {
    buildDate,
    env: import.meta.env,
    version,
  };
  return { buildInfo };
}
