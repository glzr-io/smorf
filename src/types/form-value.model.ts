import type { FieldPrimitive } from './field-primitive.model';

export type NestedFormValue =
  | FieldPrimitive
  | FieldPrimitive[]
  | { [name: string]: NestedFormValue }
  | { [name: string]: NestedFormValue }[];

/** Top level of form value must be an object. */
export interface FormValue {
  [name: string]: NestedFormValue;
}
