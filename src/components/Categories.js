import React, { useEffect, useState, useContext } from 'react';
import QuizContext from '../QuizContext';
import { fetchDataFromApi } from '../services/helper';
import TriviaApi from '../data/opentrivia';
import initialCategories from '../data/categories';

const Categories = () => {
  const { setCategory } = useContext(QuizContext);

  const [categories, setCategories] = useState([]);

  const handleChange = (event) => {
    const id = event.target.selectedOptions[0].id || 0;
    setCategory({ name: event.target.value, id });
  };

  /**
   * Fetch a list of Categories from API
   */
  useEffect(() => {
    (async function () {
      const responseCategories = await fetchDataFromApi(TriviaApi.category).then((res) =>
        res.trivia_categories.map((category) => ({
          ...category,
          name: category.name.replace(/Entertainment:|Science:/, '').trim(),
        })),
      );
      setCategories([...initialCategories, ...responseCategories]);
    })();

    return setCategories([]);
  }, []);

  const div = categories.length ? (
    <div className="select is-large is-fullwidth">
      <select onChange={handleChange} defaultValue={'Select Category'}>
        {categories?.map((category) => (
          <option
            key={category.id}
            id={category.id}
            className={category.id}
            disabled={category.disabled}
          >
            {category.name}
          </option>
        ))}
      </select>
    </div>
  ) : (
    'Collecting categories'
  );

  return div;
};

export default Categories;
