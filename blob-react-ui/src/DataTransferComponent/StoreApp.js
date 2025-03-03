// App.js
import { Provider, useSelector, useDispatch } from 'react-redux';
import store from './Store';

function Counter() {
  const count = useSelector(state => state.count);
  const dispatch = useDispatch();
  return (
    <div>
      <p>{count}</p>
      <button onClick={() => dispatch({ type: "increment" })}>
        Increment
      </button>
    </div>
  );
}

function StoreApp() {
  return (
    <Provider store={store}>
      <Counter />
    </Provider>
  );
}

export default StoreApp;