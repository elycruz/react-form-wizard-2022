import * as React from "react";

export interface NextPrevAndSaveButtonsProps {
  nextPage?: string;
  prevPage?: string;
  saveAction?: string;
}

export function NextPrevAndSaveButtons({nextPage, prevPage, saveAction}: NextPrevAndSaveButtonsProps) {
  return (<React.Fragment>
    <button type="reset">Reset</button>
    {!prevPage ? null : (
      <button className="prev-btn" value="prev"
              formAction={prevPage}
              formNoValidate>Prev
      </button>
    )}
    {!nextPage ? null : (
      <button className="next-btn" value="next"
              formAction={nextPage}
              formNoValidate>Next
      </button>
    )}
    <button className="save-btn" value="save" formAction={saveAction}>Save</button>
  </React.Fragment>)
}
