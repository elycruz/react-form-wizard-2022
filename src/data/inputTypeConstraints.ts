import {TextInput} from "../input-constraint";

export const personNameInput = new TextInput({
    pattern: /^[a-z][\sa-z]{3,55}$/i,
    patternMismatch(ctx: TextInput, x?: string) {
      return 'Pattern mismatch.'
    }
  }),

  // Pseudo/naive implementation
  emailInput = new TextInput({
    pattern: /^.+(?!@)@+.(?!@)$/i, // place holder pattern
    patternMismatch(ctx: TextInput, x?: string) {
      return 'Please enter a valid email.'
    }
  });
