/**
 * Gets whether value can have nested values (ie. whether it's a primitive or
 * array/object).
 */
export function isTraversable(value: unknown): boolean {
  return isPlainObject(value) || Array.isArray(value);
}

/**
 * Whether given value is an object literal.
 */
function isPlainObject(value: unknown): value is object {
  return value instanceof Object && !(value instanceof Array);
}
