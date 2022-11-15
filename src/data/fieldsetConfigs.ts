import intakeFormConfig from './intake-form.json';
import {Fieldset} from "../types";

export const fieldsetsList = intakeFormConfig.fieldsets as Fieldset[],

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
      }, {} as { [index: string]: Fieldset }
    ) as { [index: string]: Fieldset };
  })();
