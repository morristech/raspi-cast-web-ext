import { store } from '../index';

export const initPageUrl = () => {
  browser.tabs
    .query({
      active: true,
      windowId: (browser.windows as any).WINDOW_ID_CURRENT,
    })
    .then(([tabInfo]) =>
      store.dispatch({
        setState: { pageUrl: tabInfo.url },
      }),
    );
};

export const initSettings = () => {
  browser.storage.local.get('castIp').then(({ castIp }) =>
    store.dispatch({
      setState: { castIp },
    }),
  );
};
