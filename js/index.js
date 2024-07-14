// ----------------------------nav-bar---------------------------

let firstSectionWidth = $('.first-section').innerWidth();
function openSideNav() {
    $('.sideBar').animate({ left: "0px" }, 1000)
    $(".open-close-icon").removeClass("fa-align-justify");
    $(".open-close-icon").addClass("fa-x");
    for (let i = 0; i < 5; i++) {


        $(".sideBarLinks li").eq(i).animate({ top: 0 }, (i + 5) * 200);

    }

}


function closeSideNav() {


    $('.sideBar').animate({ left: -firstSectionWidth }, 500)
    $(".open-close-icon").addClass("fa-align-justify");
    $(".open-close-icon").removeClass("fa-x");
    $('.sideBarLinks li').animate({ top: '300px' }, 500)
}

$(".sideBar").css("left", -firstSectionWidth);
$('.sideBarLinks li').css('top', '300px')

$('.open-close-icon').on('click', function () {
    if ($('.sideBar').css('left') == "0px") {
        closeSideNav();
    } else {
        openSideNav()
    }
})


let rowData = document.getElementById('rowData')
///////////////////////////////////////////////////////////////////

//////////////////////////////Home and Details(fetching & display)/////////////////




async function homeData() {
    $('.loading').fadeIn(0)
    $('.loading').css("display", "flex")
    let api = await fetch(`https://www.themealdb.com/api/json/v1/1/search.php?s=`)
    let response = await api.json();
    displayData(response.meals);
    $('.loading').fadeOut(1000)
}

function displayData(arr) {
    let cartona = ``
    for (let i = 0; i < arr.length; i++) {
        cartona += `<div class="col-md-3 py-4" onclick='getMealDetails("${arr[i].idMeal}")'>
                <figure class="card custom position-relative">
                    <img src="${arr[i].strMealThumb}" class="w-100" alt="${arr[i].strMeal}">

                    <figcaption class="position-absolute top-0 start-0 end-0 bottom-0  d-flex align-items-center">
                        <h3 class="fs-2 fw-bold p-2">${arr[i].strMeal}</h3>
                    </figcaption>
                </figure>
            </div>`

    }

    rowData.innerHTML = cartona;
}


async function getMealDetails(id) {
    $('.loading').fadeIn(0)
    $('.loading').css("display", "flex")
    searchData.innerHTML = ""
    let api = await fetch(`https://www.themealdb.com/api/json/v1/1/lookup.php?i=${id}`)
    let response = await api.json()
    console.log(response);
    displayMealDetails(response.meals[0])
    $('.loading').fadeOut(1000)
}

function displayMealDetails(meal) {
    searchData.innerHTML = ""
    let ingredients = ``;
    for (let i = 1; i <= 20; i++) {
        if (meal[`strIngredient${i}`]) {
            ingredients += `<li class="alert alert-info m-2 p-1">${meal[`strMeasure${i}`]
                } ${meal[`strIngredient${i}`]}</li>`;
        }
    }

    let tags = meal.strTags?.split(",");
    if (!tags) {
        tags = [];
    }

    let tagsStr = "";
    for (let i = 0; i < tags.length; i++) {
        tagsStr += `
        <li class="alert alert-danger m-2 p-1">${tags[i]}</li>`;
    }

    let cartona = ` <div class="col-md-4">
                <div class="inner pt-4">
                    <img src="${meal.strMealThumb}" class="w-100 rounded-3" alt="${meal.strMeal}">
                    <h2 class="text-white">${meal.strMeal}</h2>
                </div>
            </div>

            <div class="col-md-8">
                <div class="inner pt-4">
                    <h2 class="text-white">Instructions</h2>
                    <p class="text-white">${meal.strInstructions}</p>

                    <h3 class="text-white">Area : <span>${meal.strArea}</span></h3>
                    <h3 class="text-white">Category : <span>${meal.strCategory}</span></h3>
                    <h3 class="text-white">Recepies : </h3>
                    <ul class="list-unstyled d-flex g-3 flex-wrap">
                        ${ingredients}
                    </ul>
                    <h3 class="text-white">Tags :</h3>
                    <ul class="list-unstyled d-flex g-3 flex-wrap">
                    ${tagsStr}
                    </ul>
                    <a target="_blank" href="${meal.strSource}" class="btn btn-success">Source</a>
                    <a target="_blank" href="${meal.strYoutube}" class="btn btn-danger">Youtube</a>
                </div>
            </div>`

    rowData.innerHTML = cartona;
}
homeData()

//////////////////////////////Category and Details(fetching & display)/////////////////

async function getCategories() {
    $('.loading').fadeIn(0)
    $('.loading').css("display", "flex")
    searchData.innerHTML = ""
    let api = await fetch(`https://www.themealdb.com/api/json/v1/1/categories.php`)
    let response = await api.json();
    displayCategories(response.categories);
    $('.loading').fadeOut(1000)

}

function displayCategories(arr) {
    let cartona = ``
    for (let i = 0; i < arr.length; i++) {
        cartona += ` <div class="col-md-3 py-4 bg-black">
                <figure class="card custom background position-relative"  onclick="getCategoryMeals('${arr[i].strCategory}')">
                    <img src="${arr[i].strCategoryThumb}" class="w-100" alt="${arr[i].strCategory}">

                    <figcaption class="position-absolute top-0 start-0 end-0 bottom-0 text-center">
                        <h3 class="fs-2 fw-bold p-2">${arr[i].strCategory}</h3>
                        <p>${arr[i].strCategoryDescription.split(" ").slice(0, 20).join(" ")}</p>
                    </figcaption>
                </figure>
            </div>`
    }

    rowData.innerHTML = cartona
}

$(".sideBarLinks .categories").click(function () {
    closeSideNav();
    getCategories()
});


async function getCategoryMeals(category) {
    $('.loading').fadeIn(0)
    $('.loading').css("display", "flex")
    let api = await fetch(`https://www.themealdb.com/api/json/v1/1/filter.php?c=${category}`)
    let response = await api.json()
    displayData(response.meals.slice(0, 20))
    $('.loading').fadeOut(1000)

}

//////////////////////////////Area and Details(fetching & display)/////////////////

async function getArea() {
    $('.loading').fadeIn(0)
    $('.loading').css("display", "flex")
    searchData.innerHTML = ""
    let api = await fetch(`https://www.themealdb.com/api/json/v1/1/list.php?a=list`)
    let response = await api.json()
    displayArea(response.meals)
    $('.loading').fadeOut(1000)

}

function displayArea(arr) {
    let cartona = ``;
    for (let i = 0; i < arr.length; i++) {
        cartona += ` <div class="col-md-3 py-4 bg-black" onclick="getAreaMeals('${arr[i].strArea}')">
                <figure class="card custom text-center text-white background">
                    <i class="fa-solid fa-house-laptop fa-4x text-dark"></i>
                    <h3 class="text-dark">${arr[i].strArea}</h3>
                </figure>
            </div>`
    }
    rowData.innerHTML = cartona
}

$(".sideBarLinks .area").click(function () {
    closeSideNav();
    getArea()
});

async function getAreaMeals(area) {
    $('.loading').fadeIn(0)
    $('.loading').css("display", "flex")
    let api = await fetch(`https://www.themealdb.com/api/json/v1/1/filter.php?a=${area}`)
    let response = await api.json();
    displayData(response.meals)
    $('.loading').fadeOut(1000)

}


//////////////////////////////INGREDIENTS   and Details(fetching & display)/////////////////


async function getIngredients() {
    $('.loading').fadeIn(0)
    $('.loading').css("display", "flex")
    searchData.innerHTML = ""
    let api = await fetch(`https://www.themealdb.com/api/json/v1/1/list.php?i=list`)
    let response = await api.json()
    displayIngredients(response.meals.slice(0, 20))
    $('.loading').fadeOut(1000)

}

function displayIngredients(arr) {
    let cartona = ``
    for (let i = 0; i < arr.length; i++) {
        cartona += `<div class="col-md-3 py-4 bg-black" onclick="getIngredientMeals('${arr[i].strIngredient}')">
                <figure class="card custom text-center text-white background">
                    <i class="fa-solid fa-drumstick-bite fa-4x text-dark"></i>
                    <h3 class="text-dark">${arr[i].strIngredient}</h3>
                    <p class="text-dark">${arr[i].strDescription.split(" ").slice(0, 20).join(" ")}</p>
                </figure>
            </div>`
    }
    rowData.innerHTML = cartona
}

async function getIngredientMeals(ingredient) {
    $('.loading').fadeIn(0)
    $('.loading').css("display", "flex")
    searchData.innerHTML = ""

    let api = await fetch(`https://www.themealdb.com/api/json/v1/1/filter.php?i=${ingredient}`)
    let response = await api.json();
    displayData(response.meals.slice(0, 20))
    $('.loading').fadeOut(1000)

}

$(".sideBarLinks .ingredients").click(function () {
    closeSideNav();
    getIngredients()
});

//////////////////////////////search/////////////////

searchData = document.getElementById('searchData')

async function searchByName(term) {
    let api = await fetch(`https://www.themealdb.com/api/json/v1/1/search.php?s=${term}`)
    let response = await api.json()
    displayData(response.meals)

}

async function searchByLetter(term) {
    if (term == "") {
        term = "a"
    }
    let api = await fetch(`https://www.themealdb.com/api/json/v1/1/search.php?f=${term}`)
    let response = await api.json()
    displayData(response.meals)

}

function displaySearch() {
    let cartona = `<div class="col-md-6">
                <div class="search-content">
                    <input type="text" oninput="searchByName(this.value)" name="searchByName" placeholder="Search By name" class="form-control ">
                </div>
            </div>

            <div class="col-md-6">
                <div class="search-content">
                    <input type="text" oninput="searchByLetter(this.value)" name="SearchByFirstLetter" placeholder="Search By first letter"
                        class="form-control">
                </div>
            </div>`
    searchData.innerHTML = cartona
    rowData.innerHTML = " "
}

$(".sideBarLinks .search").click(function () {
    closeSideNav();
    displaySearch()
});

//////////////////////////////Contact/////////////////

function displayContacts() {
    rowData.innerHTML = `<div class="contact min-vh-100 d-flex justify-content-center align-items-center">
      <div class="container w-75 text-center">
          <div class="row g-4">
              <div class="col-md-6">
                  <input id="nameInput" oninput="inputsValidation()" type="text" class="form-control" placeholder="Enter Your Name">
                  <div id="nameAlert" class="alert alert-danger w-100 mt-2 d-none">
                      Special characters and numbers not allowed
                  </div>
              </div>
              <div class="col-md-6">
                  <input id="emailInput" oninput="inputsValidation()" type="email" class="form-control " placeholder="Enter Your Email">
                  <div id="emailAlert" class="alert alert-danger w-100 mt-2 d-none">
                      Email not valid *exemple@yyy.zzz
                  </div>
              </div>
              <div class="col-md-6">
                  <input id="phoneInput" oninput="inputsValidation()" type="text" class="form-control " placeholder="Enter Your Phone">
                  <div id="phoneAlert" class="alert alert-danger w-100 mt-2 d-none">
                      Enter valid Phone Number
                  </div>
              </div>
              <div class="col-md-6">
                  <input id="ageInput" oninput="inputsValidation()" type="number" class="form-control " placeholder="Enter Your Age">
                  <div id="ageAlert" class="alert alert-danger w-100 mt-2 d-none">
                      Enter valid age
                  </div>
              </div>
              <div class="col-md-6">
                  <input  id="passwordInput" oninput="inputsValidation()" type="password" class="form-control " placeholder="Enter Your Password">
                  <div id="passwordAlert" class="alert alert-danger w-100 mt-2 d-none">
                      Enter valid password *Minimum eight characters, at least one letter and one number:*
                  </div>
              </div>
              <div class="col-md-6">
                  <input  id="repasswordInput" oninput="inputsValidation()" type="password" class="form-control " placeholder="Repassword">
                  <div id="repasswordAlert" class="alert alert-danger w-100 mt-2 d-none">
                      Enter valid repassword 
                  </div>
              </div>
          </div>
          <button id="submitBtn" disabled class="btn btn-outline-danger px-2 mt-3">Submit</button>
      </div>
  </div> `;
    submitBtn = document.getElementById("submitBtn");

    document.getElementById("nameInput").addEventListener("focus", () => {
        nameInputTouched = true;
    });

    document.getElementById("emailInput").addEventListener("focus", () => {
        emailInputTouched = true;
    });

    document.getElementById("phoneInput").addEventListener("focus", () => {
        phoneInputTouched = true;
    });

    document.getElementById("ageInput").addEventListener("focus", () => {
        ageInputTouched = true;
    });

    document.getElementById("passwordInput").addEventListener("focus", () => {
        passwordInputTouched = true;
    });

    document.getElementById("repasswordInput").addEventListener("focus", () => {
        repasswordInputTouched = true;
    });
}

$(".sideBarLinks .contact").click(function () {
    closeSideNav();
    displayContacts();
});

let nameInputTouched = false;
let emailInputTouched = false;
let phoneInputTouched = false;
let ageInputTouched = false;
let passwordInputTouched = false;
let repasswordInputTouched = false;

function inputsValidation() {
    if (nameInputTouched) {
        if (nameValidation()) {
            document.getElementById("nameAlert")
                .classList.replace("d-block", "d-none");
        } else {
            document.getElementById("nameAlert")
                .classList.replace("d-none", "d-block");
        }
    }

    if (emailInputTouched) {
        if (emailValidation()) {
            document
                .getElementById("emailAlert")
                .classList.replace("d-block", "d-none");
        } else {
            document
                .getElementById("emailAlert")
                .classList.replace("d-none", "d-block");
        }
    }

    if (phoneInputTouched) {
        if (phoneValidation()) {
            document
                .getElementById("phoneAlert")
                .classList.replace("d-block", "d-none");
        } else {
            document
                .getElementById("phoneAlert")
                .classList.replace("d-none", "d-block");
        }
    }

    if (ageInputTouched) {
        if (ageValidation()) {
            document
                .getElementById("ageAlert")
                .classList.replace("d-block", "d-none");
        } else {
            document
                .getElementById("ageAlert")
                .classList.replace("d-none", "d-block");
        }
    }

    if (passwordInputTouched) {
        if (passwordValidation()) {
            document
                .getElementById("passwordAlert")
                .classList.replace("d-block", "d-none");
        } else {
            document
                .getElementById("passwordAlert")
                .classList.replace("d-none", "d-block");
        }
    }

    if (repasswordInputTouched) {
        if (repasswordValidation()) {
            document
                .getElementById("repasswordAlert")
                .classList.replace("d-block", "d-none");
        } else {
            document
                .getElementById("repasswordAlert")
                .classList.replace("d-none", "d-block");
        }
    }

    if (
        nameValidation() &&
        emailValidation() &&
        phoneValidation() &&
        ageValidation() &&
        passwordValidation() &&
        repasswordValidation()
    ) {
        submitBtn.removeAttribute("disabled");
    } else {
        submitBtn.setAttribute("disabled", true);
    }
}

// !---Validations---

function nameValidation() {
    let regex = /^[a-zA-Z ]{2,30}$/;
    return regex.test(document.getElementById("nameInput").value);
}
function emailValidation() {
    let regex =
        /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
    return regex.test(document.getElementById("emailInput").value);
}
function phoneValidation() {
    let regex = /^01[0125][0-9]{8}$/;
    return regex.test(document.getElementById("phoneInput").value);
}
function ageValidation() {
    let regex = /^(0?[1-9]|[1-9][0-9]|[1][1-9][1-9]|200)$/;
    return regex.test(document.getElementById("ageInput").value);
}
function passwordValidation() {
    let regex = /^(?=.*\d)(?=.*[a-z])[0-9a-zA-Z]{8,}$/;
    return regex.test(document.getElementById("passwordInput").value);
}
function repasswordValidation() {
    return (
        document.getElementById("repasswordInput").value ==
        document.getElementById("passwordInput").value
    );
}

