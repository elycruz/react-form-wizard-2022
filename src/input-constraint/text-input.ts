import {InputConstraintOptions, InputConstraints, MessageGetter, ValidationResult, Validator} from "./types";

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

  patternMismatch: MessageGetter;
  tooLong: MessageGetter;
  tooShort: MessageGetter;
  valueMissing: MessageGetter;
  customError: MessageGetter;

  // These shouldn't have to be implemented
  badInput: MessageGetter;
  typeMismatch: MessageGetter;

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
    let result = false;

    // if (isset(minLength))
    return {
      result
    };
  }
}
