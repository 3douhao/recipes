/* eslint-disable no-undef */
import Recipe from '../models/Recipe'

const getRecipe = id => getRecipes().find(id)

const deleteRecipe = id =>
  new Promise(async (resolve, reject) => {
    let recipes = await getRecipes()
    recipes = recipes.filter(r => r.id !== id)
    localStorage.setItem('recipes', JSON.stringify(recipes))
    resolve()
  })

const editRecipe = recipe =>
  new Promise(async (resolve, reject) => {
    const recipes = await getRecipes()
    recipes.forEach((r, i) => {
      if (r.id === recipe.id) {
        recipes[i] = recipe
      }
    })
    localStorage.setItem('recipes', JSON.stringify(recipes))
    resolve()
  })

const createRecipe = (recipes = [], recipe) =>
  new Promise((resolve, reject) => {
    const items = JSON.stringify(recipes.concat(new Recipe(recipe)))
    localStorage.setItem('recipes', items)
    resolve()
  })

const favoriteRecipe = id =>
  new Promise(async (resolve, reject) => {
    const recipes = await getRecipes()
    recipes.map(r => {
      if (r.id === id) r.favorite = true
    })
    localStorage.setItem('recipes', JSON.stringify(recipes))
    resolve()
  })

const unFavoriteRecipe = id =>
  new Promise(async (resolve, reject) => {
    const recipes = await getRecipes()
    recipes.map(r => {
      if (r.id === id) r.favorite = false
    })
    localStorage.setItem('recipes', JSON.stringify(recipes))
    resolve()
  })

const getRecipes = () =>
  new Promise((resolve, reject) =>
    resolve(JSON.parse(localStorage.getItem('recipes')) || [])
  )

export {
  deleteRecipe,
  createRecipe,
  getRecipes,
  getRecipe,
  favoriteRecipe,
  unFavoriteRecipe,
  editRecipe
}
