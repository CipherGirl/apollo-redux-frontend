import { api } from '../api/apiSlice';

const productApi = api.injectEndpoints({
  endpoints: (builder) => ({
    getBooks: builder.query({
      query: () => '/books',
    }),
    getRecentBooks: builder.query({
      query: () => '/recent-books',
    }),
    getSingleBook: builder.query({
      query: (id) => `/book/${id}`,
    }),
  }),
});

export const {
  useGetBooksQuery,
  useGetRecentBooksQuery,
  useGetSingleBookQuery,
} = productApi;
