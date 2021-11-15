export interface ISignupData {
  firstName: string;
  lastName: string;
  password: string;
  phone?: string;
  verifyPassword: string;
  workEmail: string;
  verified: boolean;
}
