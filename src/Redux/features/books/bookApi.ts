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
      providesTags: (_result, _error, id) => [{ type: 'book', id }],
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
      query: ({ id, data }) => ({
        url: `/book/${id}`,
        method: 'PUT',
        body: data,
      }),
      invalidatesTags: (_result, _error, context) => [
        { type: 'book', id: context.id },
        { type: 'books' },
        { type: 'recent-books' },
      ],
    }),
    deleteBook: builder.mutation({
      query: (id) => ({
        url: `/book/${id}`,
        method: 'DELETE',
      }),
      invalidatesTags: ['books', 'recent-books'],
    }),
    addReview: builder.mutation({
      query: ({ id, data }) => ({
        url: `/review/${id}`,
        method: 'POST',
        body: data,
      }),
      invalidatesTags: (_result, _error, context) => [
        { type: 'book', id: context.id },
      ],
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
  useAddReviewMutation,
} = bookApi;
