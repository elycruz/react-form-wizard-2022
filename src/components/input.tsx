import {Field} from "../types";
import * as React from "react";

export interface FieldItemProps extends Field {

}

function Input(props) {
  // @todo combine incoming 'className' property with own altered (internal one here)
  if (props.type === 'checkbox' || props.type === 'radio') return (<input {...props} className="x-input"/>);
  return (<div className="x-input"><input {...props}/></div>);
}

function RadioGroup(props) {
  // @todo combine incoming 'className' property with own altered (internal one here)
  if (props.type === 'checkbox' || props.type === 'radio') return (<input {...props} className="x-input"/>);
  return (<div className="x-input"><input {...props}/></div>);
}

export function FieldItem(props?: FieldItemProps) {
  const {name, label, messages, attributes, attributes: {type, id = name}, options} = props;

  let controls;

  switch (type) {
    case 'radio':
      if (!options) {
        throw new Error(`${FieldItem.name}.props.options needs to be populated when \`type\` prop is 'radio'`);
      }
      controls = options.map((o, i) => {
        const {attributes: {id: subId = `${name}--${i}`}} = o;
        if (o.attributes)
        return [
          (<label htmlFor={name}>o.label</label>),
          (<Input id={subId} {...o.attributes} />)
        ];
      });
      break;
    case 'checkbox':
    case undefined:
    case null:
    default:
      if (attributes.id) delete attributes.id;
      controls = <Input id={id} {...attributes} />
      break;
  }

  return (<React.Fragment>
    <label htmlFor={id}>{label}</label>
    <div className="x-field">
      {controls}
      {messages && messages.length && (
        <div className="x-error-message">{messages.map(m => (<li>{m}</li>))}</div>
      )}
    </div>
  </React.Fragment>)
}
