import React, { useState } from 'react';
import { TAGS_OPTIONS } from '../constants';
import type { Rating } from '../types';

interface RatingFormProps {
  locationId: string;
  onSubmit: (locationId: string, rating: Omit<Rating, 'id' | 'author' | 'timestamp'>) => void;
}

export const RatingForm: React.FC<RatingFormProps> = ({ locationId, onSubmit }) => {
  const [rating, setRating] = useState(0);
  const [hoverRating, setHoverRating] = useState(0);
  const [comment, setComment] = useState('');
  const [selectedTags, setSelectedTags] = useState<string[]>([]);

  const handleTagToggle = (tag: string) => {
    setSelectedTags(prev =>
      prev.includes(tag) ? prev.filter(t => t !== tag) : [...prev, tag]
    );
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (rating === 0) {
      alert('Por favor, selecione uma nota.');
      return;
    }
    onSubmit(locationId, { rating, comment, tags: selectedTags });
    // Reset form
    setRating(0);
    setComment('');
    setSelectedTags([]);
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      <div>
        <label className="block text-sm font-medium text-gray-700 mb-2">Sua nota de silêncio:</label>
        <div className="flex space-x-1 text-3xl text-gray-300">
          {[1, 2, 3, 4, 5].map(star => (
            <span
              key={star}
              className={`cursor-pointer transition-colors ${(hoverRating || rating) >= star ? 'text-yellow-400' : ''}`}
              onMouseEnter={() => setHoverRating(star)}
              onMouseLeave={() => setHoverRating(0)}
              onClick={() => setRating(star)}
            >
              <i className="fa-solid fa-star"></i>
            </span>
          ))}
        </div>
      </div>

      <div>
        <label htmlFor="comment" className="block text-sm font-medium text-gray-700">Comentário (opcional):</label>
        <textarea
          id="comment"
          value={comment}
          onChange={e => setComment(e.target.value)}
          rows={3}
          className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500 sm:text-sm"
          placeholder="Como foi sua experiência? Havia música? Era um bom lugar para se concentrar?"
        />
      </div>

      <div>
        <label className="block text-sm font-medium text-gray-700">Tags (opcional):</label>
        <div className="flex flex-wrap gap-2 mt-2">
          {TAGS_OPTIONS.map(tag => (
            <button
              type="button"
              key={tag}
              onClick={() => handleTagToggle(tag)}
              className={`px-3 py-1 text-sm font-medium rounded-full border transition-colors ${
                selectedTags.includes(tag)
                  ? 'bg-blue-600 text-white border-blue-600'
                  : 'bg-white text-gray-700 border-gray-300 hover:bg-gray-100'
              }`}
            >
              {tag}
            </button>
          ))}
        </div>
      </div>
      
      <button
        type="submit"
        className="w-full sm:w-auto px-6 py-2 bg-blue-600 text-white font-semibold rounded-lg hover:bg-blue-700 transition-colors disabled:bg-gray-400"
        disabled={rating === 0}
      >
        Enviar Avaliação
      </button>
    </form>
  );
};
