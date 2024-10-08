import { JSXElement } from 'solid-js';

import { FormContext } from './form.context';
import { FormValue, FormState } from '../types';

export interface FormProviderProps<V extends FormValue> {
  formState: FormState<V>;
  children: JSXElement;
}

export function FormProvider<V extends FormValue>(props: FormProviderProps<V>) {
  return (
    <FormContext.Provider value={props.formState}>
      {props.children}
    </FormContext.Provider>
  );
}
