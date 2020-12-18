import { IllegalParameterError } from "@errors/illegalParameterError";
import joi from "joi";
import { ACTION_METHOD } from "src/common/enum/actionMethod";

export class NewAuditLogRequest {
  public static readonly SCHEMA = joi
    .object({
      userId: joi.number().optional(),
      logtime: joi.date().required(),
      requestUrl: joi.string().required(),
      controllerName: joi.string().optional().allow(null, ""),
      actionName: joi.string().required(),
      responseCode: joi.number().required(),
      authToken: joi.string().optional(),
      sourceIP: joi.string().optional().allow(null, ""),
      requestBody: joi.any().optional().allow(null, ""),
      requestDate: joi.date().required(),
      requestDeviceInfo: joi.string().optional().allow(null, ""),
      requestUserAgent: joi.string().optional().allow(null, ""),
      responseBody: joi.any().optional().allow(null, ""),
      responseDate: joi.date().required(),
      responseError: joi.string().optional().allow(null, ""),
      trackingId: joi.string().optional().allow(null, ""),
    })
    .required();

  public static validate(request: NewAuditLogRequest) {
    const { error } = joi.validate(request, NewAuditLogRequest.SCHEMA);

    if (error) {
      throw new IllegalParameterError(
        "NewUserRequest",
        "validate",
        `Invalid provided values: ${error.message}`
      );
    }
  }

  private readonly logtime: Date;
  constructor(
    public readonly userId: number,
    public readonly requestUrl: string,
    public readonly controllerName: string,
    public readonly actionName: string,
    public readonly responseCode: number,
    public readonly authToken: string,
    public readonly sourceIP: string,
    public readonly requestBody: any,
    public readonly requestDate: Date,
    public readonly requestDeviceInfo: string,
    public readonly requestUserAgent: string,
    public readonly responseBody: any,
    public readonly responseDate: Date,
    public readonly responseError: string,
    public readonly trackingId: string,
  ) {
    this.logtime = new Date();
    NewAuditLogRequest.validate(this);
  }
}
