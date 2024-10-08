import { ReactiveSet } from '@solid-primitives/set';
import { createStore } from 'solid-js/store';

import type { FormValue, BaseFormState, FieldStates } from '../types';

export function createBaseForm<V extends FormValue>(
  initialValue: V,
): BaseFormState<V> {
  const [formValue, setFormValue] = createStore<V>(initialValue);

  const [fieldStates, setFieldStates] = createStore<FieldStates>({
    dirtyFieldPaths: new ReactiveSet(),
    disabledFieldPaths: new ReactiveSet(),
    invalidFieldPaths: new ReactiveSet(),
    touchedFieldPaths: new ReactiveSet(),
  });

  return {
    value: formValue,
    __internal: {
      fieldStates: fieldStates,
      setFieldStates: setFieldStates,
      setFormValue: setFormValue,
    },
  };
}
