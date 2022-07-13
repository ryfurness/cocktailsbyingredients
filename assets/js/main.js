/*
	Eventually by HTML5 UP
	html5up.net | @ajlkn
	Free for personal and commercial use under the CCA 3.0 license (html5up.net/license)
*/

(function() {

	"use strict";

	var	$body = document.querySelector('body');

	// Methods/polyfills.

		// classList | (c) @remy | github.com/remy/polyfills | rem.mit-license.org
			! function() {
    function t(t) {
        this.el = t;
        for (var n = t.className.replace(/^\s+|\s+$/g, "").split(/\s+/), i = 0; i < n.length; i++) e.call(this, n[i])
    }

    function n(t, n, i) {
        Object.defineProperty ? Object.defineProperty(t, n, {
            get: i
        }) : t.__defineGetter__(n, i)
    }
    if (!("undefined" == typeof window.Element || "classList" in document.documentElement)) {
        var i = Array.prototype,
            e = i.push,
            s = i.splice,
            o = i.join;
        t.prototype = {
            add: function(t) {
                this.contains(t) || (e.call(this, t), this.el.className = this.toString())
            },
            contains: function(t) {
                return -1 != this.el.className.indexOf(t)
            },
            item: function(t) {
                return this[t] || null
            },
            remove: function(t) {
                if (this.contains(t)) {
                    for (var n = 0; n < this.length && this[n] != t; n++);
                    s.call(this, n, 1), this.el.className = this.toString()
                }
            },
            toString: function() {
                return o.call(this, " ")
            },
            toggle: function(t) {
                return this.contains(t) ? this.remove(t) : this.add(t), this.contains(t)
            }
        }, window.DOMTokenList = t, n(Element.prototype, "classList", function() {
            return new t(this)
        })
    }
}();

		// canUse
			window.canUse=function(p){if(!window._canUse)window._canUse=document.createElement("div");var e=window._canUse.style,up=p.charAt(0).toUpperCase()+p.slice(1);return p in e||"Moz"+up in e||"Webkit"+up in e||"O"+up in e||"ms"+up in e};

		// window.addEventListener
			(function(){if("addEventListener"in window)return;window.addEventListener=function(type,f){window.attachEvent("on"+type,f)}})();

	// Play initial animations on page load.
		window.addEventListener('load', function() {
			window.setTimeout(function() {
				$body.classList.remove('is-preload');
			}, 100);
		});

	// Slideshow Background.
		(function() {

			// Settings.
				var settings = {

					// Images (in the format of 'url': 'alignment').
						images: {
							'https://images.pexels.com/photos/1283219/pexels-photo-1283219.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1': 'center',
							'https://images.unsplash.com/photo-1551538827-9c037cb4f32a?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1965&q=80': 'center',
							
							'https://images.unsplash.com/photo-1557149559-d74af2d38a1a?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=2070&q=80': 'center',
							'https://images.unsplash.com/photo-1604868291746-80e874a80e39?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1887&q=80': 'center',
							
							'https://images.unsplash.com/photo-1551024709-8f23befc6f87?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1914&q=80': 'center'
						},

					// Delay.
						delay: 8000

				};

			// Vars.
				var	pos = 0, lastPos = 0,
					$wrapper, $bgs = [], $bg,
					k, v;

			// Create BG wrapper, BGs.
				$wrapper = document.createElement('div');
					$wrapper.id = 'bg';
					$body.appendChild($wrapper);

				for (k in settings.images) {

					// Create BG.
						$bg = document.createElement('div');
							$bg.style.backgroundImage = 'url("' + k + '")';
							$bg.style.backgroundPosition = settings.images[k];
							$wrapper.appendChild($bg);

					// Add it to array.
						$bgs.push($bg);

				}

			// Main loop.
				$bgs[pos].classList.add('visible');
				$bgs[pos].classList.add('top');

				// Bail if we only have a single BG or the client doesn't support transitions.
					if ($bgs.length == 1
					||	!canUse('transition'))
						return;

				window.setInterval(function() {

					lastPos = pos;
					pos++;

					// Wrap to beginning if necessary.
						if (pos >= $bgs.length)
							pos = 0;

					// Swap top images.
						$bgs[lastPos].classList.remove('top');
						$bgs[pos].classList.add('visible');
						$bgs[pos].classList.add('top');

					// Hide last image after a short delay.
						window.setTimeout(function() {
							$bgs[lastPos].classList.remove('visible');
						}, settings.delay / 2);

				}, settings.delay);

		})();

	// Search Form.
		(function() {

			// Vars.
				var $form = document.querySelectorAll('#search-form')[0],
					$submit = document.querySelectorAll('#search-form input[type="submit"]')[0],
					$message;

			// Bail if addEventListener isn't supported.
				if (!('addEventListener' in $form))
					return;

			// Message.
				$message = document.createElement('span');
					$message.classList.add('message');
					$form.appendChild($message);

				$message._show = function(type, text) {

					$message.innerHTML = text;
					$message.classList.add(type);
					$message.classList.add('visible');

					window.setTimeout(function() {
						$message._hide();
					}, 3000);

				};

				$message._hide = function() {
					$message.classList.remove('visible');
				};

			// // Events.
			// // Note: If you're *not* using AJAX, get rid of this event listener.
				// $form.addEventListener('submit', function(event) {

					// event.stopPropagation();
					// event.preventDefault();

					// // Hide message.
						// $message._hide();

					// // Disable submit.
						// $submit.disabled = true;

					// // Process form.
					// // Note: Doesn't actually do anything yet (other than report back with a "thank you"),
					// // but there's enough here to piece together a working AJAX submission call that does.
						// window.setTimeout(function() {

							// // Reset form.
								// $form.reset();

							// // Enable submit.
								// $submit.disabled = false;

							// // Show message.
								// $message._show('success', 'Thank you!');
								// //$message._show('failure', 'Something went wrong. Please try again.');

						// }, 750);

				// });

		})();

})();

//The user will enter a list of ingredients. Get a cocktail name, photo, and instructions and place them in the DOM
// let cocktailList = Array();
//Do Setup and Event LIsteners
drinksSetup();
document.querySelectorAll("input")[1].addEventListener("click", getCocktails);
document.querySelector("#nextBtn").addEventListener(
"click", showNext);
document.querySelector("#prevBtn").addEventListener(
"click", showPrev);
document.querySelector('input').onkeypress = function(e){
    if (!e) e = window.event;
    var keyCode = e.code || e.key;
    if (keyCode == 'Enter'){
      // Enter pressed
	  getCocktails()
      return false;
    }
  }

async function drinksSetup(){
	// //Print All Ingredients
	let cocktailURL = "https://www.thecocktaildb.com/api/json/v1/1/list.php?i=list";
	let res = await fetch(cocktailURL)//for ingredients
	.then(response => response.json())
	.then(data => {
		console.log(data);
		let sortedDrinks = []
		
		document.querySelector("#ingredients").classList.remove("invisible");
		for (let i=0;i<data.drinks.length;i++) sortedDrinks.push(data.drinks[i].strIngredient1);
		sortedDrinks.sort();
		sortedDrinks.forEach(drnk=> document.querySelector("#full-list").innerText+= " " + drnk+ ", ");
	})
}

async function getCocktails(){
	event.preventDefault();
	let cocktailresult = [];
	let cocktails = [];
	let cocktail = [];
	let cocktailIDs = [];
	document.querySelector("#foundCocktails").value = "";
	document.querySelector("#searchError").innerText = ""
	//document.querySelector(".ideasTitle").innerText = "";
	let dirtyIngre = document.querySelector("#search").value;
	//if no commas or quotes, use spaces to split search text
	if (dirtyIngre.search(/,|"|'/)!=-1) dirtyIngre = dirtyIngre.split(/ ,|, |"|'|,/);	
	else dirtyIngre = dirtyIngre.split(/ /);
	dirtyIngre = dirtyIngre.filter(ingre=> ingre.length>0);
	dirtyIngre = dirtyIngre.map(ingre=> ingre.trim());
	//Sometimes an empty item appears	
	// console.log(dirtyIngre);

	//Now cleanup Ingredient - match to actual list from Server
	let ingreList = document.querySelector("#full-list").innerText.split(/, /)
	let ingredients = []
	dirtyIngre.forEach(ingre=> {
		ingredients.push([])
		ingreList.forEach(listItem=> {
			//If search item is part of Official Ingredients Item, add official item
			if (listItem.toLowerCase().includes(ingre.toLowerCase())) ingredients[ingredients.length-1].push(listItem)
		})
	})
	//remove duplicates
	ingredients.forEach(i=> [...new Set(i)])
	// console.log("INGRE",ingredients)
	let added = false;

	function getDrinkList(ingGroup,item){
		let cocktailURL = "https://www.thecocktaildb.com/api/json/v1/1/filter.php?i="+ingredients[ingGroup][item];
		// console.log(`ingGroup: ${ingGroup}, item: ${item}`)
		// console.log(ingredients[ingGroup][item])
		// console.log("URL:",cocktailURL, ' \n')
		let res = fetch(cocktailURL)//for this ingredient
		.then(response => response.json())
		.then(data => {
			// console.log(`NUM ${item}: Not Added:`,!added, cocktailURL)
			if (!added) { //this is a new group of ingredients
				// console.log("NEW b4",JSON.stringify(cocktails))
				// console.log("Data:",JSON.stringify(data))
				cocktails.push(data);
				data.drinks.forEach(d => cocktailIDs[ingGroup].push(d.idDrink))
				// console.log("NEW Af:",JSON.stringify(cocktails), ' \n')
				added = true;
				// console.log("NEW JUST ADDED- Not Added:",!added, cocktailURL, ' \n')
			}
			else {//this is a continuation of the ingredients list;
				// console.log("EXISTING b4:",JSON.stringify(cocktails[cocktails.length-1].drinks))
				// console.log("Data:",JSON.stringify(data))
				
				data.drinks.forEach(d => {
					if (!cocktailIDs[ingGroup].includes(d.idDrink)){
						cocktailIDs[ingGroup].push(d.idDrink)
						cocktails[cocktails.length-1].drinks = cocktails[cocktails.length-1].drinks.concat(d)
					}
				})
				// console.log("EXISTING af:",JSON.stringify(cocktails[cocktails.length-1].drinks, ' \n'))
			}
			// console.log(`Reset Test ${item}: ingr: ${ingredients[ingGroup].length}`)
			if (item < ingredients[ingGroup].length-1) getDrinkList(ingGroup, item+1)
			else {
				added = false
				// console.log("RESET Not Added:",!added, ' \n')
				if (ingGroup < ingredients.length-1) getDrinkList(ingGroup+1,0)
				else{
					// All ingredients searched, now check cocktails
					console.log(cocktails)
					if (cocktails.length>0) {
						console.log("GOOD!!")
						if (cocktails.length>1) {
							matchCocktails(cocktails)
						} else {
							cocktails[0].drinks.forEach(cocktail=> {
								document.querySelector("#foundCocktails").value+= cocktail.idDrink+",";
							})
						}
						console.log("Found cocktails:");
						let matches = document.querySelector("#foundCocktails").value.split(",");
						matches.pop(); //last one is blank
						console.log(document.querySelector("#foundCocktails").value);
						console.log(matches);
						if (matches.length>0){
							console.log(`Searching for: [${matches[0]}]`);
							show(matches[0]);
							document.querySelector("#currCocktail").value = matches[0];
							document.querySelector("#prevBtn").disabled = true;
							if (matches.length>1){
								document.querySelector("#nextBtn").disabled = false;
							}
						} else{
							setTimeout(()=>document.querySelector("#searchError").innerText = " No Drinks with All those Ingredients Found: Try Changing Spelling or Ingredients.",3000);
							
							document.querySelector("#prevBtn").disabled = true;
							document.querySelector("#nextBtn").disabled = true;
						}
					} else{ //No ingredient found
						document.querySelector("#searchError").innerText = "Please check the ingredient list, not enough found in Database.";
						document.querySelector("#prevBtn").disabled = true;
						document.querySelector("#nextBtn").disabled = true;
					}
				}
			}  
		})
		.catch(err=>{
			console.log(`ERROR: ${err}`, ' \n')
			document.querySelector("#searchError").innerText += `Ingredient: "${ingredients[ingGroup][item]}" not found. Skipping it... ` ;
		});	
	}
	// console.log(cocktailIDs);
	cocktails.forEach(i=> [...new Set(i)])
	/* console.log("\n")
	console.log("FINAL COCKTAILS:",cocktails) */

	if (ingredients.length>0){
		console.log("Ingr Length:",ingredients.length)
		ingredients.forEach(_=> cocktailIDs.push([]))
		await getDrinkList(0,0);
		
	} else{ //No ingredient listed
		document.querySelector("#searchError").innerText = "Please enter ingredients separated by commas. Place multi-word names in 'quotes'.";
		document.querySelector("#prevBtn").disabled = true;
		document.querySelector("#nextBtn").disabled = true;
	};
}

async function showNext(){
	//get all results
	let matches = document.querySelector("#foundCocktails").value.split(",");
	matches.pop();//last one is blank
	console.log(document.querySelector("#foundCocktails").value);
	//get currently shown result
	let curr = matches.indexOf(document.querySelector("#currCocktail").value);
	//Now scroll to next result
	if (curr<matches.length-1){
		curr++;
		console.log(`Searching for: [${matches[curr]}]`);
		show(matches[curr]);
		document.querySelector("#currCocktail").value = matches[curr];
		if (curr>0) document.querySelector("#prevBtn").disabled = false;
		else document.querySelector("#prevBtn").disabled = true;
		if (curr<matches.length-1) document.querySelector("#nextBtn").disabled = false;
		else document.querySelector("#nextBtn").disabled = true;
	} else{
		setTimeout(()=> document.querySelector("#searchError").innerText = "No More Matches. Try Different Ingredients.", 3000);
	}
}
async function showPrev(){
	//get all results
	let matches = document.querySelector("#foundCocktails").value.split(",");
	matches.pop();//last one is blank
	console.log(document.querySelector("#foundCocktails").value);
	//get currently shown result
	let curr = matches.indexOf(document.querySelector("#currCocktail").value);
	//Now scroll to prev result
	if (curr>0){
		curr--;
		console.log(`Searching for: [${matches[curr]}]`);
		show(matches[curr]);
		document.querySelector("#currCocktail").value = matches[curr];
		if (curr>0) document.querySelector("#prevBtn").disabled = false;
		else document.querySelector("#prevBtn").disabled = true;
		if (curr<matches.length-1) document.querySelector("#nextBtn").disabled = false;
		else document.querySelector("#nextBtn").disabled = true;
	} else{
		setTimeout(()=> document.querySelector("#searchError").innerText = "No More Matches. Try Different Ingredients.", 3000);
	}
}

function matchCocktails(cocktailArray){
	//if more than 1 ingredient
	cocktailArray[0].drinks.forEach(drink=>{
		if (commonCocktail(1, drink, cocktailArray)){
			//debugger;
			document.querySelector("#foundCocktails").value+= drink.idDrink+",";
		}
	})
}

function commonCocktail(n, cocktail, cocktailArray){
	//debugger;
	if (cocktailArray[n].drinks.find(ct=> ct.idDrink === cocktail.idDrink)){
		if (n == cocktailArray.length-1){
			return true; //cocktail is in all ingredient tables
		} else{ //search next table
			return commonCocktail(n+1, cocktail, cocktailArray);
		}
	}else {
		console.log(`Cocktail not common: ${cocktailArray[n].drinks.idDrink}`);
		return false;
	}
}

async function show(drinkid) {
	let cocktailURL = "https://www.thecocktaildb.com/api/json/v1/1/lookup.php?i="+drinkid;
	try {
		let res = await fetch(cocktailURL)//for this drink
		.then(response => response.json())
		.then(data => {
			console.log(data);
			document.querySelector(".result").classList.remove("invisible")
			setTimeout(()=> document.querySelector("#searchError").innerText = "", 6000);
			document.querySelector("img").src = data.drinks[0].strDrinkThumb;
			document.querySelector("h2").innerText = data.drinks[0].strDrink;
			document.querySelector(".needs").innerText = `Needs (${data.drinks[0].strDrink}):`;
			document.querySelector(".instruct").innerText = data.drinks[0].strInstructions;
			document.querySelector(".all-ingredients").innerText = "";
			for (let i = 1;i<16;i++){ //Show all ingredients of 16 max
				let nameI = "strIngredient"+i;
				let nameM = "strMeasure"+i;
				if (data.drinks[0][nameI]){
					document.querySelector(".all-ingredients").innerText += data.drinks[0][nameM]? " " + data.drinks[0][nameM] + " " + data.drinks[0][nameI] + "," : " " + data.drinks[0][nameI] + ",";
				}
			}
			let ingre = document.querySelector(".all-ingredients").innerText;
			document.querySelector(".all-ingredients").innerText = ingre.slice(0,ingre.length-1)
			document.querySelector(".result").style.visibility = "visible";
		})
	}
	catch(err) {
		console.log(`Error: ${err}`);
	}
}
