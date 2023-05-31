$(document).ready(function () {
  getNewsJugadoras();
});

/*761482759  == JUGADORAS DE LA SEMANA 
1780424 == PROXIMOS PARTIDOS
4606642 == TABLA GENERAL
*/

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
  for (var i = 0; i <= posts.length; i++) {
    //var background = posts[i].jetpack_featured_media_url;
    var content = $(posts[i].excerpt.rendered).text();

    if(bandera == 0) {
      var post = '<div class="carousel-item active carousel-1">'+content+'</div>';
    } else {
      var post = '<div class="carousel-item carousel-1">'+content+'</div>';
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
