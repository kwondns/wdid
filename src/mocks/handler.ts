import TodoHandler from './todoHandler';
import TodoBoxHandler from './todoBoxHandler';
import HowHandler from './howHandler';
import didHandler from './didHandler';

export const handlers = [...TodoBoxHandler, ...TodoHandler, ...HowHandler, ...didHandler];
