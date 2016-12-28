var g_access_token = ''
var g_username = ''
var g_tracks = []

function getUsername(callback) {
  console.log('getUsername')

  spotifyApi.getMe()
    .then(function(data) {
      callback(data.id)
    }, function(err) {
      console.error(err)
      callback(null)
    })
}

function createPlaylist(username, name, callback) {
  console.log('createPlaylist', username, name)

  spotifyApi.createPlaylist(username, {name: name})
    .then(function(data) {
      callback({
        id: data.id,
        uri: data.uri,
        externalUrl: data.external_urls.spotify
      })
    }, function(err) {
      console.error(err)
      callback(null)
    })
}

function chunkify(arr, n) {
  var chunks = []
  var i, j = n
  var temparray

  for (i = 0, j = arr.length; i < j; i += n) {
    temparray = arr.slice(i, i + n)
    chunks.push(temparray)
  }
  return chunks
}

function addTracksToPlaylist(username, playlistId, tracks, callback) {
  console.log('addTracksToPlaylist', username, playlistId, tracks)

  var chunks = chunkify(tracks, 100)

  var chain = Q.when();
  chunks.map(function(chunk) {
    chain = chain.then(function() {
      var promise = spotifyApi.addTracksToPlaylist(username, playlistId, chunk)
        .then(function(data) {
          console.log(data)
        }, function(err) {
          console.error(err)
          callback()
        })
      return promise
    });
  })

  chain = chain.then(callback())

}

function getTopTracks(artistIds, callback) {
  console.log("getTopTracks", artistIds)
  // Note that this method of handling promises means artist
  // tracks will probably be added in a random order as all
  // promises are fired at once. See https://daveceddia.com/waiting-for-promises-in-a-loop/

  var promises = []
  var track_uris = []
  artistIds.map(function(uri) {
    var promise = spotifyApi.getArtistTopTracks(uri, 'US')
      .then(function(data) {
        var tracks = data['tracks']
        tracks.map(function(track) { track_uris.push(track['uri']) })
      }, function(err) {
        console.error(err)
      })
    promises.push(promise)
  })

  Q.all(promises).then(function() { callback(track_uris) })

}

function getHashParams() {
  var hashParams = {};
  var e, r = /([^&;=]+)=?([^&;]*)/g,
      q = window.location.hash.substring(1);
  while ( e = r.exec(q)) {
     hashParams[e[1]] = decodeURIComponent(e[2]);
  }
  return hashParams;
}

var spotifyApi
var stateKey = 'spotify_auth_state'

function doit() {

  spotifyApi = new SpotifyWebApi()
  spotifyApi.setPromiseImplementation(Q)

  var playlistName = localStorage.getItem('createplaylist-name')
  var artistIds = JSON.parse(localStorage.getItem('createplaylist-artists'))

  // parse hash
  var args = getHashParams();
  console.log('got args', args)

  if (typeof(args.access_token) != 'undefined') {
      // got access token
      console.log('got access token', args.access_token)
      g_access_token = args.access_token
  }

  spotifyApi.setAccessToken(g_access_token)

  getTopTracks(artistIds, function(tracks) {
    getUsername(function(username) {
      console.log('got username', username)
      createPlaylist(username, playlistName, function(playlist) {
          console.log('created playlist', playlist.id)
          addTracksToPlaylist(username, playlist.id, tracks, function() {
              console.log('tracks added.')
              $('#playlistlink').attr('href', playlist.uri)
              $("#playlistlink-external").attr('href', playlist.externalUrl)
              $('#creating').hide()
              $('#done').show()
          })
      })
    })
  })

}

