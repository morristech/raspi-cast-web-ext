import React from 'react';

import { CastButton } from '../../components/CastButton';
import { PopupLayout } from '../../components/PopupLayout';

interface CastPopupProps {
  foo?: string;
}

export class CastPopup extends React.Component<CastPopupProps> {
  public render(): JSX.Element {
    return (
      <PopupLayout>
        <CastButton />
      </PopupLayout>
    );
  }
}
