import useInView from '@/hooks/useInView';
import { useNavigate } from 'react-router-dom';
import { useGetBooksQuery } from '@/Redux/features/books/bookApi';
import { Button } from '@/components/ui/button';
import FilterBook from '@/components/FilterBook';
import BookList from '@/components/BookList';

const Books = () => {
  const navigate = useNavigate();
  const [ref, inView] = useInView();

  const { data: bookData, isLoading } = useGetBooksQuery(undefined);

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
          <FilterBook bookData={bookData.data} />
          <BookList inView={inView} bookData={bookData.data} />
        </>
      )}
    </div>
  );
};

export default Books;
