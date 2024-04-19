import * as Joi from "joi";

export function throwIfInvalidObject(
  data: object,
  schema: Joi.Schema,
  errorMessage?: string,
): void {
  const error = schema.validate(data).error;
  if (error) {
    if (errorMessage) {
      throw new Error(errorMessage);
    } else {
      throw error;
    }
  }
}
