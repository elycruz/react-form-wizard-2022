import * as React from 'react';
import {PropsWithChildren, ReactNode} from "react";
import Link from 'next/link'

import fieldsetsRequirements from "./data/intake-form.json";

export interface FieldsetConfig {
  order?: number;
  legend?: string;
}

const fieldsetsData = Object.assign({}, fieldsetsRequirements.fieldsets) as {[index: string]: FieldsetConfig};

interface AppProps extends PropsWithChildren {
}

function App(props: AppProps) {
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
        {props.children}
      </div>
    </main>
    <footer>
      <div>
        <p>&copy; 2022 Edlc</p>
      </div>
    </footer>
  </React.Fragment>)
}

export default App;
