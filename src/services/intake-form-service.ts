export const nameFieldsPost = () => fetch('api/name', {})
  .then(res => res.json());
