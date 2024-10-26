import type { FormState, FormValue } from '../types';

/**
 * Whether the form is invalid.
 *
 * A form is invalid if any of its field paths are invalid.
 *
 * @param formState Form state.
 */
export function isInvalid<V extends FormValue>(
  formState: FormState<V>,
): boolean {
  const { invalidFieldPaths } = formState.__internal.fieldStates;
  return invalidFieldPaths.size > 0;
}
