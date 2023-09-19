import { Button } from '@/components/ui/button';
import { IReview } from '@/types/globalTypes';
import { Textarea } from './ui/textarea';
import { useAddReviewMutation } from '@/Redux/features/books/bookApi';
import { useState } from 'react';
import { useAppSelector } from '@/Redux/hooks';

interface ReviewsProps {
  bookId: number;
  reviews: IReview[];
}

const Reviews = ({ bookId, reviews }: ReviewsProps) => {
  const { user } = useAppSelector((state) => state.user);

  const [postReview] = useAddReviewMutation();

  const [review, setReview] = useState('');

  const handleReviewPost = () => {
    postReview({
      id: bookId,
      data: {
        email: user.email,
        review: review,
      },
    });
  };

  return (
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
      {reviews
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
  );
};

export default Reviews;
