import {User} from './src/types';

declare module "iron-session" {
  interface IronSessionData {
    user?: User
    fieldsetName?: string,
    intakeFormStarted?: boolean
  }
}
