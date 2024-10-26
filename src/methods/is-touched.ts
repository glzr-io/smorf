import type { FormState, FormValue } from '../types';

/**
 * Whether the form is touched.
 *
 * A form is touched if any of its field paths are touched.
 *
 * @param formState Form state.
 */
export function isTouched<V extends FormValue>(
  formState: FormState<V>,
): boolean {
  const { touchedFieldPaths } = formState.__internal.fieldStates;
  return touchedFieldPaths.size > 0;
}
