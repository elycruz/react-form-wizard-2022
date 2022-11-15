export interface ValidationResult<T = any> {
  result: boolean;
  messages?: string[];
}

export type Validator<T = any> = (x?: T) => ValidationResult<T>;

export type MessageGetter<T = any> = (constraints?: InputConstraints<T>, x?: T) => string;

export interface InputConstraintOptions<T = any> {
  valueObscurer?: (x?: T) => string;
}

export interface InputConstraints<T = any> extends InputConstraintOptions<T> {
  validate(x?: T): ValidationResult<T>;

  // validateAsync(x?: T): ValidationResult<T>;
}
