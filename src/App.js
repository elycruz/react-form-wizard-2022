import * as React from 'react';
import fieldsetsRequirements from "./data/intake-form.json";

const fieldsetsData = Object.assign({}, fieldsetsRequirements.fieldsets);

function App(props) {
  return (
    <React.Fragment>
      <header>
        <div>
          <h1>Intake Form</h1>
        </div>
      </header>
      <main>
        <div>
          <ul>
            {
              Object.keys(fieldsetsData).map(k => (
                <li key={k}><a href={`/${k}`}>{fieldsetsData[k].legend}</a></li>
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
    </React.Fragment>
  );
}

export default App;
