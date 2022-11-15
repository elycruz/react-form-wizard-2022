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

export interface Field {
  name?: string;
  label?: string;
  attributes?: { [index: string]: any };
  options?: Field[];
  value?: any;
}

export interface Fieldset extends Field {
  legend?: string;
  fields?: Field[],
  action?: string,
  next?: string, // Next fieldset name
  prev?: string // Prev. ""
}

export interface FieldsetsByName {
  [index: string]: Fieldset
}

export interface User {
  id: number,
  visitCount?: number,
  intakeForm?: IntakeFormData
}
