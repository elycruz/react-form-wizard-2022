export interface ValidationResult<T = any> {
  result: boolean;
  messages?: string[];
  value?: T;
}

export type Validator<T = any> = (x?: T) => ValidationResult<T>;

export type MessageGetter<T = any> = (constraints?: InputConstraints<T>, x?: T) => string;

export interface InputConstraintOptions<T = any> {
  async?: boolean;
  valueObscurer?: (x?: T) => string;
}

export interface InputConstraints<T = any> extends InputConstraintOptions<T> {
  validate(x?: T): ValidationResult<T>;

  // validateAsync(x?: T): ValidationResult<T>;
}
