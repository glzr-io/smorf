import { createContext } from 'solid-js';

import { FormState } from '../types';

export const FormContext = createContext<FormState<any>>();
