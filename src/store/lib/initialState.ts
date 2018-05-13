import { PlaybackStatus } from '../../enums/PlaybackStatus';
import { State } from './types';

export const initialState: State = {
  status: PlaybackStatus.STOPPED,
  isPending: false,
  positionPending: false,
  position: 0,
  duration: 0,
  volume: 0,
  muted: false,
  castIp: '',
  pageUrl: '',
  theme: 'default',
  previouslyWatched: [],
  meta: {},
};
