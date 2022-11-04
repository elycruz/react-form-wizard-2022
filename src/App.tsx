import * as React from 'react';
import {PropsWithChildren, ReactNode} from "react";
import Link from 'next/link'

import fieldsetsRequirements from "./data/intake-form.json";
import {IntakeFormData} from "./data/models";

export interface FieldsetConfig {
  order?: number;
  legend?: string;
}

const fieldsetsData = Object.assign({}, fieldsetsRequirements.fieldsets) as { [index: string]: FieldsetConfig };

interface AppProps extends PropsWithChildren {
}

export interface ClientAppContext {
  intakeForm?: IntakeFormData
}

export class App extends React.Component<AppProps, any> {
  context = React.createContext({}) as React.Context<ClientAppContext>;

  render() {
    const {props: {children}} = this;
    return (<React.Fragment>
      <header>
        <div>
          <h1>Intake Form</h1>
        </div>
      </header>
      <main>
        <div>
          <ul>
            {
              Object.keys(fieldsetsData).map((k) => (
                <li key={k}><Link href={`/${k}`}>{fieldsetsData[k].legend}</Link></li>
              ))
            }
          </ul>
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
