import ReactDOM from 'react-dom/client';
import './index.css';
import {Provider} from 'react-redux';
import 'slick-carousel/slick/slick.css'
import 'slick-carousel/slick/slick-theme.css'
import App from "./App";
import store from "./store";

const root = ReactDOM.createRoot(
  document.getElementById('root') as HTMLElement
);
root.render(
  <Provider store={store}>
      <App/>
  </Provider>
);
