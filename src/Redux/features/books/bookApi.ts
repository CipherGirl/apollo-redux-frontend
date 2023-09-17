import { api } from '../../api/apiSlice';

const bookApi = api.injectEndpoints({
  endpoints: (builder) => ({
    getBooks: builder.query({
      query: () => '/books',
      providesTags: ['books'],
    }),
    getRecentBooks: builder.query({
      query: () => '/recent-books',
      providesTags: ['recent-books'],
    }),
    getSingleBook: builder.query({
      query: (id) => `/book/${id}`,
    }),
    deleteBook: builder.mutation({
      query: (id) => ({
        url: `/book/${id}`,
        method: 'DELETE',
      }),
      invalidatesTags: ['books', 'recent-books'],
    }),
  }),
});

export const {
  useGetBooksQuery,
  useGetRecentBooksQuery,
  useGetSingleBookQuery,
  useDeleteBookMutation,
} = bookApi;
