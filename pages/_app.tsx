import '../src/css/index.css';
import App from '../src/App';
import * as React from "react";

export interface ServerSideAppProps {
  Component?: any,
  intakeFormStarted?: boolean
}

export default function ServerSideApp({Component, intakeFormStarted}: ServerSideAppProps) {
  return (<App intakeFormStarted={intakeFormStarted}>
    <Component/>
  </App>);
}
