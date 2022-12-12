import * as React from "react";
import {NextPrevAndSaveButtons} from "./next-prev-and-save-buttons";
import {FormEventHandler, MouseEventHandler} from "react";
import {IntakeFormData} from "../types";

export interface IntakeFormLayoutProps extends React.PropsWithChildren {
  name?: string,
  nextAction?: string,
  prevAction?: string,
  action?: string,
  method?: string,
  csrfToken?: string,
  csrfTokenName?: string,
}

export class IntakeFormLayout extends React.Component<IntakeFormLayoutProps> {
  static defaultProps = {
    method: 'POST'
  };

  state = {} as IntakeFormData;

  onSubmit = (e: SubmitEvent): void => {
  };

  render() {
    const {props: {action, method, children, nextAction, prevAction, name, csrfTokenName, csrfToken}} = this;
    return (
      <React.Fragment>
        <form
          className="intake-form-layout"
          name={name}
          action={action}
          method={method}
          onSubmit={this.onSubmit as unknown as FormEventHandler<HTMLFormElement>}>
          {children}
          <fieldset>
            <NextPrevAndSaveButtons nextAction={nextAction} prevAction={prevAction}/>
          </fieldset>
          <input type="hidden" name={csrfTokenName} value={csrfToken} />
        </form>
      </React.Fragment>
    )
  }
}
