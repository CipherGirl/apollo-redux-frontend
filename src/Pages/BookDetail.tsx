import { useGetSingleBookQuery } from '@/Redux/features/bookApi';
import { IBook } from '@/types/globalTypes';
import React from 'react';
import { useParams } from 'react-router-dom';

const BookDetail = () => {
  const { id } = useParams();
  const queryResult = useGetSingleBookQuery(id);
  const book: IBook | undefined = queryResult.data;
  const isLoading: boolean = queryResult.isLoading;

  console.log(book);
  return isLoading ? (
    <div>Loading...</div>
  ) : (
    <div className="w-[90vw] flex flex-col items-center pt-16">
      <div className="w-1/2 flex justify-around">
        <img src={book?.imageURL} className="rounded-lg object-cover" />
        <div className="h-full flex flex-col my-auto">
          <h2 className="text-4xl font-bold mb-2">{book?.title}</h2>
          <h2 className="text-3xl mb-2">{book?.author}</h2>
          <h3 className="text-xl italic">{book?.genre}</h3>
          <h3 className="text-lg">
            Published in {book?.publicationDate.split('-')[0]}
          </h3>
        </div>
      </div>
      <div>
        {book?.reviews.map((review) => (
          <h1>{review}</h1>
        ))}
      </div>
    </div>
  );
};

export default BookDetail;
