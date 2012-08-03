//Mark A. Blaine
//VFW 1207
//JavaScript for Project 3

//Wait until DOM is ready
window.addEventListener("DOMContentLoaded", function() {

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

	//Search localStorage for Car tasks
	function showCar () {
		var category = "Car";
		if (localStorage.length===0){
			for(var n in json){
			var id = Math.floor(Math.random()*1000000001);
			localStorage.setItem(id,JSON.stringify(json[n]));
			}
		}	
		var makeDiv = document.createElement('div');
		makeDiv.setAttribute("id", "items");
		var makeList = document.createElement('ul');
		makeDiv.appendChild(makeList);
		document.body.appendChild(makeDiv);
		ge('items').style.display = "block";
		for (var i=0, len=localStorage.length; i<len; i++){
			var makeli = document.createElement('li');
			var linksLi = document.createElement('li');
			makeList.appendChild(makeli);
			var key = localStorage.key(i);
			var value = localStorage.getItem(key);
			//Convert string from local storage value back to an object by using JSON.parse
			var obj = JSON.parse(value);
			if (obj.group[1] === "Car"){
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
	
	//Run the list
	showCar ();

});