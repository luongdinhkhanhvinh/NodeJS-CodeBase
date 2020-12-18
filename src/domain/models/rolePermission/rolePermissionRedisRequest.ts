export interface RolePermissionRedisRequest {
  readonly role: string;
  readonly resource: string;
  readonly action: string;
  readonly attributes: string;
}
