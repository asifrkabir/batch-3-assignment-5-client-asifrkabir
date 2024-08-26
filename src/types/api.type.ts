import { BaseQueryApi } from "@reduxjs/toolkit/query";
import React from "react";

export type TError = {
  data: {
    message: string;
    stack: string;
    success: boolean;
    statusCode: number;
  };
};

export type TMeta = {
  limit: number;
  page: number;
  total: number;
  totalPage: number;
};

export type TApiResponse<T> = {
  data?: T;
  token?: string;
  error?: TError;
  meta?: TMeta;
  success: boolean;
  message: string;
};

export type TResponseRedux<T> = TApiResponse<T> & BaseQueryApi;

export type TQueryParam = {
  name: string;
  value: boolean | React.Key;
};
