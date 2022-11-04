import {TextInput} from "../input-constraint";

export const personNameInput = new TextInput({
    pattern: /^[a-z][\sa-z]{3,55}$/i,
    patternMisMatch(x?: string) {
      return 'Pattern mismatch.'
    }
  }),

  // Pseudo/naive implementation
  emailInput = new TextInput({
    pattern: /^.+(?!@)@+.(?!@)$/i, // place holder pattern
    patternMisMatch(x?: string) {
      return 'Please enter a valid email.'
    }
  });
