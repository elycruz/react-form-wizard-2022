import {User} from './src/data/models';

declare module "iron-session" {
  interface IronSessionData {
    user?: User
    fieldsetName?: string
  }
}
