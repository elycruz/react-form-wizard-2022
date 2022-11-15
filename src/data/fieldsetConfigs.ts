import intakeFormConfig from './intake-form.json';
import {Fieldset} from "../types";

export const fieldsetsList = intakeFormConfig.fieldsets as Fieldset[],

  fieldsetConfigsByName = (() => {
    const lastIndex = fieldsetsList.length - 1;
    return fieldsetsList.reduce((agg, field, i) => {
      const prev = fieldsetsList[!i ? i : i - 1],
        next = fieldsetsList[i !== lastIndex ? i + 1 : i];
      agg[field.name] = {
        ...field,
        prev: prev !== field ? prev.name : null,
        next: next !== field ? next.name : null
      };
      return agg;
    }, {}) as {[index: string]: Fieldset};
  })();
