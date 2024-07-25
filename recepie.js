const searchbox= document.querySelector('.searchbox');
const searchbtn= document.querySelector('.searchbtn');
const recepieContainer= document.querySelector('.recepie-container');
const recepiedetailscontent=document.querySelector('.recepie-details-content');
const recepieclosebtn=document.querySelector('.recepie-close-btn');

const fetchrecepie= async (query) => {
    recepieContainer.innerHTML="<h2>fetching recepie.....</h2>";
    try {
const data= await fetch(`https://www.themealdb.com/api/json/v1/1/search.php?s=${query}`);
const response= await data.json();

recepieContainer.innerHTML="";
response.meals.forEach(meal => {
    const recepieDiv = document.createElement('div');
    recepieDiv.classList.add('recepie');
    recepieDiv.innerHTML=`
    <img src="${meal.strMealThumb}">
    <h3>${meal.strMeal}</h3>
    <p><span>${meal.strArea}</span> Dish</p>
    <p>Belongs to <span>${meal.strCategory}</span> Category</p>
    `
    const button=document.createElement('button');
    button.textContent="View Recepie";
    recepieDiv.appendChild(button);
    //adding event listener to button
    button.addEventListener('click',()=>{
        openRecepiePopup(meal);
    });
    recepieContainer.appendChild(recepieDiv);
});
    }
    catch (error) {
        recepieContainer.innerHTML="<h2>ERROR in fetching recepie</h2>";
}
}
const fetchIngredients = (meal) => {
    let IngredientsList="";
    for(let i=1; i<=20;i++){
const Ingredients=meal[`strIngredient${i}`];    
if(Ingredients){
    const measure=meal[`strMeasure${i}`];
    IngredientsList+=`<li>${measure}  ${Ingredients}</li>`
}else{
    break;
}
    }
    return IngredientsList;
}
const openRecepiePopup = (meal) => {
recepiedetailscontent.innerHTML=`
<h2 class="recepieName">${meal.strMeal}</h2>
<h3>Ingredients:</h3>
<ul class="ingredientsList">${fetchIngredients(meal)}</ul>
<div class="recepieInstructions">
  <h3>Instructions:</h3>    
  <p>${meal.strInstructions}</p>
</div>
`
recepiedetailscontent.parentElement.style.display="block";
}
recepieclosebtn.addEventListener('click', ()=>{
recepiedetailscontent.parentElement.style.display="none";
})
searchbtn.addEventListener('click', (e) =>  {
e.preventDefault();
const searchInput=searchbox.value.trim();
fetchrecepie(searchInput);
});