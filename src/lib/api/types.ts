export type CorporationNumberValidationResponse =
  | {
      valid: true;
      corporationNumber: string;
    }
  | {
      valid: false;
      message: string;
    };

export interface ProfileDetailsRequest {
  firstName: string;
  lastName: string;
  phone: string;
  corporationNumber: string;
}

export interface ProfileDetailsResponse {
  message?: string;
}

export interface ApiError {
  message: string;
  statusCode?: number;
  details?: unknown;
}
