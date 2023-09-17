'use client';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { useForm } from 'react-hook-form';
import { useEffect } from 'react';
import {
  useEditBookMutation,
  useGetSingleBookQuery,
  usePostBookMutation,
} from '@/Redux/features/books/bookApi';
import toast from 'react-hot-toast';

interface BookFormInputs {
  title: string;
  author: string;
  genre: string;
  imageURL: string;
  publicationDate: string;
}
export function BookForm({ id }: { id: string | undefined }) {
  const {
    register,
    handleSubmit,
    formState: { errors },
    setValue,
    reset,
  } = useForm<BookFormInputs>();

  const { data: book } = useGetSingleBookQuery(id, {
    skip: !id ? true : false,
  });

  const [
    postBook,
    { isLoading: isPostLoading, isSuccess: isPostSuccess, error: errorPost },
  ] = usePostBookMutation();
  const [
    editBook,
    { isLoading: isEditLoading, isSuccess: isEditSuccess, error: errorEdit },
  ] = useEditBookMutation();

  useEffect(() => {
    reset();
    if (book && id) {
      setValue('title', book.title);
      setValue('author', book.author);
      setValue('genre', book.genre);
      setValue('imageURL', book.imageURL);
      setValue('publicationDate', book.publicationDate);
    }
  }, [book, id, setValue, reset]);

  useEffect(() => {
    isPostSuccess && toast.success('Added a new book successfully');
    isEditSuccess && toast.success('Updated the book successfully');
    // eslint-disable-next-line @typescript-eslint/ban-ts-comment
    // @ts-ignore
    errorPost?.data?.error && toast.error(errorPost?.data?.error);
    // eslint-disable-next-line @typescript-eslint/ban-ts-comment
    // @ts-ignore
    errorEdit?.data?.error && toast.error(errorEdit?.data?.error);
  }, [isPostSuccess, isEditSuccess, errorEdit, errorPost]);

  const onSubmit = (data: BookFormInputs) => {
    const bookData = {
      title: data.title,
      author: data.author,
      genre: data.genre,
      imageURL: data.imageURL,
      publicationDate: data.publicationDate,
    };
    id ? editBook({ id: id, data: bookData }) : postBook(bookData);
  };

  return (
    <div className="flex flex-col items-center justify-center p-4">
      <form className="w-full" onSubmit={handleSubmit(onSubmit)}>
        <div className="grid gap-6">
          <div className="grid gap-3">
            <Label className="sr-only" htmlFor="title">
              Title
            </Label>
            <Input
              id="title"
              placeholder="Book Name"
              type="text"
              {...register('title', { required: 'Title is required' })}
            />
            {errors.title && (
              <p className="text-red-700">{errors.title.message}</p>
            )}
            <Label className="sr-only" htmlFor="author">
              Author Name
            </Label>
            <Input
              id="author"
              placeholder="Author Name"
              type="text"
              autoCapitalize="none"
              {...register('author', { required: 'Author is required' })}
            />
            {errors.author && (
              <p className="text-red-700">{errors.author.message}</p>
            )}
            <Label className="sr-only" htmlFor="genre">
              Genre
            </Label>
            <Input
              id="genre"
              placeholder="Genre"
              type="text"
              autoCapitalize="none"
              {...register('genre', { required: 'Genre is required' })}
            />
            {errors.genre && (
              <p className="text-red-700">{errors.genre.message}</p>
            )}
            <Label className="sr-only" htmlFor="imageURL">
              Image URL
            </Label>
            <Input
              id="imageURL"
              placeholder="Image URL"
              type="text"
              autoCapitalize="none"
              {...register('imageURL', { required: 'Image URL is required' })}
            />
            {errors.imageURL && (
              <p className="text-red-700">{errors.imageURL.message}</p>
            )}
            <Label className="sr-only" htmlFor="publicationDate">
              Publication Date
            </Label>
            <Input
              id="publicationDate"
              placeholder="Date of Publication"
              type="date"
              autoCapitalize="none"
              {...register('publicationDate', {
                required: 'Publication date is required',
              })}
            />
            {errors.publicationDate && (
              <p className="text-red-700">{errors.publicationDate.message}</p>
            )}
          </div>
          <Button disabled={isEditLoading || isPostLoading}>
            {isEditLoading || isPostLoading ? (
              <div
                className="text-center inline-block h-6 w-6 animate-spin rounded-full border-4 border-solid border-current border-r-transparent align-[-0.125em] motion-reduce:animate-[spin_1.5s_linear_infinite]"
                role="status"
              >
                <span className="!absolute !-m-px !h-px !w-px !overflow-hidden !whitespace-nowrap !border-0 !p-0 ![clip:rect(0,0,0,0)]">
                  Loading...
                </span>
              </div>
            ) : (
              `${id ? 'Edit' : 'Add New'} Book`
            )}
          </Button>
        </div>
      </form>
    </div>
  );
}
