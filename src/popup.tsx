import { css } from 'glamor';
import React from 'react';
import { render } from 'react-dom';
import { setObservableConfig } from 'recompose';
import { from } from 'rxjs';

import { PopupLayout } from './Layout/Popup';
import { connectToWsServer, initPageUrl, initSettings } from './store';

css.global('button::-moz-focus-inner,button::-moz-focus-outer { border: 0; }');
css.global('input::-moz-focus-inner,input::-moz-focus-outer { border: 0; }');

setObservableConfig({
  fromESObservable: from,
  toESObservable: stream => stream,
});
connectToWsServer();
initSettings();
initPageUrl();

render(<PopupLayout />, document.getElementById('popup-app'));
