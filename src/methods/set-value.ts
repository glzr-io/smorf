import type { FormValue, FormState } from '../types';

export interface SetValueOpts {
  /** Deeply updates touched state of any modified paths. */
  setTouched?: boolean;

  /** Deeply updates dirty state of any modified paths. */
  setDirty?: boolean;
}

/**
 * Set value of form.
 */
export function setValue<V extends FormValue>(
  formState: FormState<V>,
  value: V | ((val: V) => V),
  _options?: SetValueOpts,
): void {
  const newValue =
    typeof value === 'function' ? value(formState.value) : value;

  // TODO: Handle updating touched and dirty states.
  formState.__internal.setFormValue(newValue);
}
