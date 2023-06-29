import '../App.css';
import configureStore from '../store/store';
import { Provider } from 'react-redux';
import Main from './Main';

const store = configureStore();

export type RootState = ReturnType<typeof store.getState>;

export type AppDispatch = typeof store.dispatch;


function App() {
  return (
    <Provider store={store}>
      <Main />
    </Provider>
  );
}

export default App;
