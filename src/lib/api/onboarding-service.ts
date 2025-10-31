import { apiClient } from '@/lib/api/axios-instance';
import type {
  ApiError,
  CorporationNumberValidationResponse,
  ProfileDetailsRequest,
  ProfileDetailsResponse,
} from '@/lib/api/types';
import type { AxiosError } from 'axios';

export class OnboardingService {
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

  static async submitProfileDetails(
    data: ProfileDetailsRequest,
  ): Promise<ProfileDetailsResponse> {
    try {
      const response = await apiClient.post<ProfileDetailsResponse>(
        '/profile-details',
        data,
      );
      return response.data;
    } catch (error) {
      const axiosError = error as AxiosError;
      throw this.handleError(axiosError, 'Failed to submit profile details');
    }
  }

  static handleError(axiosError: AxiosError, defaultMessage: string): ApiError {
    if (axiosError.response) {
      return {
        message:
          (axiosError.response.data as { message?: string })?.message ||
          defaultMessage,
        statusCode: axiosError.response.status,
        details: axiosError.response.data,
      };
    } else if (axiosError.request) {
      return {
        message: 'Network error. Please try again.',
        details: axiosError.message,
      };
    }

    return {
      message: defaultMessage,
      details: axiosError.message,
    };
  }
}
