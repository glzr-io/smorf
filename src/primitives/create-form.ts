import { ReactiveSet } from '@solid-primitives/set';
import { createStore } from 'solid-js/store';
import { createSignal } from 'solid-js';

import type { FormValue, FormState, FieldStates } from '../types';
import {
  isDirty,
  isInvalid,
  isTouched,
  setDirty,
  setValue,
  setTouched,
  getValue,
  unsetDirty,
  unsetTouched,
} from '../methods';

export function createForm<V extends FormValue>(
  initialValue: V,
): FormState<V> {
  const [formValue, setFormValue] = createSignal<V>(initialValue);

  const [fieldStates, setFieldStates] = createStore<FieldStates>({
    dirtyFieldPaths: new ReactiveSet(),
    invalidFieldPaths: new ReactiveSet(),
    touchedFieldPaths: new ReactiveSet(),
  });

  const formState: FormState<V> = {
    get formValue() {
      return formValue();
    },
    isDirty: (...args) => isDirty(formState, ...args),
    isInvalid: (...args) => isInvalid(formState, ...args),
    isTouched: (...args) => isTouched(formState, ...args),
    getValue: (...args: unknown[]) =>
      getValue(
        // Coercion is needed because overloaded fn type isn't correctly inferred.
        ...([formState, ...args] as unknown as Parameters<
          typeof getValue
        >),
      ),
    setDirty: (...args) => setDirty(formState, ...args),
    setTouched: (...args) => setTouched(formState, ...args),
    setValue: (...args: unknown[]) =>
      setValue(
        // Coercion is needed because overloaded fn type isn't correctly inferred.
        ...([formState, ...args] as unknown as Parameters<
          typeof setValue
        >),
      ),
    unsetDirty: (...args) => unsetDirty(formState, ...args),
    unsetTouched: (...args) => unsetTouched(formState, ...args),
    __internal: {
      fieldStates,
      setFormValue,
      setFieldStates,
    },
  };

  return formState;
}
