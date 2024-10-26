import type { FieldPath } from './field-path.model';
import type { FieldStates } from './field-states.model';
import type { FieldValue } from './field-value.model';
import type { FormValue } from './form-value.model';
import type {
  SetDirtyOptions,
  SetTouchedOptions,
  SetValueOptions,
  UnsetDirtyOptions,
  UnsetTouchedOptions,
} from '../methods';

export interface FormState<V extends FormValue> {
  value: V;
  getValue(): V;
  getValue<P extends FieldPath<V>>(fieldPath: P): FieldValue<V, P>;
  isDirty<P extends FieldPath<V>>(fieldPath?: P): boolean;
  isInvalid<P extends FieldPath<V>>(fieldPath?: P): boolean;
  isTouched<P extends FieldPath<V>>(fieldPath?: P): boolean;
  setDirty<P extends FieldPath<V>>(
    fieldPath: P,
    options?: SetDirtyOptions,
  ): void;
  setTouched<P extends FieldPath<V>>(
    fieldPath: P,
    options?: SetTouchedOptions,
  ): void;
  setValue(value: V | ((val: V) => V), options?: SetValueOptions): void;
  setValue<P extends FieldPath<V>>(
    fieldPath: P,
    value:
      | FieldValue<V, P>
      | ((val: FieldValue<V, P>) => FieldValue<V, P>),
    options?: SetValueOptions,
  ): void;
  unsetDirty<P extends FieldPath<V>>(
    fieldPath: P,
    options?: UnsetDirtyOptions,
  ): void;
  unsetTouched<P extends FieldPath<V>>(
    fieldPath: P,
    options?: UnsetTouchedOptions,
  ): void;

  __internal: {
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
