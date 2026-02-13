import React from "react"
import IngredientsList from "./IngredientsList"
import ClaudeRecipe from "./ClaudeRecipe"
import { getRecipeFromMistral } from "../ai"

export default function Main() {
    const [ingredients, setIngredients] = React.useState(
        [
            "Eggplant",
            "Lemon juice",
            "Ginger",
            "Cashew nuts",
            "Coconut oil"
        ]
    )
    const [recipeShown, setRecipeShown] = React.useState(false)
    const [recipe, setRecipe] = React.useState("");
    const recipeSection = React.useRef(null)

    React.useEffect(() => {
        recipeSection.current.scrollIntoView();
    }, [recipe]);

    /**
     * Challenge:
     * Add a new effect that calls `recipeSection.current.scrollIntoView()`
     * only if recipe is not an empty string and recipeSection.current is not null.
     * Think carefully about what value(s) you would want to include in
     * the dependencies array.
     */

    function toggleRecipeShown() {
        setRecipeShown(prevShown => !prevShown)
    }

    function addIngredient(formData) {
        const newIngredient = formData.get("ingredient")
        setIngredients(prevIngredients => [...prevIngredients, newIngredient])
    }

    async function updateRecipe() {
        setRecipe(await getRecipeFromMistral(ingredients));
        setRecipeShown(true);
    }

    return (
        <main>
            <form action={addIngredient} className="add-ingredient-form">
                <input
                    type="text"
                    placeholder="e.g. oregano"
                    aria-label="Add ingredient"
                    name="ingredient"
                />
                <button>Add ingredient</button>
            </form>

            {ingredients.length > 0 &&
                <IngredientsList
                    ref={recipeSection}
                    ingredients={ingredients}
                    toggleRecipeShown={toggleRecipeShown}
                    handleClick={updateRecipe}
                />
            }

            {recipeShown && <ClaudeRecipe recipe={recipe} />}
        </main>
    )
}