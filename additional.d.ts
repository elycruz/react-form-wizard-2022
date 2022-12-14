import {IntakeFormData, UserData} from './src/types';

declare module "iron-session" {
  interface IronSessionData {
    user?: UserData;
    fieldsetName?: string;
    currIntakeForm?: IntakeFormData;
    csrfToken?: string;
  }
}
