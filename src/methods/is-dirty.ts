import type { FormState, FormValue } from '../types';

/**
 * Whether the form is dirty.
 *
 * A form is dirty if any of its field paths are dirty.
 *
 * @param formState Form state.
 */
export function isDirty<V extends FormValue>(
  formState: FormState<V>,
): boolean {
  const { dirtyFieldPaths } = formState.__internal.fieldStates;
  return dirtyFieldPaths.size > 0;
}
