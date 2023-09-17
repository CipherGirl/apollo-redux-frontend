import { BookForm } from '@/components/BookForm';
import { useParams } from 'react-router-dom';

const AddOrEditBook = () => {
  const { id } = useParams();
  return (
    <>
      <div className="container h-[calc(100vh-200px)] flex-col items-center justify-center md:grid lg:max-w-none lg:grid-cols-1 lg:px-0">
        <div className="lg:p-8">
          <div className="mx-auto flex w-full flex-col justify-center space-y-6 sm:w-[350px]">
            <div className="flex flex-col space-y-2 text-center">
              <h1 className="text-2xl font-semibold tracking-tight">
                {id ? 'Edit ' : 'Add '}New Book
              </h1>
            </div>
            <BookForm id={id} />
          </div>
        </div>
      </div>
    </>
  );
};

export default AddOrEditBook;
