import * as React from "react";

export function NextPrevAndSaveButtons() {
  return (<React.Fragment>
    <button className="next-btn" value="next">Next</button>
    <button className="prev-btn" value="prev">Prev</button>
    <button className="save-btn" value="save" disabled>Save</button>
  </React.Fragment>)
}
