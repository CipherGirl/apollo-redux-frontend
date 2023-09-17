import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';

export const api = createApi({
  reducerPath: 'api',
  baseQuery: fetchBaseQuery({
    baseUrl: 'https://apollo-redux-backend.vercel.app',
  }),
  tagTypes: ['books', 'recent-books', 'review', 'book'],
  endpoints: () => ({}),
});
