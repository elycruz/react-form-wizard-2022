import './App.css';
import * as React from 'react';
import {UserForm} from "./pages/user-form";

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
          <UserForm/>
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
