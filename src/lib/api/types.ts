export interface CorporationNumberValidationResponse {
  valid: boolean;
  corporationNumber: string;
}

export interface ProfileDetailsRequest {
  firstName: string;
  lastName: string;
  phoneNumber: string;
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
