function loadIGPost(ig) {
  var ig_post = $("#ig_post");
  ig_post.css("display", "flex");
  ig_post.html("<div id=\"ig_post_in\"></div>");
    var igp = $("#ig_post_in");
    igp.css("width","0");
    igp.css("height","0");
    igp.animate({
      width: '100%',
      height: '100%'
    }, 500);



   var xmlhttp = new XMLHttpRequest();
    xmlhttp.onreadystatechange = function() {
    if (this.readyState == 4 && this.status == 200) {
    var json = JSON.parse(this.responseText);
    var ig_post = document.getElementById("ig_post");
    // ig_post.style.display = "flex";
    ig_post.style.cursor = "pointer";
    ig_post.innerHTML = json.html;
    window.instgrm.Embeds.process();
    }
  };
  xmlhttp.open("GET", "https://api.instagram.com/oembed?url="+ig.id, true);
  xmlhttp.send();
}
function myFunc(myObj) {
  var ig = document.getElementById("ig");
  var len = myObj.data.length;
  for (i = 0; i < len; i+= 3) {
    dv = document.createElement("div");
    // dv.width = (360*3)+"px";
    dv.setAttribute("class", "ig_grid_line")

    for(j = 0; j < 3 && j+i < len; j++){
        img = document.createElement("img");
        img.setAttribute("class","ig_grid_post");
        img.setAttribute("src",myObj.data[j+i].images.standard_resolution.url);
        img.setAttribute("id", myObj.data[j+i].link);
        img.setAttribute("onclick","loadIGPost(this)");
        dv.appendChild(img);
    }

        gpc = document.createElement("div");
        gpc.setAttribute("class", "grid-post-content");
        spt = document.createElement("span");
        spt.setAttribute("class", "post-title");
        spt.innerHTML = myObj.data[i].caption.text;
        gpc.appendChild(spt);
        dv.appendChild(gpc);
    ig.appendChild(dv);
  }
}
function ig_post_on_click(){
  var ig_post = document.getElementById("ig_post");
  if(ig_post.style.display != "none") {
      ig_post.style.display = "none";
      ig_post.style.cursor = "default";
  }
}
