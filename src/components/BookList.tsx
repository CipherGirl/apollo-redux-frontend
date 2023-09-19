import { IBook } from '@/types/globalTypes';
import { useNavigate } from 'react-router-dom';
import editIcon from '/editIcon.svg';
import trashIcon from '/trashIcon.svg';
import { useAppSelector } from '@/Redux/hooks';
import {
  useDeleteBookMutation,
} from '@/Redux/features/books/bookApi';

interface BookListProps {
  inView: boolean;
  bookData: IBook[];
}

const BookList = ({ inView, bookData }: BookListProps) => {
  const navigate = useNavigate();
  const { user } = useAppSelector((state) => state.user);
  const { searchKeyword, showByGenre } = useAppSelector(
    (state) => state.filter
  );
  const [deleteBook] = useDeleteBookMutation();

  const filterBySearchKeyword = (book: IBook) => {
    if (showByGenre !== 'all' && book?.genre !== showByGenre) return false;
    if (!searchKeyword) return true;

    const keyword = searchKeyword.toLowerCase();

    return (
      book?.title?.toLowerCase().includes(keyword) ||
      book?.author?.toLowerCase().includes(keyword) ||
      book?.genre?.toLowerCase().includes(keyword)
    );
  };
  return (
    <div className="grid grid-cols-4 gap-6">
      {bookData
        .filter(filterBySearchKeyword)
        .map((book: IBook, index: number) => (
          <div
            key={book._id}
            style={{
              transitionDelay: `${inView ? `${index * 50}ms` : ''}`,
            }}
            className={`transition-all duration-300 hover:duration-100 hover:delay-0 ${
              inView
                ? 'opacity-100 transform translate-y-0 hover:scale-105'
                : 'opacity-0 translate-y-5'
            }`}
          >
            <div
              className={`flex-none w-[19rem] bg-white shadow-lg rounded-lg flex gap-4 relative`}
            >
              <img
                src={book.imageURL}
                className="w-1/2 h-full rounded-l-lg object-cover"
                onClick={() => navigate(`/book-details/${book._id}`)}
              />
              <div className="w-full h-full flex flex-col">
                {user.email ? (
                  <div className="flex justify-end">
                    <img
                      src={editIcon}
                      width={20}
                      className="m-1 cursor-pointer"
                      onClick={() => navigate(`/edit-book/${book._id}`)}
                    />
                    <img
                      src={trashIcon}
                      width={22}
                      className="m-1 cursor-pointer"
                      onClick={() => deleteBook(book._id)}
                    />
                  </div>
                ) : (
                  <div className="w-5 h-7"></div>
                )}
                <div className="flex-1 flex flex-col justify-center">
                  <h2
                    className="text-xl font-bold m-2 ms-0 cursor-pointer"
                    onClick={() => navigate(`/book-details/${book._id}`)}
                  >
                    {book.title}
                  </h2>
                  <h2 className="text-md mb-2">{book.author}</h2>
                  <h3 className="text-sm italic">{book.genre}</h3>
                  <h3 className="text-xs">
                    Published in {book.publicationDate.split('-')[0]}
                  </h3>
                </div>
              </div>
            </div>
          </div>
        ))}
    </div>
  );
};

export default BookList;
