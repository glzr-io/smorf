import { useContext } from 'solid-js';

import { FormContext } from './form.context';
import type { FormValue, FormState } from '../types';

export function useForm<V extends FormValue>() {
  const context = useContext(FormContext) as FormState<V>;

  if (!context) {
    throw new Error('Make sure the app is wrapped in <FormProvider />');
  }

  return context;
}
