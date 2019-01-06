//----------------------------------------------------------------------------------------------
function setPrevNextOnClic(elem, id){
  if(id){
    // console.log("setPrevNextOnClic  " + id.nodeValue);
    elem.setAttribute("onclick","loadIGPost(event, \""+id.nodeValue+"\")");
    elem.style.display = "inherit";
  }else{
    elem.style.display = "none";
    elem.removeAttribute("onclick");
  }

}
//----------------------------------------------------------------------------------------------
function loadIGPost(event,id) {

  // console.log("loadIGPost "+ id);
  // console.log(event);
  var ig = document.getElementById(id);
  var ig_post = document.getElementById("ig_post");
  ig_post.style.display = "flex";
  ig_post.style.cursor = "pointer";
  var igp = document.getElementById("ig_post_in");
  // igp.css("width","0");
  // igp.css("height","0");
  // igp.animate({
  //   width: '100%',
  //   height: '100%'
  // }, 500);
  // while (igp.firstChild) {
  var ig_lb = document.getElementById("ig_post_lightbox");
  if(ig_lb){
    igp.removeChild(ig_lb);
  }

  if(ig.attributes.ig_tipo.nodeValue == "video"){
    vid = document.createElement("video");
    // vid.autoplay = true;
    vid.controls = true;
    vid.setAttribute("id", "ig_post_lightbox");
    vid.setAttribute("src", ig.attributes.ig_src.nodeValue);
    vid.setAttribute("width", ig.attributes.ig_width.nodeValue);
    vid.setAttribute("height", ig.attributes.ig_height.nodeValue);
    // igp.appendChild(vid);
    igp.insertBefore(vid, document.getElementById("ig_nav"));
  }else{
    img = document.createElement("img");
    img.setAttribute("id", "ig_post_lightbox");
    img.setAttribute("src", ig.attributes.ig_src.nodeValue);
    img.setAttribute("width", ig.attributes.ig_width.nodeValue);
    img.setAttribute("height", ig.attributes.ig_height.nodeValue);
    // igp.appendChild(img);
    igp.insertBefore(img, document.getElementById("ig_nav"));
  }
  setPrevNextOnClic(document.getElementById("ig_nav_prev"),ig.attributes.ig_prev_id);
  setPrevNextOnClic(document.getElementById("ig_nav_next"),ig.attributes.ig_next_id);

  // var xmlhttp = new XMLHttpRequest();
  // xmlhttp.onreadystatechange = function() {
  //   if (this.readyState == 4 && this.status == 200) {
  //     var json = JSON.parse(this.responseText);
  //     var ig_post = document.getElementById("ig_post");
  //     // ig_post.style.display = "flex";
  //     ig_post.style.cursor = "pointer";
  //     ig_post.innerHTML = json.html;
  //     window.instgrm.Embeds.process();
  //   }
  // };
  // xmlhttp.open("GET", "https://api.instagram.com/oembed?url="+ig.id, true);
  // xmlhttp.send();
}
//----------------------------------------------------------------------------------------------
function ig_post_close_lightbox(event){
  var ig_post = document.getElementById("ig_post");
  if(ig_post.style.display != "none") {
    if(event.originalTarget.attributes.id.nodeValue == "ig_post"){
      // console.log("ig_post_on_click");
      // console.log(event);
      ig_post.style.display = "none";
      ig_post.style.cursor = "default";
      var igp = document.getElementById("ig_post_in");
      var ig_lb = document.getElementById("ig_post_lightbox");
      if(ig_lb){
        igp.removeChild(ig_lb);
      }
    }
  }
}
//----------------------------------------------------------------------------------------------
function igCallback(myObj) {
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
        img.setAttribute("link", myObj.data[j+i].link);
        img.setAttribute("id", "ig_post_thumb_"+(j+i));

        if(myObj.data[j+i].type == "video"){
          img.setAttribute("ig_tipo", "video");
          img.setAttribute("ig_src", myObj.data[j+i].videos.standard_resolution.url);
          img.setAttribute("ig_width", myObj.data[j+i].videos.standard_resolution.width);
          img.setAttribute("ig_height", myObj.data[j+i].videos.standard_resolution.height);
        }else{
          img.setAttribute("ig_tipo", "imagen");
          img.setAttribute("ig_src", myObj.data[j+i].images.standard_resolution.url);
          img.setAttribute("ig_width", myObj.data[j+i].images.standard_resolution.width);
          img.setAttribute("ig_height", myObj.data[j+i].images.standard_resolution.width);
        }

        img.setAttribute("onclick","loadIGPost(event, \"ig_post_thumb_"+(j+i)+"\")");
        if(j+i > 0){
          img.setAttribute("ig_prev_id", "ig_post_thumb_"+(j+i -1));
        }
        if(j+i < len - 1){
          img.setAttribute("ig_next_id", "ig_post_thumb_"+(j+i +1));
        }
        dv.appendChild(img);
    }

        gpc = document.createElement("div");
        gpc.setAttribute("class", "grid-post-content");
        spt = document.createElement("span");
        spt.setAttribute("class", "ig-post-title");
        spt.innerHTML = myObj.data[i].caption.text;
        gpc.appendChild(spt);
        dv.appendChild(gpc);
    ig.appendChild(dv);
  }
}
