import {FieldConfig} from "../types";
import * as React from "react";
import {ReactNode} from "react";

let _uuid = 0;

export interface FieldProps extends FieldConfig {
  children?: ReactNode | undefined
}

function Input(props) {
  // @todo combine incoming 'className' property with own altered (internal one here)
  if (props.type === 'checkbox' || props.type === 'radio') {
    return (<input {...props} className={`x-${props.type}`}/>);
  }
  return (<div className="x-input"><input {...props}/></div>);
}

export function Field(props?: FieldProps) {
  const {
    name, label, messages,
    attributes = {}, attributes: {type, id = name} = {},
    options, children, value, defaultValue
  } = props;

  let controls;

  switch (type) {
    case 'radio':
      if (!options) {
        throw new Error(`\`${Field.name}.props.options\` needs to be populated when \`type\` prop is equal to 'radio'`);
      }
      controls = options.map((o, i) => {
        const {attributes: {id: subId = `${name}--${i}`} = {}} = o;
        return (<div className="x-field" key={`${subId}-${_uuid++}`}>
          <Input id={subId}
                 name={name}
                 type="radio"
                 defaultChecked={value !== o.defaultValue ? null : true}
                 defaultValue={o.defaultValue}
                 {...o.attributes}
          />
          <label htmlFor={subId}>{o.label}</label>
        </div>);
      });
      break;
    case 'checkbox':
      if (attributes.id) delete attributes.id;
      controls = <Input id={id}
                        name={name} {...attributes}
                        defaultValue={defaultValue} defaultChecked={value !== defaultValue ? null : true}/>
      break;
    case undefined:
    case null:
    default:
      if (attributes.id) delete attributes.id;
      controls = <Input id={id}
                        name={name} {...attributes}
                        defaultValue={defaultValue}/>
      break;
  }

  return (<React.Fragment>
    <label htmlFor={id}>{label}</label>
    <div className="x-field">
      {controls}
      {children}
      {messages && messages.length && (
        <ul className="x-error-message">{messages.map(m => (<li>{m}</li>))}</ul>
      )}
    </div>
  </React.Fragment>);
}
