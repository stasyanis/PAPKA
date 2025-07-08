import { useState } from 'react';
import { CATEGORIES } from '../../utils/constants';

const CategoryFilter = ({ onCategoryChange }) => {
  const [activeCategory, setActiveCategory] = useState('Все мероприятия');

  const handleCategoryClick = (category) => {
    setActiveCategory(category);
    if (onCategoryChange) onCategoryChange(category);
  };

  return (
    <section className="categories">
      <h2 className="section-title">
        <i className="fas fa-tags"></i> Категории мероприятий
      </h2>
      <div className="categories-list">
        {CATEGORIES.map(category => (
          <div
            key={category}
            className={`category ${activeCategory === category ? 'active' : ''}`}
            onClick={() => handleCategoryClick(category)}
          >
            {category}
          </div>
        ))}
      </div>
    </section>
  );
};

export default CategoryFilter;