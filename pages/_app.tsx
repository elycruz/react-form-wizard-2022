import * as React from "react";
import {Provider} from 'react-redux'

import '../src/css/index.css';
import App from '../src/App';
import {storeWrapper} from '../src/storeWrapper';

export interface ServerSideAppProps {
  Component?: any,
  pageProps: any
}

export default function ServerSideApp({Component, pageProps}: ServerSideAppProps) {
  const {store, props} = storeWrapper.useWrappedStore(pageProps);
  return (
    <Provider store={store}>
      <App>
        <Component {...props.pageProps}/>
      </App>
    </Provider>);
}
