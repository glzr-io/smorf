import { ReactiveSet } from '@solid-primitives/set';
import { createStore } from 'solid-js/store';
import { createSignal } from 'solid-js';

import type { FormValue, FormState, FieldStates } from '../types';
import {
  isDisabled,
  isDirty,
  isInvalid,
  isTouched,
  setDirty,
  setValue,
  setTouched,
  getValue,
  setDisabled,
  setInvalid,
  unsetDirty,
  unsetDisabled,
  unsetInvalid,
  unsetTouched,
} from '../methods';

export function createForm<V extends FormValue>(
  initialValue: V,
): FormState<V> {
  const [formValue, setFormValue] = createSignal<V>(initialValue);

  const [fieldStates, setFieldStates] = createStore<FieldStates>({
    dirtyFieldPaths: new ReactiveSet(),
    disabledFieldPaths: new ReactiveSet(),
    invalidFieldPaths: new ReactiveSet(),
    touchedFieldPaths: new ReactiveSet(),
  });

  const formState: FormState<V> = {
    get value() {
      return formValue();
    },
    isDisabled: (...args) => isDisabled(formState, ...args),
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
    setDisabled: (...args) => setDisabled(formState, ...args),
    setInvalid: (...args) => setInvalid(formState, ...args),
    setTouched: (...args) => setTouched(formState, ...args),
    setValue: (...args: unknown[]) =>
      setValue(
        // Coercion is needed because overloaded fn type isn't correctly inferred.
        ...([formState, ...args] as unknown as Parameters<
          typeof setValue
        >),
      ),
    unsetDirty: (...args) => unsetDirty(formState, ...args),
    unsetDisabled: (...args) => unsetDisabled(formState, ...args),
    unsetInvalid: (...args) => unsetInvalid(formState, ...args),
    unsetTouched: (...args) => unsetTouched(formState, ...args),
    __internal: {
      fieldStates,
      setFormValue,
      setFieldStates,
    },
  };

  return formState;
}
