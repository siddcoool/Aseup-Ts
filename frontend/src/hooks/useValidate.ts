import { useState } from "react";
import * as yup from "yup";

interface ValidationSchema<T> {
  validate: (data: T, options?: yup.ValidateOptions) => Promise<any>;
}

type ValidationErrors<T> = {
  [K in keyof T]?: string;
};

interface ValidationResult<T> {
  errors: ValidationErrors<T> | null;
  validate: (data: T) => Promise<ValidationErrors<T> | null>;
}

const useValidation = <T>(schema: ValidationSchema<T>): ValidationResult<T> => {
  const [errors, setErrors] = useState<ValidationErrors<T> | null>(null);

  const validate = async (data: T): Promise<ValidationErrors<T> | null> => {
    try {
      await schema.validate(data, { abortEarly: false });
      setErrors(null);
      return null;
    } catch (validationErrors) {
      const errorsObj: ValidationErrors<T> = {};
      (validationErrors as yup.ValidationError).inner.forEach((error) => {
        if (error.path) errorsObj[error.path as keyof T] = error.message;
      });
      setErrors(errorsObj);
      return errorsObj;
    }
  };

  return { errors, validate };
};

export default useValidation;
