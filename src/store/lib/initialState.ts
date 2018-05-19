import { PlaybackStatus } from '../../enums/PlaybackStatus';
import { State } from './types';

export const initialState: State = {
  status: PlaybackStatus.STOPPED,
  isPending: false,
  isSeeking: false,
  positionPending: false,
  position: 0,
  duration: 0,
  maxVolume: 1.5,
  minVolume: 0,
  volume: 1,
  muted: false,
  castIp: '',
  pageUrl: '',
  previouslyWatched: [],
  meta: {},
};
