import {IntakeFormData, UserData} from './src/types';

declare module "iron-session" {
  interface IronSessionData {
    user?: UserData
    fieldsetName?: string,
    intakeFormStarted?: boolean,
    intakeEntries?: UserData[]
  }
}
