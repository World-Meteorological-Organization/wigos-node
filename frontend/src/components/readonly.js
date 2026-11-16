import { inject } from "vue";

// Provided by WmdrForm: true hides the controls that change the record.
export const READONLY = Symbol("readonly");
export const useReadonly = () => inject(READONLY, false);
