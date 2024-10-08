import type { FormValue, FieldPath, FormState } from '../types';

export function setDisabled<V extends FormValue, P extends FieldPath<V>>(
  formState: FormState<V>,
  fieldPath: P,
) {
  const { invalidFieldPaths } = formState.__internal.fieldStates;
  invalidFieldPaths.add(fieldPath.toString());
}
