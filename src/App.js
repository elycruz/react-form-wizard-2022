import './App.css';
import * as React from 'react';
import {UserForm} from "./pages/user-form";
import fieldsetsRequirements from "./data/intake-form.json";

const fieldsetsData = Object.assign({}, fieldsetsRequirements.fieldsets);

function App() {
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
                <li><a href={`#/${k}`}>{fieldsetsData[k].legend}</a></li>
              ))
            }
          </ul>
          <UserForm />
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
