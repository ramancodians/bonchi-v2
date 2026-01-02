import { env } from '@bonchi/shared';
interface SendSMSParams {
  numbers: string | string[]; // Phone numbers to send SMS to (comma-separated or array)
  message?: string; // Message text (for Quick SMS)
  variables_values?: string; // Variable values for DLT template (pipe-separated: value1|value2)
  route?: 'dlt' | 'q'; // 'dlt' for DLT SMS, 'q' for Quick SMS (default: 'dlt')
  sender_id?: string; // 6-character sender ID (only for DLT)
  entity_id?: string; // DLT Entity ID
  template_id?: string; // DLT Template ID
  flash?: 0 | 1; // Flash SMS (0: No, 1: Yes)
}

interface Fast2SMSResponse {
  return: boolean;
  request_id?: string;
  message?: string[];
  error?: string;
}

class SMSService {
  private apiKey: string;
  private endpoint: string;

  constructor() {
    this.apiKey = env.FAST2SMS_API_KEY;
    this.endpoint = env.FAST2SMS_ENDPOINT;

    if (!this.apiKey) {
      throw new Error(
        'FAST2SMS_API_KEY is not configured in environment variables'
      );
    }
  }

  /**
   * Send transactional SMS using DLT approved template
   * This is the recommended method for sending OTP and transactional messages
   */
  async sendDLTSMS(params: {
    numbers: string | string[];
    sender_id: string;
    entity_id: string;
    template_id: string;
    variables_values: string;
  }): Promise<Fast2SMSResponse> {
    const numbers = Array.isArray(params.numbers)
      ? params.numbers.join(',')
      : params.numbers;

    const payload = {
      route: 'dlt',
      sender_id: params.sender_id,
      message: '',
      entity_id: params.entity_id,
      template_id: params.template_id,
      variables_values: params.variables_values,
      flash: 0,
      numbers: numbers,
    };

    return this.sendRequest(payload);
  }

  /**
   * Send OTP SMS using DLT template
   * Example: Your OTP is {#var#}. Valid for 10 minutes.
   */
  async sendOTP(params: {
    phoneNumber: string;
    otp: string;
    sender_id: string;
    entity_id: string;
    template_id: string;
  }): Promise<Fast2SMSResponse> {
    return this.sendDLTSMS({
      numbers: params.phoneNumber,
      sender_id: params.sender_id,
      entity_id: params.entity_id,
      template_id: params.template_id,
      variables_values: params.otp,
    });
  }

  /**
   * Send Quick SMS (without DLT registration)
   * Note: This costs ₹5.00 per SMS and uses random numeric sender ID
   */
  async sendQuickSMS(params: {
    numbers: string | string[];
    message: string;
  }): Promise<Fast2SMSResponse> {
    const numbers = Array.isArray(params.numbers)
      ? params.numbers.join(',')
      : params.numbers;

    const payload = {
      route: 'q',
      message: params.message,
      flash: 0,
      numbers: numbers,
    };

    return this.sendRequest(payload);
  }

  /**
   * Send request to Fast2SMS API
   */
  private async sendRequest(payload: any): Promise<Fast2SMSResponse> {
    try {
      const response = await fetch(this.endpoint, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          authorization: this.apiKey,
        },
        body: JSON.stringify(payload),
      });

      const data = (await response.json()) as Fast2SMSResponse;

      if (!response.ok) {
        throw new Error(
          `Fast2SMS API error: ${data.message || response.statusText}`
        );
      }

      return data;
    } catch (error) {
      console.error('Error sending SMS:', error);
      throw error;
    }
  }

  /**
   * Validate Indian phone number format
   */
  validatePhoneNumber(phoneNumber: string): boolean {
    // Remove spaces, hyphens, and country code
    const cleaned = phoneNumber.replace(/[\s\-+]/g, '');

    // Check if it starts with 91 (country code)
    if (cleaned.startsWith('91') && cleaned.length === 12) {
      return /^91[6-9]\d{9}$/.test(cleaned);
    }

    // Check if it's 10 digits starting with 6-9
    if (cleaned.length === 10) {
      return /^[6-9]\d{9}$/.test(cleaned);
    }

    return false;
  }

  /**
   * Format phone number to 10 digits (remove country code if present)
   */
  formatPhoneNumber(phoneNumber: string): string {
    const cleaned = phoneNumber.replace(/[\s\-+]/g, '');

    // Remove country code if present
    if (cleaned.startsWith('91') && cleaned.length === 12) {
      return cleaned.substring(2);
    }

    return cleaned;
  }
}

// Export singleton instance
export const smsService = new SMSService();
export default smsService;
