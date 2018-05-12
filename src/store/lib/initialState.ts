import { State } from './types';

export const initialState: State = {
  isPlaying: false,
  isPending: true,
  positionPending: false,
  position: 0,
  duration: 0,
  volume: 0,
  castIp: '',
  pageUrl: '',
  castUrl: '',
  theme: 'default',
  previouslyWatched: [],
};
