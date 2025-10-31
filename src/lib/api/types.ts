/**
 * API types - Interface Segregation Principle
 * Each type represents a specific API contract
 */

/**
 * Response from corporation number validation endpoint
 */
export interface CorporationNumberValidationResponse {
  valid: boolean;
  corporationNumber: string;
}

/**
 * Request payload for profile details submission
 */
export interface ProfileDetailsRequest {
  firstName: string;
  lastName: string;
  phone: string;
  corporationNumber: string;
}

/**
 * Response from profile details submission
 */
export interface ProfileDetailsResponse {
  message?: string;
}

/**
 * Generic API error type
 */
export interface ApiError {
  message: string;
  statusCode?: number;
  details?: unknown;
}
