import type { AuthUser, LoginPayload, RegisterPayload } from '@/features/auth/types.ts'
import { apiRequest } from '@/lib/api-client.ts'

type UserResponse = { data: AuthUser }

export function fetchCurrentUser(): Promise<UserResponse> {
  return apiRequest<UserResponse>('/api/user')
}

export function loginRequest(payload: LoginPayload): Promise<UserResponse> {
  return apiRequest<UserResponse>('/api/login', { method: 'POST', body: payload })
}

export function registerRequest(payload: RegisterPayload): Promise<UserResponse> {
  return apiRequest<UserResponse>('/api/register', { method: 'POST', body: payload })
}

export function logoutRequest(): Promise<void> {
  return apiRequest<void>('/api/logout', { method: 'POST' })
}
