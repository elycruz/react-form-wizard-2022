import * as React from "react";

export class AppMenu {
  render() {
    return (
      <ul>
        {
          Object.keys(fieldsetsData).map(k => (
            <li><a href={`#/${k}`}>{fieldsetsData[k].legend}</a></li>
          ))
        }
      </ul>
    );
  }
}
