import type { FormValue, FormState } from '../types';

export function unsetDirty<V extends FormValue>(formState: FormState<V>) {
  const { dirtyFieldPaths } = formState.__internal.fieldStates;
  dirtyFieldPaths.clear();
}
