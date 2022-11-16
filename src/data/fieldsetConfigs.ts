import intakeFormConfig from './intake-form.json';
import {FieldsetConfig} from "../types";

export const fieldsetsList = intakeFormConfig.fieldsets as FieldsetConfig[],

  fieldsetConfigsByName = (() => {
    const lastIndex = fieldsetsList.length - 1;
    return fieldsetsList.reduce((agg, fieldset, i) => {
        const prev = fieldsetsList[!i ? i : i - 1],
          next = fieldsetsList[i !== lastIndex ? i + 1 : i];
        agg[fieldset.name] = {
          ...fieldset,
          prev: prev !== fieldset ? prev.name : null,
          next: next !== fieldset ? next.name : null
        };
        return agg;
      }, {} as { [index: string]: FieldsetConfig }
    ) as { [index: string]: FieldsetConfig };
  })();
