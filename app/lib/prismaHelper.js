import { PrismaClient } from "@prisma/client";

export const prisma = new PrismaClient();

export function responseFilter(e, inputFilter = []) {
  const defaultfilter = ["password", "deleted_at", "updatedAt"];
  const filter = [...defaultfilter, ...inputFilter];
  if (typeof e == "object") {
    for (let key of filter) {
      delete e[key];
    }
  } else {
  }
  return e;
}

//e : input array
export function reqFilter(e, inputFilter = []) {
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

export function objectparse(input) {
  Object.entries(input).forEach(([key, value]) => {
    if (typeof value == "object") {
      objectparse(value);
    }
    if (typeof value == "object" && Array.isArray(value)) {
      input[key] = { create: input[key] };
    }
  });

  return input;
}
