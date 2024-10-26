import { ReactiveSet } from '@solid-primitives/set';
import { createStore } from 'solid-js/store';
import { createSignal } from 'solid-js';

import type { FormValue, FormState, FieldStates } from '../types';
import {
  isFieldDirty,
  isFieldInvalid,
  isFieldTouched,
  setFieldDirty,
  setFieldValue,
  setFieldTouched,
  getFieldValue,
  unsetFieldDirty,
  unsetFieldTouched,
  isDirty,
  isTouched,
  isInvalid,
  setValue,
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
    get value() {
      return formValue();
    },
    getFieldValue: (...args) => getFieldValue(formState, ...args),
    isDirty: (...args) => isDirty(formState, ...args),
    isFieldDirty: (...args) => isFieldDirty(formState, ...args),
    isFieldInvalid: (...args) => isFieldInvalid(formState, ...args),
    isFieldTouched: (...args) => isFieldTouched(formState, ...args),
    isInvalid: (...args) => isInvalid(formState, ...args),
    isTouched: (...args) => isTouched(formState, ...args),
    setFieldDirty: (...args) => setFieldDirty(formState, ...args),
    setFieldTouched: (...args) => setFieldTouched(formState, ...args),
    setFieldValue: (...args) => setFieldValue(formState, ...args),
    setValue: (...args) => setValue(formState, ...args),
    unsetDirty: (...args) => unsetDirty(formState, ...args),
    unsetFieldDirty: (...args) => unsetFieldDirty(formState, ...args),
    unsetTouched: (...args) => unsetTouched(formState, ...args),
    unsetFieldTouched: (...args) => unsetFieldTouched(formState, ...args),
    __internal: {
      fieldStates,
      setFormValue,
      setFieldStates,
    },
  };

  return formState;
}
