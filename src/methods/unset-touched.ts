import type { FormValue, FormState } from '../types';

export function unsetTouched<V extends FormValue>(
  formState: FormState<V>,
) {
  const { touchedFieldPaths } = formState.__internal.fieldStates;
  touchedFieldPaths.clear();
}
