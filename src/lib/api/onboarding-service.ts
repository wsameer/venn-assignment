import { AxiosError } from 'axios';
import { apiClient } from './axios-instance';
import type {
  CorporationNumberValidationResponse,
  ProfileDetailsRequest,
  ProfileDetailsResponse,
  ApiError,
} from './types';

export class OnboardingService {
  /**
   * Validates a corporation number with the API
   * @param corporationNumber - The 9-digit corporation number to validate
   * @returns Promise with validation result
   */
  static async validateCorporationNumber(
    corporationNumber: string,
  ): Promise<CorporationNumberValidationResponse> {
    try {
      const response = await apiClient.get<CorporationNumberValidationResponse>(
        `/corporation-number/${corporationNumber}`,
      );
      return response.data;
    } catch (error) {
      const axiosError = error as AxiosError;
      throw this.handleError(
        axiosError,
        'Failed to validate corporation number',
      );
    }
  }

  /**
   * Submits profile details to the API
   * @param data - Profile details to submit
   * @returns Promise with submission result
   */
  static async submitProfileDetails(
    data: ProfileDetailsRequest,
  ): Promise<ProfileDetailsResponse | string> {
    try {
      const response = await apiClient.post<ProfileDetailsResponse | string>(
        '/profile-details',
        data,
      );
      return response.data;
    } catch (error) {
      const axiosError = error as AxiosError;
      throw this.handleError(
        axiosError,
        'Failed to validate corporation number',
      );
    }
  }

  /**
   * Centralized error handling for API calls
   * @param error - Axios error object
   * @param defaultMessage - Default error message
   * @returns Structured API error
   */
  private static handleError(
    error: AxiosError,
    defaultMessage: string,
  ): ApiError {
    if (error.response) {
      return {
        message:
          (error.response.data as { message?: string })?.message ||
          defaultMessage,
        statusCode: error.response.status,
        details: error.response.data,
      };
    } else if (error.request) {
      return {
        message: 'Network error. Please try after your internet is back.',
        details: error.message,
      };
    }

    return {
      message: defaultMessage,
      details: error.message,
    };
  }
}
