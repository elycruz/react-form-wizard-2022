import * as React from "react";
import {NextPrevAndSaveButtons} from "./next-prev-and-save-buttons";

export function IntakeFormLayout(props) {
  return (
    <React.Fragment>
      <form action="#">
        {props.children}
        <fieldset>
          <NextPrevAndSaveButtons/>
        </fieldset>
      </form>
    </React.Fragment>
  )
}
