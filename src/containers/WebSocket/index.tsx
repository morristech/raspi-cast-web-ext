import { QueueingSubject } from 'queueing-subject';
import { pipeProps } from 'react-streams';
import { combineLatest, of } from 'rxjs';
import websocketConnect from 'rxjs-websockets';
import { filter, map, switchMap } from 'rxjs/operators';

import { Ports } from '../../enums/port';
import { store } from '../../store';

export const WebSocket = pipeProps(
  switchMap(() => store.focusPath('settings').pluck('castIp')),
  filter(Boolean),
  switchMap(castIp => {
    const input = new QueueingSubject<string>();
    const { connectionStatus, messages } = websocketConnect(
      `ws://${castIp}:${Ports.UPDATE_PORT}`,
      input,
    );
    return combineLatest(connectionStatus, messages, of(input));
  }),
  map(([connectionStatus, messages, ws$]) => ({
    connectionStatus,
    messages,
    ws$,
  })),
);
