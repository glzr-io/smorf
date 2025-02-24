import type { FormState, FormValue } from '../types';

/**
 * Whether the form has an error.
 *
 * A form has an error if any of its field paths have an error.
 *
 * @param formState Form state.
 */
export function hasError<V extends FormValue>(
  formState: FormState<V>,
): boolean {
  const { errorFieldPaths } = formState.__internal.fieldStates;
  return errorFieldPaths.size > 0;
}
