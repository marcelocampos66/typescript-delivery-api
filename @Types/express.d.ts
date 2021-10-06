interface ITokenPayload {
  id: number;
  name: string;
  email: string;
  role: string;
  iat: number;
  exp: number;
}

declare namespace Express {
  export interface Request {
    payload: ITokenPayload;
  }
}
