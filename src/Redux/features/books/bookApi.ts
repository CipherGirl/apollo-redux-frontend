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
    postBook: builder.mutation({
      query: (data) => ({
        url: `/book`,
        method: 'POST',
        body: data,
      }),
      invalidatesTags: ['books', 'recent-books'],
    }),
    editBook: builder.mutation({
      query: (data) => ({
        url: `/book`,
        method: 'PUT',
        body: data,
      }),
      invalidatesTags: ['books', 'recent-books'],
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
  usePostBookMutation,
  useEditBookMutation,
  useDeleteBookMutation,
} = bookApi;
