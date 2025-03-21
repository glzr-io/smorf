import type { FieldPath, FormState, FormValue } from '../types';

/**
 * Whether the form field is dirty.
 *
 * A form field is dirty if:
 * * The direct field path has been modified.
 * * Any of its descendant field paths have been modified.
 *
 * @param formState Form state.
 * @param fieldPath The field to check for whether it's dirty.
 */
export function isFieldDirty<V extends FormValue, P extends FieldPath<V>>(
  formState: FormState<V>,
  fieldPath: P,
): boolean {
  const { dirtyFieldPaths } = formState.__internal.fieldStates;

  if (dirtyFieldPaths.has(fieldPath)) {
    return true;
  }

  for (const dirtyFieldPath of dirtyFieldPaths) {
    if (dirtyFieldPath.startsWith(fieldPath)) {
      return true;
    }
  }

  return false;
}
