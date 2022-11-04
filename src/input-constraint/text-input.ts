import {InputConstraintOptions, InputConstraints, MessageGetter, ValidationResult, Validator} from "./types";

export interface TextInputOptions extends InputConstraintOptions<string> {
  minLength?: number;
  maxLength?: number;
  pattern?: RegExp;
  required?: boolean;
  custom?: Validator;

  patternMisMatch?: MessageGetter;
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

  patternMisMatch: MessageGetter;
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
   * Function used to obscure validation `value` in validation result.  Optional.
   */
  valueObscurer: (x?: string) => string;

  constructor(props: TextInputOptions) {
    Object.assign(props);
  }

  validate(x?: string): ValidationResult {
    let result = false;
    return {
      result
    };
  }
}
