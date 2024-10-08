import { FieldPath, FormState, FormValue } from '../types';
import { isTraversable } from '../utils';

/**
 * Whether the form or form field is dirty.
 *
 * A form or form field is dirty if:
 * * The direct field path has been modified.
 * * Any of its descendant field paths have been modified.
 *
 * @param formState Form state.
 * @param fieldPath (optional) If provided, checks whether the field is dirty;
 * otherwise checks the form as a whole.
 */
export function isDirty<V extends FormValue, P extends FieldPath<V>>(
  formState: FormState<V>,
  fieldPath?: P,
): boolean {
  const { value } = formState;
  const { dirtyFieldPaths } = formState.__internal.fieldStates;

  if (!fieldPath) {
    return dirtyFieldPaths.size > 0;
  }

  if (dirtyFieldPaths.has(fieldPath)) {
    return true;
  }

  // No need to check descendants if the value is not an object or array.
  if (isTraversable(value)) {
    for (const dirtyFieldPath of dirtyFieldPaths) {
      if (dirtyFieldPath.startsWith(fieldPath)) {
        return true;
      }
    }
  }

  return false;
}
