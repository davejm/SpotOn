function artistElement(artist) {
  var img = artist.images[0] || { url: 'https://placehold.it/64x64' }

  return `
    <div class="media artist" data-id="${artist.id}">
      <div class="media-left">
        <img class="media-object" src="${img.url}" />
      </div>

      <div class="media-body">
        <strong class="artist-name">${artist.name}</strong>
      </div>
    </div>
  `
}

function artistListElement(artists) {
  var html = ''

  artists.forEach(function(artist) {
    html += artistElement(artist)
  })

  return html
}

$('#artist-search').on('submit', function(event) {
  event.preventDefault()

  var name = $("#artistSearchInput").val()

  spotifyApi.searchArtists(name)
    .then(function(data) {
      console.log('Search artists by "' + name + '"' , data)
      var artistList = artistListElement(data.artists.items)
      $('#search-artist-list').html(artistList)
    }, function(err) {
      console.error(err)
    })

})

$('#search-artist-list').on('click', '.artist', function(event) {
  $('.album-list').empty()
  var id = $(event.currentTarget).data('id')
  $("#selected-artist-list").append(event.currentTarget)
  selectedArtistIds.push(id)
})

$('#selected-artist-list').on('click', '.artist', function(event) {
  $('.album-list').empty()
  var id = $(event.currentTarget).data('id')
  var index = selectedArtistIds.indexOf(id)
  selectedArtistIds.splice(index, 1)
  $(event.currentTarget).remove()
  console.log("clicked selected")
})

function authorize(clientId, redirectUri, scope) {
  var state = generateRandomString(16);
  // localStorage.setItem(stateKey, state);

  var scope = 'user-read-private user-read-email';
  var url = 'https://accounts.spotify.com/authorize';
  url += '?response_type=token';
  url += '&client_id=' + encodeURIComponent(client_id);
  url += '&scope=' + encodeURIComponent(scope);
  url += '&redirect_uri=' + encodeURIComponent(redirect_uri);
  url += '&state=' + encodeURIComponent(state);

  var w = window.open(url, 'asdf', 'WIDTH=400,HEIGHT=500');
}

/**
 * Generates a random string containing numbers and letters
 * @param  {number} length The length of the string
 * @return {string} The generated string
 */
function generateRandomString(length) {
  var text = '';
  var possible = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
  for (var i = 0; i < length; i++) {
    text += possible.charAt(Math.floor(Math.random() * possible.length));
  }
  return text;
};

$("#createPlaylist").click(function() {
  var scope = 'playlist-modify-public'
  var playlistName = $("#playlist-name").val()
  localStorage.setItem(playlistNameKey, playlistName)
  localStorage.setItem(artistsKey, JSON.stringify(selectedArtistIds))

  authorize(client_id, redirect_uri, scope)
})


var spotifyApi = new SpotifyWebApi()
spotifyApi.setPromiseImplementation(Q)

var selectedArtistIds = []
var stateKey = 'spotify_auth_state'
var playlistNameKey = 'createplaylist-name'
var artistsKey = 'createplaylist-artists'

var client_id = 'fe25f2f0df964008b26bc9e34ed3496a';
var redirect_uri = '';

if (location.host == 'localhost:8000') {
  redirect_uri = 'http://localhost:8000/callback.html';
} else {
  redirect_uri = 'https://www.spotonplaylist.com/callback.html';
}
