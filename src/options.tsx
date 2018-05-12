import { css } from 'glamor';
import React from 'react';
import { render } from 'react-dom';
import { setObservableConfig } from 'recompose';
import { from } from 'rxjs';

import { OptionsLayout } from './Layout/Options';

css.global('input::-moz-focus-inner,input::-moz-focus-outer { border: 0; }');

setObservableConfig({
  fromESObservable: from,
  toESObservable: stream => stream,
});

render(<OptionsLayout />, document.getElementById('options-app'));
