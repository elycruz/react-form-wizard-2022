import * as React from "react";
import {NextPrevAndSaveButtons} from "./next-prev-and-save-buttons";

export function IntakeFormLayout({formAction, nextPage, prevPage, children}) {
  return (
    <React.Fragment>
      <form action={formAction}>
        {children}
        <fieldset>
          <NextPrevAndSaveButtons nextPage={nextPage} prevPage={prevPage} />
        </fieldset>
      </form>
    </React.Fragment>
  )
}
