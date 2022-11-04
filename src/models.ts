export interface Address {
  address?: string,
  city?: string,
  state?: string,
  zipcode?: string,
}

export interface Name {
  first?: string;
  middle?: string;
  last?: string;
}

export interface ContactInfo {
  email?: string;
  phone?: string;
}

export interface Other {
  cookiesToday?: boolean;
}

/**
 * Collection of fieldset to store in server side storage.
 */
export interface IntakeFormData {
  address?: Address;
  name?: Name;
  contactInfo?: ContactInfo;
  other?: Other
}
