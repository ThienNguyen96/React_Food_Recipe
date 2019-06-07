import React, {useEffect, useState} from 'react';
import './App.css';
import Recipe from './Recipes';

const App = () => {
  const APP_ID = 'b1e0a698';
  const APP_KEY = 'd66d4b4da22d8534a5211228ff30544d';
  const [recipes, setRecipes] = useState([]);
  const [search, setSearch] = useState('');
  const [query, setQuery] = useState('chicken');

  useEffect(()=> {
    getRecipes();
    console.log('query is runing');
  }, [query]);

  const getRecipes = async () => {
    const response = await fetch(`https://api.edamam.com/search?q=${query}&app_id=${APP_ID}&app_key=${APP_KEY}`);
    const data = await response.json();
    setRecipes(data.hits);
    console.log(data.hits);
    console.log(recipes);
  }

  const updateSearch = e => {
    setSearch(e.target.value);
    console.log(search);
  };

  const getSearch = e => {
    e.preventDefault();
    setQuery(search);
  }

  return (
    <div className="App">
      <form onSubmit={getSearch} className="search-form">
        <input 
          className="search-bar"
          type="text"
          value={search}
          onChange={(e) => updateSearch(e)}/>
        <button className="search-button" type="submit">Search</button>
      </form>
     <div className="recipes">
      {
          recipes.map(recipe => (
          <Recipe
            key={recipe.recipe.image}
            title={recipe.recipe.label}
            calories={recipe.recipe.calories}
            image={recipe.recipe.image}
            ingredients={recipe.recipe.ingredients}
          /> 
          ))
        }
     </div>
    </div>
  );
}

export default App;
