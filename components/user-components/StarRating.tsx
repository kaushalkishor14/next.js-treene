// app/components/ui/StarRating.tsx
import React from 'react';

interface StarRatingProps {
  rating: number; // Rating value (0 to 5)
  reviews: number; // Number of reviews
}

const StarRating: React.FC<StarRatingProps> = ({ rating, reviews }) => {
  // Generate stars based on the rating
  const stars = Array.from({ length: 5 }, (_, index) => (
    <span key={index} className={index < Math.floor(rating) ? "text-yellow-500" : "text-gray-600"}>
      ★
    </span>
  ));

  return (
    <div className="mt-4">
      <span className="text-yellow-400">{stars}</span>
      <span className="ml-2 text-gray-400">
        {rating.toFixed(1)} ({reviews} reviews)
      </span>
    </div>
  );
};

export default StarRating;
