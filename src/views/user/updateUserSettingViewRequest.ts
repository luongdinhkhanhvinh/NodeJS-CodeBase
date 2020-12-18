export interface UpdateUserSettingViewRequest {
  readonly userId: number;
  readonly profileImageId: number;
  readonly firstName: string;
  readonly lastName: string;
  readonly currentPassword: string;
  readonly newPassword: string;
}
