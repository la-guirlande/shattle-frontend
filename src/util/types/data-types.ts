/**
 * Timestamps interface.
 * 
 * This interface is used with data interfaces that have timestamps by extending this.
 */
 interface TimeStamps {
    createdAt: string;
    updatedAt: string;
}

/**
 * User data interface.
 */
export interface UserData extends TimeStamps {
    id: string;
    name: string;
    role: string;
}

/**
 * Error data interface.
 */
export interface ErrorData {
    error: ErrorCode;
    error_description: string;
}

/**
 * Error code type.
 */
export type ErrorCode =
      'access_denied'
    | 'invalid_client'
    | 'invalid_grant'
    | 'invalid_request'
    | 'invalid_scope'
    | 'network_error'
    | 'not_found'
    | 'server_error'
    | 'temporarily_unavailable'
    | 'unauthorized_client'
    | 'unsupported_grant_type'
    | 'unsupported_response_type'
    | 'validation_failed';
