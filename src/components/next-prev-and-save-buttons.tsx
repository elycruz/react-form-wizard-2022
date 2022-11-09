import * as React from "react";

export interface NextPrevAndSaveButtonsProps {
  nextAction?: string;
  prevAction?: string;
  saveAction?: string;
}

export function NextPrevAndSaveButtons({nextAction, prevAction}: NextPrevAndSaveButtonsProps) {
  return (<React.Fragment>
    <button type="reset">Reset</button>
    {prevAction && (
      <button className="prev-btn" value="prev"
              formAction={prevAction}
              formNoValidate>Prev
      </button>
    )}
    {nextAction && (
      <button className="next-btn" value="next"
              formAction={nextAction}
              formNoValidate>Next
      </button>
    )}
    <button className="save-btn" value="save">Save</button>
  </React.Fragment>)
}
