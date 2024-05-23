import logo from './logo.svg';
import './App.css';
import Student from './component/Student'
import { Provider } from 'react-redux';
import store from './redux/store'

function App() {
  return (
    <Provider store={store}>
      <Student/>
    </Provider>
    
  );
}

export default App;
