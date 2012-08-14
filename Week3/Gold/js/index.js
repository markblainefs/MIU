//Mark A. Blaine
//VFW 1207
//JavaScript for Project 3

//Wait until DOM is ready
window.addEventListener("DOMContentLoaded", function() {

	//Hide the error message
	ge('error').style.display = "none";

	//getElementsById Function
	function ge(x){
		var theElement = document.getElementById(x);
		return theElement;
	}

	function getImage(catName,makeSubList){
		var imageLi = document.createElement('li');
		makeSubList.appendChild(imageLi);
		var newImg = document.createElement('img');
		var setSrc = newImg.setAttribute("src", "images/" + catName + ".png");
		imageLi.appendChild(newImg);
	}

	//Search localStorage for search terms
	var getSearch = function(e) {
		//Fill localStorage if it is empty
		if (localStorage.length===0){
			for(var p in json){
			var id = Math.floor(Math.random()*1000000001);
			localStorage.setItem(id,JSON.stringify(json[p]));
			}
		}
		//Hide Browse items
		ge('searchForm').style.display = "none";
		ge('browse').style.display = "none";
		var match = false;
		var term = ge('search').value;
		var makeDiv = document.createElement('div');
		makeDiv.setAttribute("id", "items");
		var makeList = document.createElement('ul');
		makeDiv.appendChild(makeList);
		document.body.appendChild(makeDiv);
		ge('items').style.display = "block";
		for (i=0, len=localStorage.length; i<len; i++){
			var makeli = document.createElement('li');
			var linksLi = document.createElement('li');
			makeList.appendChild(makeli);
			var key = localStorage.key(i);
			var value = localStorage.getItem(key);
			//Convert string from local storage value back to an object by using JSON.parse
			var obj = JSON.parse(value);
			for (q in obj){
				if (term === obj[q][1]){
					var match = true;
					var makeSubList = document.createElement('ul');
					makeli.appendChild(makeSubList);
					getImage(obj.group[1],makeSubList);
					for (var n in obj){
						var makeSubli = document.createElement('li');
						makeSubList.appendChild(makeSubli);
						var optSubText = obj[n][0]+" "+obj[n][1];
						makeSubli.innerHTML = optSubText;
						makeSubList.appendChild(linksLi);
					}
				}
			}
		}
		if (!match){
			ge('error').style.display = "block";
		}

		e.preventDefault();

	}
				
	//Listen for the Search button
	var search = ge('searchBtn');
	search.addEventListener("click", getSearch);

});