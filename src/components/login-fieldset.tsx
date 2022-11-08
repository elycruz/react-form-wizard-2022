export interface LoginFieldsetProps {

}

export function LoginFieldset() {
  return (<form action="">
      <fieldset>
        <legend>Login</legend>
        <label htmlFor="email">Email</label>
        <div className="x-field">
          <input type="email" required name="email" id="email" className="x-input"/>
          <div className="help">(admin)</div>
        </div>

        <label htmlFor="password">Password</label>
        <div className="x-field">
          <input type="password" required name="password" id="password" className="x-input"/>
          <div className="help">(admin)</div>
        </div>
      </fieldset>
    </form>
  );
}
