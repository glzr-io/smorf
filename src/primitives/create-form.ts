import { FormValue, FormState } from '../types';
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
import { createBaseForm } from './create-base-form';

export function createForm<V extends FormValue>(initialValue: V): FormState<V> {
  const { value, __internal } = createBaseForm<V>(initialValue);

  const formState: FormState<V> = {
    value,
    __internal,
    isDisabled: (...args) => isDisabled(formState, ...args),
    isDirty: (...args) => isDirty(formState, ...args),
    isInvalid: (...args) => isInvalid(formState, ...args),
    isTouched: (...args) => isTouched(formState, ...args),
    getValue: (...args: unknown[]) =>
      getValue(
        // Coercion is needed because overloaded fn type isn't correctly inferred.
        ...([formState, ...args] as unknown as Parameters<typeof getValue>),
      ),
    setDirty: (...args) => setDirty(formState, ...args),
    setDisabled: (...args) => setDisabled(formState, ...args),
    setInvalid: (...args) => setInvalid(formState, ...args),
    setTouched: (...args) => setTouched(formState, ...args),
    setValue: (...args: unknown[]) =>
      setValue(
        // Coercion is needed because overloaded fn type isn't correctly inferred.
        ...([formState, ...args] as unknown as Parameters<typeof setValue>),
      ),
    unsetDirty: (...args) => unsetDirty(formState, ...args),
    unsetDisabled: (...args) => unsetDisabled(formState, ...args),
    unsetInvalid: (...args) => unsetInvalid(formState, ...args),
    unsetTouched: (...args) => unsetTouched(formState, ...args),
  };

  return formState;
}
