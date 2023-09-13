import { useGetBooksQuery } from '@/Redux/features/bookApi';
import useInView from '@/hooks/useInView';
import { IBook } from '@/types/globalTypes';
import { useNavigate } from 'react-router-dom';

const Books = () => {
  const navigate = useNavigate();
  const [ref, inView] = useInView();
  const { data: bookData, isLoading } = useGetBooksQuery(undefined);
  return (
    <div ref={ref} className="container w-screen py-20">
      <h1 className="text-3xl font-bold">All Books</h1>
      {isLoading ? (
        <h2> Loading...</h2>
      ) : (
        <div className="flex flex-wrap gap-5 my-16">
          {bookData.data.map((book: IBook, index: number) => (
            <div
              key={book._id}
              style={{ transitionDelay: `${inView ? `${index * 50}ms` : ''}` }}
              className={`transition-all duration-300 hover:duration-100 hover:delay-0 ${
                inView
                  ? 'opacity-100 transform translate-y-0 hover:scale-105'
                  : 'opacity-0 translate-y-5'
              }`}
            >
              <div
                className={`flex-none w-[19rem] bg-white shadow-lg rounded-lg flex gap-4`}
              >
                <img
                  src={book.imageURL}
                  className="w-1/2 h-full rounded-l-lg object-cover"
                  onClick={() => navigate(`/book-details/${book._id}`)}
                />
                <div className="h-full flex flex-col my-auto">
                  <h2 className="text-xl font-bold mb-2">{book.title}</h2>
                  <h2 className="text-md mb-2">{book.author}</h2>
                  <h3 className="text-sm italic">{book.genre}</h3>
                  <h3 className="text-xs">
                    Published in {book.publicationDate.split('-')[0]}
                  </h3>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default Books;
