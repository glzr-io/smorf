import { createContext } from 'solid-js';

import type { FormState } from '../types';

export const FormContext = createContext<FormState<any>>();
