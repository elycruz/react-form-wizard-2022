import '../src/css/index.css';
import App from '../src/App';
import * as React from "react";

export interface ServerSideAppProps {
  Component?: any
}

export default function ServerSideApp({Component}: ServerSideAppProps) {
  return (<App>
    <Component/>
  </App>);
}
