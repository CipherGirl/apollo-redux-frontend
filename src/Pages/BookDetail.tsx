import {
  useAddReviewMutation,
  useGetSingleBookQuery,
} from '@/Redux/features/books/bookApi';
import { useAppSelector } from '@/Redux/hooks';
import { Button } from '@/components/ui/button';
import { Textarea } from '@/components/ui/textarea';
import { IBook, IReview } from '@/types/globalTypes';
import { useState } from 'react';
import { useParams } from 'react-router-dom';

const BookDetail = () => {
  const { user } = useAppSelector((state) => state.user);
  const { id } = useParams();
  const [postReview] = useAddReviewMutation();
  const queryResult = useGetSingleBookQuery(id);
  const book: IBook | undefined = queryResult.data;
  const isLoading: boolean = queryResult.isLoading;

  const [review, setReview] = useState('');

  const handleReviewPost = () => {
    postReview({
      id: book?._id,
      data: {
        email: user.email,
        review: review,
      },
    });
  };

  return isLoading ? (
    <div>Loading...</div>
  ) : (
    <div className="w-[99vw] flex flex-col justify-center items-center gap-12 pt-10">
      <div className="w-full flex justify-center items-center gap-6">
        <img src={book?.imageURL} className="rounded-lg object-cover w-1/6" />
        <div className="h-full flex flex-col my-auto">
          <h2 className="text-4xl font-bold mb-2">{book?.title}</h2>
          <h2 className="text-3xl mb-2">{book?.author}</h2>
          <h3 className="text-xl italic">{book?.genre}</h3>
          <h3 className="text-lg">
            Published in {book?.publicationDate.split('-')[0]}
          </h3>
        </div>
      </div>
      <div className="w-[50vw] flex flex-col items-center">
        <Textarea
          className="h-24"
          placeholder="Write your review here.."
          value={review}
          onChange={(e) => setReview(e.target.value)}
        />
        <Button
          className="self-end mt-4"
          variant={'outline'}
          onClick={() => handleReviewPost()}
        >
          Send
        </Button>
        {book?.reviews
          .slice()
          .reverse()
          .map((review: IReview, index: number) => {
            return (
              <div className="w-full border rounded-md my-4 p-4" key={index}>
                <div className="flex items-center gap-2 mb-4">
                  <img
                    width={24}
                    height={24}
                    src="https://cdn-icons-png.flaticon.com/512/6596/6596121.png"
                  />
                  <h2>{review.email}</h2>
                </div>
                <p className="italic text-gray-800">{review.review}</p>
              </div>
            );
          })}
      </div>
    </div>
  );
};

export default BookDetail;
