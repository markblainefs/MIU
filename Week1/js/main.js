//Mark A. Blaine
//MIU 1208

//Wait until DOM is ready
window.addEventListener("DOMContentLoaded", function(){

	//getElementsById Function
	function ge(x){
		var theElement = document.getElementById(x);
		return theElement;
	}

	//Create select field element and populate with options
	function makeList(){
		var formTag = document.getElementsByTagName("form"),  // formTag is an array of all the form tags
			selectLi = ge('select'),
			makeSelect = document.createElement('select');
			makeSelect.setAttribute("id", "groups");
		for (var i=0, j=locations.length; i<j; i++){
			var makeOption = document.createElement('option');
			var optText = locations[i];
			makeOption.setAttribute("value", optText);
			makeOption.innerHTML = optText;
			makeSelect.appendChild(makeOption);
		}
		selectLi.appendChild(makeSelect);
	}
	
	//Find value of selected radio button
	function getSelectedRadio(){
		var radios = document.forms[0].priority;
		for (var i=0; i<radios.length; i++){
			if (radios[i].checked){
				priorityValue = radios[i].value;
			}
		}
	}
	
	//Make toggle controls when displaying the data
	function toggleControls(n){
		switch(n){
			case "on":
				ge('honeyForm').style.display = "none";
				ge('clear').style.display = "inline";
				ge('displayLink').style.display = "none";
				ge('addNew').style.display = "inline";
				ge('listHeader').style.display = "inline";
				break;
			case "off":
				ge('honeyForm').style.display = "block";
				ge('clear').style.display = "inline";
				ge('displayLink').style.display = "inline";
				ge('addNew').style.display = "none";
				ge('listHeader').style.display = "none";
				ge('items').style.display = "none";
				break;
			default:
				return false;
		}
	}
	
	//Store the form data in local storage
	function storeData(key){
		//if there is no key, this is a new item and will need a key
		if (!key){
			//Generate a random number for a key
			var id 			= Math.floor(Math.random()*1000000001);
		}else{
			//otherwise we will use the existing key and overwrite the existing data
			//It's the same key that was passed from the edit submit event handlewr through validate function
			//then passed here into the store data function
			id = key;
		}
		//Figure out which radio button is selected
		getSelectedRadio();
		//Gather up all of our form field values and store in an object
		//Object properties are going to contain an array with the form label and input value.
		var item			= {};
			item.taskName 	= ["Task name:", ge('taskName').value];
			item.group		= ["Location:", ge('groups').value];
			item.dueDate	= ["Due date:", ge('dueDate').value];
			item.importance	= ["Importance:", ge('importance').value];
			item.priority 	= ["Because:", priorityValue];
			item.honey 		= ["List for:", ge('forHoney').value];
			item.specialInstructions = ["Details:", ge('specialInstructions').value];
		//Save data to local storage: Use Stringify to convert our object to a string.
		localStorage.setItem(id, JSON.stringify(item));
		alert("Honey Do Saved!");
	}
	
	//Display list
	function getData(){
		if (localStorage.length===0){
			alert("You don't have anything to do so default data was added");
			toggleControls("on");
			autoFillData();			
		}
		toggleControls("on");
		//Write data from local storage to the browser
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
			
			//Create our edit and delete buttons for each item in local storage
			makeItemLinks(localStorage.key(i), linksLi); 
		}
	}
	
	//Get the image for the right categort
	function getImage(catName,makeSubList){
		var imageLi = document.createElement('li');
		makeSubList.appendChild(imageLi);
		var newImg = document.createElement('img');
		var setSrc = newImg.setAttribute("src", "images/" + catName + ".png");
		imageLi.appendChild(newImg);
	}
	
	function autoFillData(){
		//The actual JSON OBJECT data required is coming from json.js
		//Store the JSON OBJECT into localStorage
		for(var n in json){
			var id = Math.floor(Math.random()*1000000001);
			localStorage.setItem(id,JSON.stringify(json[n]));
		}
	}	

	//Make item links
	//Will create edit and delete links for each stored item when displayed
	function makeItemLinks (key, linksLi){
		//add edit single item link
		var editLink = document.createElement('a');
		editLink.href = "#";
		editLink.key = key;
		var editText = "Edit Task";
		editLink.addEventListener("click", editItem);
		editLink.innerHTML = editText;
		linksLi.appendChild(editLink);
		
		//add delete single item link
		var deleteLink = document.createElement('a');
		deleteLink.href = "#";
		deleteLink.key = key;
		var deleteText = "Delete Task";
		deleteLink.addEventListener("click", deleteItem);
		deleteLink.innerHTML = deleteText;
		linksLi.appendChild(deleteLink);
	}
	
	function editItem(){
		//Grab the item from the Local Storage
		var value = localStorage.getItem(this.key);
		var item = JSON.parse(value);
		
		//Show the form and hide the list
		toggleControls("off");
		
		//populate the form fields with the current localStorage values
		ge('taskName').value 	= item.taskName[1];
		ge('groups').value 		= item.group[1];
		ge('dueDate').value 		= item.dueDate[1];
		ge('importance').value 	= item.importance[1];
		//Set the radio button
		var radios = document.forms[0].priority;
		for (var i=0; i<radios.length; i++){
			if (radios[i].value == "I'm awesome" && item.priority[1] == "I'm awesome"){
				radios[i].setAttribute("checked", "checked");
			} else if (radios[i].value == "I need to" && item.priority[1] == "I need to"){
				radios[i].setAttribute("checked", "checked");
			} else if (radios[i].value == "I'm in trouble" && item.priority[1] == "I'm in trouble"){
				radios[i].setAttribute("checked", "checked");
			}
		}
		ge('specialInstructions').value = item.specialInstructions[1];
		
		//Remove listener from the input "Save Task" button
		//save.removeEventListener("click", storeData);
		//Change Save button to Save Changes
		ge('submit').value = "Save Changes";
		var editSubmit = ge('submit');
		//Save the key value established in this function as a property of the editSubmit event
		//so we can use that value when we save the data we edited
		editSubmit.addEventListener("click", validate);
		editSubmit.key = this.key;
	}
	
	//Function to clear the local storage
	function clearLocal(){
		if (localStorage.length===0){
			alert("There is no data to clear.");
		}else{
			localStorage.clear();
			alert("All Honey Do items are deleted!");
			window.location.reload();
			return false;
		}
	}
	
	function validate(e) {
		//Define the elements that we want to check
		var getTaskName = ge('taskName');
		var getGroup = ge('groups');
		var getDueDate = ge('dueDate');
		var getSpecialInstructions = ge('specialInstructions');
		
		//Reset error messages
		errMsg.innerHTML = "";
		getTaskName.style.border = "1px solid black";
		getGroup.style.border = "1px solid black";
		getDueDate.style.border = "1px solid black";
		getSpecialInstructions.style.border = "1px solid black";

		
		//Get error messages
		var messageAry = [];
		
		// Task name validation
		if (getTaskName.value ===""){
			var taskNameError = "Please enter a task name";
			getTaskName.style.border = "1px solid red";
			messageAry.push(taskNameError);
		}	
		
		//Group validation
		if (getGroup.value==="-Choose a Location-"){
			var groupError = "Please choose a location";
			getGroup.style.border = "1px solid red";
			messageAry.push(groupError);
		}
		
		//Date validation
		if (getDueDate.value ===""){
			var dueDateError = "Please enter a due date";
			getDueDate.style.border = "1px solid red";
			messageAry.push(dueDateError);
		}

		// Details validation
		if (getSpecialInstructions.value ===""){
			var specialInstructionsError = "Please enter task details";
			getSpecialInstructions.style.border = "1px solid red";
			messageAry.push(specialInstructionsError);
		}
		
		//If there were errors, display them on the screen

		if(messageAry.length >=1){
			for(var i=0, j = messageAry.length; i<j; i++){
				var txt = document.createElement('li');
				txt.innerHTML = messageAry[i];
				errMsg.appendChild(txt);
			}	
			e.preventDefault();
			return false;
		}else{
			//If all is okay, store our data.  Send the key value which came from our editData function
			//Remember it was passed from the editSubmit listener as a property
			storeData(this.key);
		}
	}
	
	function deleteItem(){
		var ask = confirm("Are you sure you want to delete this task?");
		if (ask){
			localStorage.removeItem(this.key);
			alert ("Task was deleted");
			window.location.reload();
		}else{
			alert ("Task was NOT deleted");
		}
	}
	//Variable defaults
	var locations = ["-Choose a Location-", "Home", "Office", "Car", "Shop", "Errand"],
		priorityValue,
		errMsg = ge('errors');

	//Run the makeList function to create the location dropdown
	makeList();

	//Set Link & Submit Click Events
	var displayLink = ge('displayLink');
	displayLink.addEventListener("click", getData);
	var clearLink = ge('clear');
	clearLink.addEventListener("click", clearLocal);
	var save = ge('submit');
	save.addEventListener("click", validate);

});