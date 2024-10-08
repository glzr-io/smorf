import type { FieldPath, FormState, FormValue } from '../types';
import { getAncestorFieldPaths } from '../utils';

/**
 * Whether the form or form field is disabled.
 *
 * A form or form field is disabled if:
 * * The direct field path has been disabled.
 * * Any of its direct ancestor field paths have been disabled.
 *
 * @param formState Form state.
 * @param fieldPath Field to check whether disabled.
 */
export function isDisabled<V extends FormValue, P extends FieldPath<V>>(
  formState: FormState<V>,
  fieldPath: P,
): boolean {
  const { disabledFieldPaths } = formState.__internal.fieldStates;

  return getAncestorFieldPaths(fieldPath)
    .concat(fieldPath)
    .some(fieldPath => disabledFieldPaths.has(fieldPath));
}
