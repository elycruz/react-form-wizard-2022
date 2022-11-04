import * as React from 'react';
import {FIRST_NAME_SYMBOL, LAST_NAME_SYMBOL, MIDDLE_INITIAL_SYMBOL} from "../data/constants";

export interface NameFieldsProps {
  firstNameSymbol: string,
  middleInitialSymbol: string,
  lastNameSymbol: string,
}

// temporary declaration
const firstNameSymbol = FIRST_NAME_SYMBOL,
  lastNameSymbol = LAST_NAME_SYMBOL,
  middleInitialSymbol = MIDDLE_INITIAL_SYMBOL
;

export function NameFields(/*{
                             firstNameSymbol = FIRST_NAME_SYMBOL,
                             lastNameSymbol = LAST_NAME_SYMBOL,
                             middleInitialSymbol = MIDDLE_INITIAL_SYMBOL
                           }: NameFieldsProps*/) {
  return (<React.Fragment>
    <label htmlFor={firstNameSymbol}>First</label>
    <div><input type="text" id={firstNameSymbol} name={firstNameSymbol} required/></div>
    <label htmlFor={middleInitialSymbol}>Middle, or Middle initial:</label>
    <div><input type="text" id={middleInitialSymbol} name={middleInitialSymbol}/></div>
    <label htmlFor={lastNameSymbol}>Last:</label>
    <div><input type="text" id={lastNameSymbol} name={lastNameSymbol}/></div>
  </React.Fragment>)
}
