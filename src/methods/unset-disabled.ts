import { FormValue, FieldPath, FormState } from '../types';

export function unsetDisabled<V extends FormValue, P extends FieldPath<V>>(
  formState: FormState<V>,
  fieldPath: P,
) {
  const { disabledFieldPaths } = formState.__internal.fieldStates;
  disabledFieldPaths.delete(fieldPath);
}
