import {
  type ComponentProps,
  type JSXElement,
  splitProps,
} from 'solid-js';

import { FormProvider } from '../context/form.provider';
import type { FormValue, FormState } from '../types';

export interface FormProps<V extends FormValue>
  extends ComponentProps<'form'> {
  of: FormState<V>;
  children: JSXElement;
}

/**
 * Wraps a <form> element with form context.
 */
export function Form<V extends FormValue>(props: FormProps<V>) {
  const [_, others] = splitProps(props, ['of']);

  return (
    <FormProvider formState={props.of}>
      <form {...others}>{props.children}</form>
    </FormProvider>
  );
}
