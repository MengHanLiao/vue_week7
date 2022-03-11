import emitter from './emitter';

// eslint-disable-next-line func-names
export default function (obj) {
  emitter.emit('push-message', obj);
}
