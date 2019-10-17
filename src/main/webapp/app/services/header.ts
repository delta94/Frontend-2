export const authHeaders = {
  'Content-Type': 'application/json',
  Authorization: `Bearer ${localStorage.getItem(`jhi-authenticationToken`)}`
};

export const authHeadersForFile = {
  'Content-Type': 'application/json',
  Authorization: ``,
  responseType: 'blob'
};
