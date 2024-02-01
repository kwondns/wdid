import FutureHandler from './futureHandler';
import FutureBoxHandler from './futureBoxHandler';
import PastCountHandler from './pastCountHandler';
import PastHandler from './pastHandler';

export const handlers = [...FutureBoxHandler, ...FutureHandler, ...PastCountHandler, ...PastHandler];
