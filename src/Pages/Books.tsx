import useInView from '@/hooks/useInView';
import { IBook } from '@/types/globalTypes';
import { useNavigate } from 'react-router-dom';
import editIcon from '/editIcon.svg';
import trashIcon from '/trashIcon.svg';
import { useAppDispatch, useAppSelector } from '@/Redux/hooks';
import {
  useDeleteBookMutation,
  useGetBooksQuery,
} from '@/Redux/features/books/bookApi';
import { Input } from '@/components/ui/input';
import { setSearch } from '@/Redux/features/filter/filterSlice';
import { Button } from '@/components/ui/button';

const Books = () => {
  const dispatch = useAppDispatch();
  const navigate = useNavigate();
  const [ref, inView] = useInView();
  const { user } = useAppSelector((state) => state.user);
  const { searchKeyword } = useAppSelector((state) => state.filter);
  const { data: bookData, isLoading } = useGetBooksQuery(undefined);
  const [deleteBook] = useDeleteBookMutation();

  const filterBySearchKeyword = (book: IBook) => {
    if (!searchKeyword) return true; // If no search keyword is provided, return all books

    const keyword = searchKeyword.toLowerCase();

    return (
      book?.title?.toLowerCase().includes(keyword) ||
      book?.author?.toLowerCase().includes(keyword) ||
      book?.genre?.toLowerCase().includes(keyword)
    );
  };

  return (
    <div ref={ref} className="container w-screen py-20">
      <div className="flex items-center justify-between">
        <h1 className="text-3xl font-bold">All Books</h1>
        <Button
          className="inline border rounded-sm bg-cyan-600/25"
          variant={'link'}
          onClick={() => navigate('/add-book')}
        >
          Add New
        </Button>
      </div>
      {isLoading ? (
        <h2> Loading...</h2>
      ) : (
        <>
          <div className="relative my-6">
            <Input
              onChange={(e) => dispatch(setSearch(e.target.value))}
              className="w-1/3 "
              placeholder="search book.."
            />
            <img
              src="https://www.freepnglogos.com/uploads/search-png/search-icon-clip-art-clkerm-vector-clip-art-online-22.png"
              className="absolute  w-[2%] top-2 right-[67%]"
            />
          </div>
          <div className="grid grid-cols-4 gap-6">
            {bookData.data
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
        </>
      )}
    </div>
  );
};

export default Books;
