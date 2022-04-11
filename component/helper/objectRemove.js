//e : input array
export function responseFilter(e, inputFilter = []) {
  const defaultfilter = ["password", "deleted_at", "updatedAt", "createdAt"];
  const filter = [...defaultfilter, ...inputFilter];
  for (let key of filter) {
    for (let key2 of e) {
      delete key2[key];
    }
    delete e[key];
  }
  return e;
}
