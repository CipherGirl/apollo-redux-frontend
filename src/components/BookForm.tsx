'use client';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { useForm } from 'react-hook-form';
import { useParams } from 'react-router-dom';
import { useEffect } from 'react';
import {
  useEditBookMutation,
  useGetSingleBookQuery,
  usePostBookMutation,
} from '@/Redux/features/books/bookApi';

interface BookFormInputs {
  title: string;
  author: string;
  genre: string;
  imageURL: string;
  publicationDate: string;
}
export function BookForm() {
  const {
    register,
    handleSubmit,
    formState: { errors },
    setValue,
  } = useForm<BookFormInputs>();

  const { id } = useParams();
  console.log(id);

  const { data: book } = useGetSingleBookQuery(id, {
    skip: !id ? true : false,
  });

  const [postBook] = usePostBookMutation();
  const [editBook] = useEditBookMutation();

  useEffect(() => {
    if (book && id) {
      setValue('title', book.title);
      setValue('author', book.author);
      setValue('genre', book.genre);
      setValue('imageURL', book.imageURL);
      setValue('publicationDate', book.publicationDate);
    }
  }, [book, id, setValue]);

  const onSubmit = (data: BookFormInputs) => {
    const bookData = {
      title: data.title,
      author: data.author,
      genre: data.genre,
      imageURL: data.imageURL,
      publicationDate: data.publicationDate,
    };
    id ? postBook(bookData) : editBook(bookData);
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
          <Button>{id ? 'Edit' : 'Add'} New Book</Button>
        </div>
      </form>
    </div>
  );
}
