import axios from "axios";

const searchInput = document.getElementById("search") as HTMLInputElement;
const searchButton = document.getElementById("search-btn") as HTMLButtonElement;
const resultContainer = document.getElementById("result") as HTMLDivElement;

const API_URL = "https://www.themealdb.com/api/json/v1/1/search.php?s=";

interface Meal {
  idMeal: string;
  strMeal: string;
  strInstructions: string;
  strMealThumb: string;
}

const fetchMeals = async (query: string): Promise<Meal[] | null> => {
  try {
    const response = await axios.get(`${API_URL}${encodeURIComponent(query)}`);
    return response.data.meals;
  } catch (error) {
    console.error("Error fetching meals:", error);
    return null;
  }
};

const displayMeals = (meals: Meal[] | null) => {
  resultContainer.innerHTML = "";

  if (!meals || meals.length === 0) {
    resultContainer.innerHTML = `<p>No meals found.</p>`;
    return;
  }

  meals.forEach((meal) => {
    const mealCard = document.createElement("div");
    mealCard.classList.add("meal");
    mealCard.innerHTML = `
      <img src="${meal.strMealThumb}" alt="${meal.strMeal}" />
      <h2>${meal.strMeal}</h2>
      <p>${meal.strInstructions.substring(0, 100)}</p>
    `;
    resultContainer.appendChild(mealCard);
  });
};

searchButton.addEventListener("click", async () => {
  const query = searchInput.value.trim();
  if (!query) return;

  searchButton.disabled = true;
  searchButton.textContent = "Searching...";

  const meals = await fetchMeals(query);
  displayMeals(meals);

  searchButton.disabled = false;
  searchButton.textContent = "Search";
});

searchInput.addEventListener("keydown", (e) => {
  if (e.key === "Enter") {
    searchButton.click();
  }
});