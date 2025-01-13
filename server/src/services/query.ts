import { ParsedQs } from "qs";

const DEFAULT_PAGE_NUMBER = 1;
const DEFAULT_PAGE_LIMIT = 0;

export const getPagination = (query: ParsedQs) => {
  const limit = Math.abs(Number(query.limit)) || DEFAULT_PAGE_LIMIT;
  const page = Math.abs(Number(query.page)) || DEFAULT_PAGE_NUMBER;

  const skip = (page - 1) * limit;

  return {
    limit,
    skip,
  };
};
