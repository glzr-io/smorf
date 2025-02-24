import { batch } from 'solid-js';

import type {
  FormValue,
  FieldPath,
  FormState,
  FieldValue,
} from '../types';

export interface SetFieldValueOpts {
  /**
   * Deeply updates touched state of any modified field paths.
   *
   * @default false
   */
  setTouched?: boolean;

  /**
   * Deeply updates dirty state of any modified field paths.
   *
   * @default true
   */
  setDirty?: boolean;

  /**
   * Validate the field after setting the value.
   *
   * @default true
   */
  validate?: boolean;
}

/**
 * Set value of field by its path.
 */
export function setFieldValue<V extends FormValue, P extends FieldPath<V>>(
  formState: FormState<V>,
  fieldPath: P,
  value: FieldValue<V, P> | ((val: FieldValue<V, P>) => FieldValue<V, P>),
  options?: SetFieldValueOpts,
): void {
  const currentValue = formState.getFieldValue(fieldPath);

  const newValue =
    typeof value === 'function' ? value(currentValue) : value;

  batch(() => {
    formState.__internal.setFormValue(
      updatedObject(formState.value, fieldPath, newValue),
    );

    if (fieldPath && options?.setTouched === true) {
      formState.setFieldTouched(fieldPath);
    }

    if (fieldPath && options?.setDirty !== false) {
      formState.setFieldDirty(fieldPath);
    }

    if (fieldPath && options?.validate !== false) {
      formState.validateField(fieldPath);
    }
  });
}

// TODO: Avoid `any` types.
function updatedObject(
  object: any,
  fieldPath: string | null,
  newValue: any,
) {
  if (!fieldPath) {
    return newValue;
  }

  const stack = fieldPath.split('.');
  const newObject = { ...object };
  let target = newObject;

  while (stack.length > 1) {
    target = target[stack.shift()!];
  }

  target[stack.shift()!] = newValue;

  return newObject;
}
