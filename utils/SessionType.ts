import { SessionData } from 'express-session';

export interface MySessionData extends SessionData {
  accessToken?: string;
  reference?: string;
}
