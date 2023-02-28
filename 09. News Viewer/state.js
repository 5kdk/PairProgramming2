/* eslint-disable import/no-mutable-exports */
let state = null;
let renderCallback = null;

const initGlobalState = initState => {
  state = new Proxy(initState, {
    set(target, key, newState) {
      if (target[key] === newState) return false;

      target[key] = newState;
      renderCallback();

      return true;
    },
  });
};

const subscribe = renderFunc => {
  renderCallback = renderFunc;
};

export { state, initGlobalState, subscribe };
