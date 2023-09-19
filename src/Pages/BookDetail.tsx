import { useGetSingleBookQuery } from '@/Redux/features/books/bookApi';
import Reviews from '@/components/Reviews';
import { IBook } from '@/types/globalTypes';
import { useParams } from 'react-router-dom';

const BookDetail = () => {
  const { id } = useParams();

  const queryResult = useGetSingleBookQuery(id);
  const book: IBook | undefined = queryResult.data;
  const isLoading: boolean = queryResult.isLoading;

  return isLoading ? (
    <div>Loading...</div>
  ) : (
    book && (
      <div className="w-[99vw] flex flex-col justify-center items-center gap-12 pt-10">
        <div className="w-full flex justify-center items-center gap-6">
          <img src={book.imageURL} className="rounded-lg object-cover w-1/6" />
          <div className="h-full flex flex-col my-auto">
            <h2 className="text-4xl font-bold mb-2">{book.title}</h2>
            <h2 className="text-3xl mb-2">{book.author}</h2>
            <h3 className="text-xl italic">{book.genre}</h3>
            <h3 className="text-lg">
              Published in {book.publicationDate.split('-')[0]}
            </h3>
          </div>
        </div>
        <Reviews bookId={book._id} reviews={book.reviews} />
      </div>
    )
  );
};

export default BookDetail;
