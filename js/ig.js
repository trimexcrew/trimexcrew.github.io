//----------------------------------------------------------------------------------------------
function setPrevNextOnClic(elem, id){
  if(id){
    return "<img class=\"ig_boton_nav\" width=\"50\" height=\"45\" src=\"/assets/lightbox_gui_images/"+elem+".png\" id=\"ig_nav_"+elem+"\" onclick=\"loadIGPost(&quot;"+id.nodeValue+"&quot;)\"></img>";
  }else{
    return "<div style=\"width:50px; height:50px; min-width:50px;\"></div>";
    // return "";
  }
}
//----------------------------------------------------------------------------------------------
function loadIGPost(id) {

  var html =
  "<div id=\"ig_post_in\">\
  <img class=\"ig_boton_nav\" width=\"27\" height=\"27\" src=\"/assets/lightbox_gui_images/close.png\" id=\"ig_post_close_btn\" onclick=\"ig_post_close_lightbox_btn()\"></img>";

  var ig = document.getElementById(id);

  if(ig.attributes.ig_tipo.nodeValue == "video"){
    html += "<video controls "
  }else{
    html += "<img";
  }
  html+= " id=\"ig_post_lightbox\"";
  html+= " src=\"" +ig.attributes.ig_src.nodeValue + "\"";
  html+= " width=\"" +ig.attributes.ig_width.nodeValue + "\"";
  html+= " height=\"" +ig.attributes.ig_height.nodeValue + "\"";

  if(ig.attributes.ig_tipo.nodeValue == "video"){
    html+= "></video>";
  }else{
    html+= "></img>";
  }

  html+=  "<div id=\"ig_nav\">";
  html+=  setPrevNextOnClic("prev",ig.attributes.ig_prev_id);
  html+= "<div id=\"ig_post_caption\">\
  <div id=\"ig_post_caption_txt\">"+ ig.alt +"</div>\
  <a href="+ ig.attributes.ig_link.nodeValue +" id=\"ig_link\">Ver en Instagram</a>\
  </div>";
  html+=  setPrevNextOnClic("next",ig.attributes.ig_next_id);
  html+= "</div></div>";
  var ig_post = document.getElementById("ig_post");
  ig_post.innerHTML = html;
  ig_post.style.display = "flex";
  ig_post.style.cursor = "default";

  ig_post.setAttribute("onclick","ig_post_close_lightbox(event)");


  document.getElementsByTagName("BODY")[0].style.overflow = "hidden";

}
function ig_post_close(ig_post){

  ig_post.innerHTML = "";
  ig_post.removeAttribute("onclick");
  ig_post.style.display = "none";
  ig_post.style.cursor = "default";
  document.getElementsByTagName("BODY")[0].style.overflow = "visible";
}
//----------------------------------------------------------------------------------------------
function ig_post_close_lightbox_btn(){

  var ig_post = document.getElementById("ig_post");
  ig_post_close(ig_post);
}
//----------------------------------------------------------------------------------------------
function ig_post_close_lightbox(event){
  var ig_post = document.getElementById("ig_post");
  if(ig_post.innerHTML != "") {
    if(event.originalTarget.attributes.id.nodeValue == "ig_post" ||
    event.originalTarget.attributes.id.nodeValue == "ig_post_close_btn"){

      ig_post_close(ig_post);
      // ig_post.innerHTML = "";
      // ig_post.removeAttribute("onclick");
      // ig_post.style.display = "none";
      // ig_post.style.cursor = "default";
      // document.getElementsByTagName("BODY")[0].style.overflow = "visible";
    }
  }
}
//----------------------------------------------------------------------------------------------
function igCallback(myObj) {
  var ig = document.getElementById("ig");
  var len = myObj.data.length;
  for (i = 0; i < len; i+= 3) {
    // ig_line = document.createElement("div");
    // ig_line.setAttribute("class", "ig_grid_line")

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
        img.setAttribute("ig_height", myObj.data[j+i].images.standard_resolution.height);
      }
      img.setAttribute("alt", myObj.data[i].caption.text);
      img.setAttribute("ig_link", myObj.data[i].link);

      img.setAttribute("onclick","loadIGPost(\"ig_post_thumb_"+(j+i)+"\")");
      if(j+i > 0){
        img.setAttribute("ig_prev_id", "ig_post_thumb_"+(j+i -1));
      }
      if(j+i < len - 1){
        img.setAttribute("ig_next_id", "ig_post_thumb_"+(j+i +1));
      }
      // ig_line.appendChild(img);
      ig.appendChild(img);
    }
    // ig.appendChild(ig_line);
  }
}
