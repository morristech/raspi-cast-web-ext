import { pipeProps } from 'react-streams';
import { map, switchMap } from 'rxjs/operators';

export const Tab = pipeProps(
  switchMap(() => {
    return browser.tabs.query({
      active: true,
      windowId: (browser.windows as any).WINDOW_ID_CURRENT,
    });
  }),
  map(([tabInfo]) => ({
    url: escape(tabInfo.url as string),
  })),
);
