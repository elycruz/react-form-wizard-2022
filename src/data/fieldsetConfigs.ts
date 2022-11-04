import intakeFormConfig from './intake-form.json';
import {Fieldset} from "./models";

export const fieldsetsList = intakeFormConfig.fieldsets as Fieldset[],

  fieldsetConfigsByName = fieldsetsList.reduce((agg, field) => {
    agg[field.name] = field;
    return agg;
  }, {})

;
