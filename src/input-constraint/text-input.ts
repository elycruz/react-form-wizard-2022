import {InputConstraintOptions, InputConstraints, MessageGetter, ValidationResult, Validator} from "./types";
import {isset} from "../utils";

export const patternMismatchMsg = (inputConstraints: TextInput, value: any) => `Value doesn't match pattern`,
  tooLongMsg = (constraints: TextInput, xs: any) => `Value is too long`,
  tooShortMsg = (constraints: TextInput, xs: any) => `Value is too short`,
  valueMissingMsg = (constraints: TextInput, xs: any) => `Value is missing`,
  customErrorMsg = (constraints: TextInput, xs: any) => `Custom error message`,
  badInputMsg = (constraints: TextInput, xs: any) => `Bad input`,
  typeMismatchMsg = (constraints: TextInput, xs: any) => `Type mismatch`
;

export interface TextInputOptions extends InputConstraintOptions<string> {
  minLength?: number;
  maxLength?: number;
  pattern?: RegExp;
  required?: boolean;
  custom?: Validator;

  patternMismatch?: MessageGetter;
  tooLong?: MessageGetter;
  tooShort?: MessageGetter;
  valueMissing?: MessageGetter;
  customError?: MessageGetter;

  // These shouldn't have to be implemented
  badInput?: MessageGetter;
  typeMismatch?: MessageGetter;
}

export class TextInput implements Required<TextInputOptions>, InputConstraints {
  minLength: number;
  maxLength: number;
  pattern: RegExp;
  required: boolean;
  custom: Validator;

  patternMismatch = patternMismatchMsg;
  tooLong = tooLongMsg;
  tooShort = tooShortMsg;
  valueMissing = valueMissingMsg;
  customError = customErrorMsg;
  typeMismatch = typeMismatchMsg;

  // This one shouldn't have to be implemented
  badInput = badInputMsg;

  /**
   * Whether validation should run asynchronously or not
   */
  async = false;

  /**
   * Function used to obscure validation `value`, in validation result.  Optional.
   */
  valueObscurer: (x?: string) => string;

  constructor(props?: TextInputOptions) {
    Object.assign(props);
  }

  validate(x?: string): ValidationResult {
    const msgs = [],
      issetX = isset(x);

    if (issetX && typeof x !== 'string') {
      msgs.push(this.typeMismatch(this, x));
    } else if (this.required && (!issetX || !x)) {
      msgs.push(this.valueMissing(this, x));
    } else {
      if (isset(this.minLength) && x.length < this.minLength) {
        msgs.push(this.tooShort(this, x));
      }
      if (isset(this.maxLength) && x.length > this.maxLength) {
        msgs.push(this.tooLong(this, x));
      }
      if (isset(this.pattern) && !this.pattern.test(x)) {
        msgs.push(this.patternMismatch(this, x));
      }
      if (isset(this.custom) && !this.custom(x)) {
        msgs.push(this.customError(this, x));
      }
    }

    return {
      result: !msgs.length,
      messages: msgs
    };
  }
}
