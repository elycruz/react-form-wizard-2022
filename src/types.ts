export interface AddressData {
  address?: string,
  city?: string,
  state?: string,
  zipcode?: string,
}

export interface NameData {
  first?: string;
  middle?: string;
  last?: string;
}

export interface ContactInfoData {
  email?: string;
  phone?: string;
}

export interface OtherData {
  cookiesToday?: boolean;
}

/**
 * Collection of fieldset to store in server side storage.
 */
export interface IntakeFormData {
  address?: AddressData;
  name?: NameData;
  contactInfo?: ContactInfoData;
  other?: OtherData
}

export interface FieldConfig {
  name?: string;
  label?: string;
  attributes?: { [index: string]: any };
  messages?: string[];
  options?: FieldConfig[];
  defaultValue?: any;
  value?: any;
}

export interface FieldsetConfig extends FieldConfig {
  legend?: string;
  fields?: FieldConfig[],
  action?: string,
  next?: string, // Next fieldset name
  prev?: string // Prev. ""
  fieldMessages?: {[index: string]: string[]}
}

export interface FieldsetConfigsByName {
  [index: string]: FieldsetConfig
}

export interface UserData {
  id: number,
  visitCount?: number,
  intakeForm?: IntakeFormData
}
