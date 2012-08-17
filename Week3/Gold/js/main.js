$('#main').on('pageinit', function(){
	//code needed for main page goes here
});	
		
$('#addItem').on('pageinit', function(){
		delete $.validator.methods.date;
		var myForm = $('#addItemForm');
		    myForm.validate({
			invalidHandler: function(form, validator) {
			},
			submitHandler: function() {
				var data = myForm.serializeArray();
			storeData(data);
			}
		});
	
	//any other code needed for addItem page goes here
	
});

//The functions below can go inside or outside the pageinit function for the page in which it is needed.

var autofillData = function (){
	 
};

var getData = function(){

};

var storeData = function(data){
	//if there is no key, this is a new item and will need a key
	var id 			= Math.floor(Math.random()*1000000001);
	//Figure out which radio button is selected
	//Save data to local storage: Use Stringify to convert our object to a string.
	localStorage.setItem(id, JSON.stringify(data));
	alert("Honey Do Saved!");
}; 

var	deleteItem = function (){
			
};
					
var clearLocal = function(){

};


