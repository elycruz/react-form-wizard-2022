import * as React from "react";
import {NextPrevAndSaveButtons} from "./next-prev-and-save-buttons";


export class IntakeFormLayout extends React.Component {
  onClick = (e) => {
    const form = e.currentTarget,
      elm = e.target;

    // Only handle prev, next, and save buttons, here.
    if (elm.value !== 'save' || elm.value !== 'prev' || elm.value !== 'next') {
      return;
    }
    switch (elm.value) {
      case 'prev':
        break;
      case 'next':
        break;
      case 'save':
        break;
      default:
        break;
    }
  };

  render() {
    const {props: {formAction, children, nextPage, prevPage}} = this;
    return (
      <React.Fragment>
        <form action={formAction} onClick={this.onClick}>
          {children}
          <fieldset>
            <NextPrevAndSaveButtons nextPage={nextPage} prevPage={prevPage}/>
          </fieldset>
        </form>
      </React.Fragment>
    )
  }
}
