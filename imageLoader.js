var scriptUrl = "cgi-bin/listImages.rb"; //ruby script url
var dir = "./img";  //image folder
var imagesLoaded = 0;

var content = document.getElementById('body');
var overlay;

function imageLoader(){
    var jsonData

    //create overlay & set content to invisible
    //content needs to be placed in ID 'body'

    content.style.display = "none";

    //creates and centers grey overlay
    overlay  = document.createElement('DIV');
    overlay.style.height = '90vh';
    overlay.style.width = '90vw';
    overlay.style.margin = '5vh 5vw';
    overlay.style.color = 'grey';

    content.appendChild(overlay);

    //get image list as json from ruby script on server
    loadJson(url);

    //create images with image path and load them
    //set onLoad method for when each finishes
    for(i=0; i<jsonData.length; i++){
      bufferImage = new Image();
      bufferImage = dir + jsonData[i]; 
      bufferImage.onLoad = imageLoaded();       
    }
}


//exececuted every time an image finished loading
//if all images are finished buffer animation gets deleted
function imageLoaded(){
  imagesLoaded++;
  if(imagesLoaded >= jsonData.length){
    content.style.display = 'block';
    overlay.remove();
  }
}

//sends ajax call to ruby script
function loadJson(scriptUrl){

	$.ajax({
  		method: "GET",
  		url: scriptUrl,
  		dataType: "json",
  		timeout: 60000, //set timeout in miliseconds

	}).done(function success(data){
		//gets executed AFTER get was successful and is done
		console.log(data);
    console.log("image list loaded")
		jsonData = data;


	}).error(function error(jqXHR, textStatus, errorThrown){
		//gets executed AFTER timeout, or other error
		console.log(textStatus);
		alert("Data couldn't be loaded. Error:"+ textStatus)
	});

}
