import './styles/options.css';

import React from 'react';
import { render } from 'react-dom';

import OptionsForm from './containers/OptionsForm';

/* tslint:disable */
const onSubmit = () => {};
/* tslint:enable */

const Options = () => (
  <main>
    <OptionsForm onSubmit={onSubmit} />
  </main>
);

render(<Options />, document.getElementById('options-app'));
