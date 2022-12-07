import * as React from "react";
import {Provider} from 'react-redux'

import '../src/css/index.css';
import App from '../src/App';
import store from '../src/store';

export interface ServerSideAppProps {
  Component?: any,
  pageProps: any
}

export default function ServerSideApp({Component, pageProps}: ServerSideAppProps) {
  return (
    <Provider store={store}>
      <App>
        <Component {...pageProps}/>
      </App>
    </Provider>);
}

// export default storeWrapper.useWrappedStore(ServerSideApp);
