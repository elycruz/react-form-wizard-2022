import * as React from 'react';
import {PropsWithChildren, ReactNode} from "react";
import Link from 'next/link'

import {fieldsetsList} from "./data/fieldsetConfigs";
import {IntakeFormData} from "./data/models";

interface AppProps extends PropsWithChildren {
  intakeFormStarted?: boolean
}

export interface ClientAppContext {
  intakeForm?: IntakeFormData
}

export class App extends React.Component<AppProps, any> {
  context = React.createContext({}) as React.Context<ClientAppContext>;

  render() {
    const {props: {children, intakeFormStarted}} = this;
    return (<React.Fragment>
      <header>
        <div>
          <h1><a href="/">Intake Form</a></h1>
        </div>
      </header>
      <main>
        <div>
          {intakeFormStarted && (<ul>
            {
              fieldsetsList.map((k) => (
                <li key={`${k.name}-fieldset`}><Link href={`/${k.name}`}>{k.legend}</Link></li>
              ))
            }
          </ul>)}
          {children}
        </div>
      </main>
      <footer>
        <div>
          <p>&copy; 2022 Edlc</p>
        </div>
      </footer>
    </React.Fragment>)
  }
}

export default App;
