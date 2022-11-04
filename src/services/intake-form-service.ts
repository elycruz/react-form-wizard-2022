export const nameValuesPost = () => fetch('api/name', {})
  .then(res => res.json());
