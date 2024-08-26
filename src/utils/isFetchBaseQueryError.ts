/* eslint-disable @typescript-eslint/no-explicit-any */
import { FetchBaseQueryError } from "@reduxjs/toolkit/query";

export const isFetchBaseQueryError = (
  error: any
): error is FetchBaseQueryError => {
  return error && "data" in error;
};
