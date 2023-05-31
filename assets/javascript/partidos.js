$(document).ready(function () {
  getNews();
  getNewsJugadoras();
  getNewsTabla();
});

/*761482759  == JUGADORAS DE LA SEMANA 
1780424 == PROXIMOS PARTIDOS
4606642 == TABLA GENERAL
*/

 function getNews() {
   $.ajax({
     url: "https://public-api.wordpress.com/wp/v2/sites/momscolima.wordpress.com/posts?per_page=100&orderby=date&categories=1780424",
     dataType: "json",
   }).then(function (posts) {
     getTags(posts);
   });
 }

 function getTags(posts) {
   //https://aplicacionesempress.wordpress.com/
   $.ajax({
     url: "https://public-api.wordpress.com/wp/v2/sites/momscolima.wordpress.com/tags",
     dataType: "json",
   }).then(function (data) {
     var tags = [];

     for (var i = 0; i < data.length; i++) {
       var tag = {
         id: data[i].id,
         name: data[i].name,
       };

       tags.push(tag);
     }

     showPosts(posts, tags);
   });
 }

 function showPosts(posts, tags) {
   var bandera = 0;
   for (var i = 0; i < posts.length; i++) {
     var background = posts[i].jetpack_featured_media_url;
     var content = $(posts[i].excerpt.rendered).text();

     if(bandera == 0) {
       var post = '<div class="carousel-item active carousel-1">'+
       '<img class="w-100" src="'+background+'" alt="">'+
       '<h5 class="heading-5 white-text">'+content+'</h5>'+
       '</div>"';
     } else {
       var post = '<div class="carousel-item carousel-1">'+
       '<img class="w-100" src="'+background+'" alt="">'+
       '<h5 class="heading-5 white-text">'+content+'</h5>'+
       '</div>"';
     }
   
     bandera ++;
     $("#proximos-partidos-wrapper").append(post);

     //$(image).css('background', 'url("' + background + '") center/cover no-repeat');
   }
 }

 //setVisibility();

 function traslateTag(id, tags) {
   for (var i = 0; i < tags.length; i++) {
     if (id == tags[i].id) {
       var name = tags[i].name;
     }
   }

   return name;
 }

 function dateConverter(date) {
   var rawDate = date.split("T");
   var shortDate = rawDate[0].split("-");
   var month = [
     "Enero",
     "Febrero",
     "Marzo",
     "Abril",
     "Mayo",
     "Junio",
     "Julio",
     "Agosto",
     "Septiembre",
     "Octubre",
     "Noviembre",
     "Diciembre",
   ];

   var newDate =
     shortDate[2] +
     " de " +
     month[parseInt(shortDate[1]) - 1] +
     " de " +
     shortDate[0];

   return newDate;
 }

function getNewsJugadoras() {
  $.ajax({
    url: "https://public-api.wordpress.com/wp/v2/sites/momscolima.wordpress.com/posts?per_page=100&orderby=date&categories=761482759",
    dataType: "json",
  }).then(function (posts) {
    getTagsJugadoras(posts);
  });
}

function getTagsJugadoras(posts) {
  //https://aplicacionesempress.wordpress.com/
  $.ajax({
    url: "https://public-api.wordpress.com/wp/v2/sites/momscolima.wordpress.com/tags",
    dataType: "json",
  }).then(function (data) {
    var tags = [];

    for (var i = 0; i < data.length; i++) {
      var tag = {
        id: data[i].id,
        name: data[i].name,
      };

      tags.push(tag);
    }

    showPostsJugadoras(posts, tags);
  });
}

function showPostsJugadoras(posts, tags) {
  var bandera = 0;
  for (var i = 0; i < posts.length; i++) {
    var background = posts[i].jetpack_featured_media_url;
    var content = $(posts[i].excerpt.rendered).text();

    if(bandera == 0) {
      var post = '<div class="carousel-item active carousel-1">'+
      '<img class="w-100" src="'+background+'" alt="">'+
      '<h5 class="heading-5 white-text">'+content+'</h5>'+
      '</div>';
    } else {
      var post = '<div class="carousel-item carousel-1">'+
      '<img class="w-100" src="'+background+'" alt="">'+
      '<h5 class="heading-5 white-text">'+content+'</h5>'+
      '</div>';
    }
  
    bandera ++;
    $("#wrapper-jugadoras").append(post);

    //$(image).css('background', 'url("' + background + '") center/cover no-repeat');
  }
}

//setVisibility();

function traslateTagJugadoras(id, tags) {
  for (var i = 0; i < tags.length; i++) {
    if (id == tags[i].id) {
      var name = tags[i].name;
    }
  }

  return name;
}

function dateConverterJugadoras(date) {
  var rawDate = date.split("T");
  var shortDate = rawDate[0].split("-");
  var month = [
    "Enero",
    "Febrero",
    "Marzo",
    "Abril",
    "Mayo",
    "Junio",
    "Julio",
    "Agosto",
    "Septiembre",
    "Octubre",
    "Noviembre",
    "Diciembre",
  ];

  var newDate =
    shortDate[2] +
    " de " +
    month[parseInt(shortDate[1]) - 1] +
    " de " +
    shortDate[0];

  return newDate;
}

function getNewsTabla() {
  $.ajax({
    url: "https://public-api.wordpress.com/wp/v2/sites/momscolima.wordpress.com/posts?per_page=1&orderby=date&categories=4606642",
    dataType: "json",
  }).then(function (posts) {
    getTagsTabla(posts);
  });
}

function getTagsTabla(posts) {
  //https://aplicacionesempress.wordpress.com/
  $.ajax({
    url: "https://public-api.wordpress.com/wp/v2/sites/momscolima.wordpress.com/tags",
    dataType: "json",
  }).then(function (data) {
    var tags = [];

    for (var i = 0; i < data.length; i++) {
      var tag = {
        id: data[i].id,
        name: data[i].name,
      };

      tags.push(tag);
    }

    showPostsTabla(posts, tags);
  });
}

function showPostsTabla(posts, tags) {
  var bandera = 0;
  for (var i = 0; i < posts.length; i++) {
    var background = posts[i].jetpack_featured_media_url;
    var content = $(posts[i].excerpt.rendered).text();

    
      var post = '<img src="'+background+'" class="w-100" alt="">';
    
    $("#wrapper-tablas").append(post);

    //$(image).css('background', 'url("' + background + '") center/cover no-repeat');
  }
}

//setVisibility();

function traslateTagTabla(id, tags) {
  for (var i = 0; i < tags.length; i++) {
    if (id == tags[i].id) {
      var name = tags[i].name;
    }
  }

  return name;
}

function dateConverterTabla(date) {
  var rawDate = date.split("T");
  var shortDate = rawDate[0].split("-");
  var month = [
    "Enero",
    "Febrero",
    "Marzo",
    "Abril",
    "Mayo",
    "Junio",
    "Julio",
    "Agosto",
    "Septiembre",
    "Octubre",
    "Noviembre",
    "Diciembre",
  ];

  var newDate =
    shortDate[2] +
    " de " +
    month[parseInt(shortDate[1]) - 1] +
    " de " +
    shortDate[0];

  return newDate;
}

function getNewsForm() {
  $.ajax({
    url: "https://public-api.wordpress.com/wp/v2/sites/cositec.com.mx/proyectos/ramon/soccer-moms/posts?per_page=1&orderby=date&categories=4606642",
    dataType: "json",
  }).then(function (posts) {
    getTagsForm(posts);
  });
}

function getTagsForm(posts) {
  //https://aplicacionesempress.wordpress.com/
  $.ajax({
    url: "https://public-api.wordpress.com/wp/v2/sites/cositec.com.mx/proyectos/ramon/soccer-moms/tags",
    dataType: "json",
  }).then(function (data) {
    var tags = [];

    for (var i = 0; i < data.length; i++) {
      var tag = {
        id: data[i].id,
        name: data[i].name,
      };

      tags.push(tag);
    }

    showPostsForm(posts, tags);
  });
}

function showPostsForm(posts, tags) {
  var bandera = 0;
  for (var i = 0; i < posts.length; i++) {
    var background = posts[i].jetpack_featured_media_url;
    var content = $(posts[i].excerpt.rendered).text();

    
      var post = '<img src="'+background+'" class="w-100" alt="">';
    
    $("#wrapper-forms").append(post);

    //$(image).css('background', 'url("' + background + '") center/cover no-repeat');
  }
}

//setVisibility();

function traslateTagForm(id, tags) {
  for (var i = 0; i < tags.length; i++) {
    if (id == tags[i].id) {
      var name = tags[i].name;
    }
  }

  return name;
}

function dateConverterForm(date) {
  var rawDate = date.split("T");
  var shortDate = rawDate[0].split("-");
  var month = [
    "Enero",
    "Febrero",
    "Marzo",
    "Abril",
    "Mayo",
    "Junio",
    "Julio",
    "Agosto",
    "Septiembre",
    "Octubre",
    "Noviembre",
    "Diciembre",
  ];

  var newDate =
    shortDate[2] +
    " de " +
    month[parseInt(shortDate[1]) - 1] +
    " de " +
    shortDate[0];

  return newDate;
}