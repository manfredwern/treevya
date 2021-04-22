import React from 'react';
import PropTypes, { func } from 'prop-types';

const Categories = ({ allCategories, onCategoryClick }) => (
  <>
    <div className="select is-large is-fullwidth">
      <select onChange={onCategoryClick}>
        {allCategories.map((category) => (
          <option key={category.id} id={category.id} className={category.id}>
            {category.name}
          </option>
        ))}
      </select>
    </div>
  </>
);

Categories.propTypes = {
  // eslint-disable-next-line react/forbid-prop-types
  allCategories: PropTypes.array.isRequired,
  onCategoryClick: PropTypes.func,
};

Categories.defaultProps = {
  onCategoryClick: func,
};

export default Categories;
