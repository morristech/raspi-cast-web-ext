import { PlaybackStatus } from 'raspi-cast-common';
import { State } from './types';

export const initialState: State = {
  status: PlaybackStatus.STOPPED,
  isReady: false,
  isPending: false,
  isSeeking: false,
  positionPending: false,
  notification: false,
  position: 0,
  duration: 0,
  maxVolume: 1.5,
  minVolume: 0,
  volume: 1,
  muted: false,
  castIp: '',
  pageUrl: '',
};
