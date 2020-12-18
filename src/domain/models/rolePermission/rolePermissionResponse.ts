export interface RolePermissionResponse {
  readonly role: string;
  readonly resource: string;
  readonly action: string;
  readonly attributes: string;
}
