import type { FormValue, FieldPath, FormState, FieldValue } from '../types';

export interface SetValueOptions {
  /** Deeply updates touched state of any modified field paths. */
  setTouched?: boolean;

  /** Deeply updates dirty state of any modified field paths. */
  setDirty?: boolean;
}

/**
 * Set value of form or field by its path.
 */

// Function signature for setting value for form as a whole.
export function setValue<V extends FormValue>(
  formState: FormState<V>,
  value: V | ((val: V) => V),
  options?: SetValueOptions,
): void;

// Function signature for setting value for form field.
export function setValue<V extends FormValue, P extends FieldPath<V>>(
  formState: FormState<V>,
  fieldPath: P,
  value: FieldValue<V, P> | ((val: FieldValue<V, P>) => FieldValue<V, P>),
  options?: SetValueOptions,
): void;

// Merged function signatures.
export function setValue<V extends FormValue, P extends FieldPath<V>>(
  formState: FormState<V>,
  ...args: unknown[]
) {
  const { fieldPath, value, options } = extractArgs<V, P>(formState, ...args);

  const currentValue = fieldPath ? formState.getValue(fieldPath) : formState.value;

  // TODO: Avoid type coercion.
  const newValue = typeof value === 'function' ? value(currentValue as any) : value;

  formState.__internal.setFormValue(
    // @ts-ignore - TODO
    ...(fieldPath?.split?.('.') ?? []),
    newValue,
  );

  // TODO: Handle `setTouched` for root form.
  if (fieldPath && options?.setTouched === true) {
    formState.setTouched(fieldPath);
  }

  // TODO: Handle `setDirty` for root form.
  if (fieldPath && options?.setDirty !== false) {
    formState.setDirty(fieldPath);
  }
}

function extractArgs<V extends FormValue, P extends FieldPath<V>>(
  _: FormState<V>,
  ...args: unknown[]
) {
  if (typeof args[0] === 'string') {
    return {
      fieldPath: args[0] as P,
      value: args[1] as
        | FieldValue<V, P>
        | ((val: FieldValue<V, P>) => FieldValue<V, P>),
      options: args[2] as SetValueOptions,
    };
  }

  return {
    fieldPath: null,
    value: args[0] as V | ((val: V) => V),
    options: args[1] as SetValueOptions,
  };
}
