/**
 * Entry-point for non tree-shakeable package. Exports `createForm`, which
 * includes all form-related methods.
 */

export * from './components';
export * from './types';

export { createForm } from './primitives/create-form';
