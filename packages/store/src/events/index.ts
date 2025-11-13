import EventEmitter from 'eventemitter3';

type IEvent = {
  'app:synced': () => void;
};

const eventBus = new EventEmitter<IEvent>();

export default eventBus;
