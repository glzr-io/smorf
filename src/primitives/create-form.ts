import { ReactiveSet } from '@solid-primitives/set';
import { ReactiveMap } from '@solid-primitives/map';
import { createStore } from 'solid-js/store';
import { createSignal } from 'solid-js';
import { z } from 'zod';

import type { FormValue, FormState, FieldStates } from '../types';
import {
  isFieldDirty,
  hasFieldError,
  isFieldTouched,
  setFieldDirty,
  setFieldValue,
  setFieldTouched,
  getFieldValue,
  unsetFieldDirty,
  unsetFieldTouched,
  isDirty,
  isTouched,
  hasError,
  setValue,
  unsetDirty,
  unsetTouched,
  validate,
  validateField,
  getFieldError,
  getFieldErrors,
} from '../methods';

export type CreateFormOptions<V extends FormValue> = {
  /**
   * The Zod schema to validate the form value against.
   */
  schema?: z.ZodType<V>;

  /**
   * When to validate the form.
   *
   * Can be overridden by the `validateOn` option in the `Field` component.
   */
  validateOn?: 'blur' | 'change' | 'never';
};

export function createForm<V extends FormValue>(
  initialValue: V,
  options?: CreateFormOptions<V>,
): FormState<V> {
  const [formValue, setFormValue] = createSignal<V>(initialValue);

  const [fieldStates, setFieldStates] = createStore<FieldStates>({
    dirtyFieldPaths: new ReactiveSet(),
    errorFieldPaths: new ReactiveMap(),
    touchedFieldPaths: new ReactiveSet(),
  });

  const formState: FormState<V> = {
    get value() {
      return formValue();
    },
    getFieldError: (...args) => getFieldError(formState, ...args),
    getFieldErrors: (...args) => getFieldErrors(formState, ...args),
    getFieldValue: (...args) => getFieldValue(formState, ...args),
    isDirty: (...args) => isDirty(formState, ...args),
    isFieldDirty: (...args) => isFieldDirty(formState, ...args),
    hasFieldError: (...args) => hasFieldError(formState, ...args),
    isFieldTouched: (...args) => isFieldTouched(formState, ...args),
    hasError: (...args) => hasError(formState, ...args),
    isTouched: (...args) => isTouched(formState, ...args),
    setFieldDirty: (...args) => setFieldDirty(formState, ...args),
    setFieldTouched: (...args) => setFieldTouched(formState, ...args),
    setFieldValue: (...args) => setFieldValue(formState, ...args),
    setValue: (...args) => setValue(formState, ...args),
    unsetDirty: (...args) => unsetDirty(formState, ...args),
    unsetFieldDirty: (...args) => unsetFieldDirty(formState, ...args),
    unsetTouched: (...args) => unsetTouched(formState, ...args),
    unsetFieldTouched: (...args) => unsetFieldTouched(formState, ...args),
    validate: (...args) => validate(formState, ...args),
    validateField: (...args) => validateField(formState, ...args),
    __internal: {
      options,
      fieldStates,
      setFormValue,
      setFieldStates,
    },
  };

  return formState;
}
