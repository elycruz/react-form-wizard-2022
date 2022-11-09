import '../src/css/index.css';
import App from '../src/App';
import * as React from "react";

export interface ServerSideAppProps {
  Component?: any,
  pageProps: any
}

export default function ServerSideApp({Component, pageProps}: ServerSideAppProps) {
  return (<App>
    <Component {...pageProps}/>
  </App>);
}
