import type { FieldPath } from './field-path.model';
import type { FieldStates } from './field-states.model';
import type { FieldValue } from './field-value.model';
import type { FormValue } from './form-value.model';
import type {
  SetFieldDirtyOpts,
  SetFieldTouchedOpts,
  SetFieldValueOpts,
  SetValueOpts,
  UnsetFieldDirtyOpts,
  UnsetFieldTouchedOpts,
} from '../methods';
import type { CreateFormOptions } from '../primitives';

export interface FormState<V extends FormValue> {
  value: V;
  getFieldError<P extends FieldPath<V>>(fieldPath: P): string | null;
  getFieldErrors<P extends FieldPath<V>>(fieldPath: P): string[];
  getFieldValue<P extends FieldPath<V>>(fieldPath: P): FieldValue<V, P>;
  isDirty(): boolean;
  isFieldDirty<P extends FieldPath<V>>(fieldPath: P): boolean;
  hasError(): boolean;
  hasFieldError<P extends FieldPath<V>>(fieldPath: P): boolean;
  isFieldTouched<P extends FieldPath<V>>(fieldPath: P): boolean;
  isTouched(): boolean;
  setFieldDirty<P extends FieldPath<V>>(
    fieldPath: P,
    options?: SetFieldDirtyOpts,
  ): void;
  setFieldTouched<P extends FieldPath<V>>(
    fieldPath: P,
    options?: SetFieldTouchedOpts,
  ): void;
  setFieldValue<P extends FieldPath<V>>(
    fieldPath: P,
    value:
      | FieldValue<V, P>
      | ((val: FieldValue<V, P>) => FieldValue<V, P>),
    options?: SetFieldValueOpts,
  ): void;
  setValue(value: V | ((val: V) => V), options?: SetValueOpts): void;
  unsetDirty(): void;
  unsetFieldDirty<P extends FieldPath<V>>(
    fieldPath: P,
    options?: UnsetFieldDirtyOpts,
  ): void;
  unsetFieldTouched<P extends FieldPath<V>>(
    fieldPath: P,
    options?: UnsetFieldTouchedOpts,
  ): void;
  unsetTouched(): void;
  validate(): boolean;
  validateField<P extends FieldPath<V>>(fieldPath: P): boolean;

  __internal: {
    /**
     * Options for the form.
     *
     * @internal
     */
    options?: CreateFormOptions<V>;

    /**
     * State of the form fields (e.g. dirty, touched, etc.).
     *
     * @internal
     */
    fieldStates: FieldStates;

    /**
     * Update states of form fields (e.g. dirty, touched, etc.).
     *
     * @internal
     */
    setFieldStates: (fieldStates: FieldStates) => void;

    /**
     * Update form value.
     *
     * @internal
     */
    setFormValue: (value: V) => void;
  };
}
