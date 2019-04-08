var url1="";

function getContent(value,content){
	url1=value;
}
function setVideo(url){
	var video=document.getElementById("video");
	
}

function ParseUrlClick(){
	var url2=document.getElementById("movieUrl").value;
	if(url1!="" && url2!=""){
		//alert(url1+url2);
		//setVideo(url1+url2);
		window.open(url1+url2);
	}
	else{
		alert("请选择线路,并输入视频地址！");
	}
}


