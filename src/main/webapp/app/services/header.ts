export const authHeaders = {
  'Content-Type': 'application/json',
  Authorization: `Bearer ${localStorage.getItem(`jhi-authenticationToken`)}`
};
