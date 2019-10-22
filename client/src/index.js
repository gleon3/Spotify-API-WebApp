import React, { useState, useEffect} from "react";
import ReactDOM from "react-dom";
import SearchForm from "./SearchForm";
import {
  Nav,
  Navbar,
  NavDropdown,
  Card,
  CardDeck,
  OverlayTrigger,
  Tooltip
} from "react-bootstrap";

import "bootstrap/dist/css/bootstrap.min.css";
import "./styles.css";

function getHashParams() {
  var hashParams = {};
  var e, r = /([^&;=]+)=?([^&;]*)/g,
      q = window.location.hash.substring(1);
  while ( e = r.exec(q)) {
     hashParams[e[1]] = decodeURIComponent(e[2]);
  }
  return hashParams;
}

const accessToken = getHashParams().access_token;
  
const headers = {
  Accept: "application/json",
  "Content-Type": "application/json",
  Authorization: `Bearer ${accessToken}`
};

function App() {
  const [tracks, setTracks] = useState([]);

  const [playlists, setPlaylists] = useState([]);

  const [artistInformation, setArtistInformation] = useState(null);
  const [artistTopTracks, setArtistTopTracks] = useState([]);
  const [albumInformation, setAlbumInformation] = useState(null);
  const [audioInformation, setAudioInformation] = useState(null);
  const [trackInformation, setTrackInformation] = useState(null);
  const [lyrics, setLyrics] = useState(null);

  const [information, setInformation] = useState(false);
  
  console.log(accessToken);
  console.log(typeof accessToken);
  
  useEffect(() => {
    usersPlaylists();
  }, []);

  function usersPlaylists() {
    let url = "https://api.spotify.com/v1/me/playlists";
    fetch(url, { headers })
      .then(resp => resp.json())
      .then(data => {
        console.log(data);
        setPlaylists(data.items);
      });
  }

  function searchTracks(query) {
    let url = `https://api.spotify.com/v1/search?q=${query}&type=track`;
    fetch(url, { headers })
      .then(resp => resp.json())
      .then(data => {
        console.log(data.tracks.items);
        setTracks(data.tracks.items);
      });
    setInformation(false);
    window.scrollTo(0, 0);
  }

  function recentlyPlayed() {
    let url = "https://api.spotify.com/v1/me/player/recently-played?type=track&limit=50";
    fetch(url, { headers })
      .then(resp => resp.json())
      .then(data => {
        console.log(data);
        var i;
        var tracks = [];
        for (i = 0; i < data.items.length; i++) {
          tracks[i] = data.items[i].track;
        }
        setTracks(tracks);
      });
    setInformation(false);
    window.scrollTo(0, 0);
  }

  function favouriteTracks() {
    let url = "https://api.spotify.com/v1/me/top/tracks";
    fetch(url, { headers })
      .then(resp => resp.json())
      .then(data => {
        console.log(data);
        var i;
        var tracks = [];
        for (i = 0; i < data.items.length; i++) {
          tracks[i] = data.items[i];
        }
        setTracks(tracks);
      });
    setInformation(false);
    window.scrollTo(0, 0);
  }

  function savedTracks() {
    let url = "https://api.spotify.com/v1/me/tracks";
    fetch(url, { headers })
      .then(resp => resp.json())
      .then(data => {
        console.log(data);
        var i;
        var tracks = [];
        for (i = 0; i < data.items.length; i++) {
          tracks[i] = data.items[i].track;
        }
        setTracks(tracks);
      });
    setInformation(false);
    window.scrollTo(0, 0);
  }

  function playlistTracks(playlistid) {
    let url = `https://api.spotify.com/v1/playlists/${playlistid}/tracks`;
    fetch(url, { headers })
      .then(resp => resp.json())
      .then(data => {
        console.log(data);
        var i;
        var tracks = [];
        for (i = 0; i < data.items.length; i++) {
          tracks[i] = data.items[i].track;
        }
        setTracks(tracks);
      });
    setInformation(false);
    window.scrollTo(0, 0);
  }

  function top50World() {
    playlistTracks("37i9dQZEVXbMDoHDwVN2tF");
  }

  function top50Germany() {
    playlistTracks("37i9dQZEVXbJiZcmkrIHGU");
  }

  function top50France() {
    playlistTracks("37i9dQZEVXbIPWwFssbupI");
  }

  function top50Usa() {
    playlistTracks("37i9dQZEVXbLRQDuF5jeBp");
  }

  function top50Uk() {
    playlistTracks("37i9dQZEVXbLnolsZ8PSNw");
  }

  function top50Italy() {
    playlistTracks("37i9dQZEVXbIQnj7RRhdSX");
  }

  function top50Switzerland() {
    playlistTracks("37i9dQZEVXbJiyhoAPEfMK");
  }

  function top50Austria() {
    playlistTracks("37i9dQZEVXbKNHh6NIXu36");
  }

  function top50Netherlands() {
    playlistTracks("37i9dQZEVXbKCF6dqVpDkS");
  }

  function top50Spain() {
    playlistTracks("37i9dQZEVXbNFJfN1Vw8d9");
  }

  function top50Finland() {
    playlistTracks("37i9dQZEVXbMxcczTSoGwZ");
  }

  function top50Canada() {
    playlistTracks("37i9dQZEVXbKj23U1GF4IR");
  }

  function handleClick(track) {
    getTrackInformation(track);
    getAudioInformation(track);
    getAlbumInformation(track);
    getArtistInformation(track.artists[0]);
    getArtistTopTracks(track.artists[0]);
    getLyrics(track.artists[0].name, track.name);
    setInformation(true);
    window.scrollTo(0, 0);
  }

  function handleClickNoArtist(track) {
    getTrackInformation(track);
    getAudioInformation(track);
    getAlbumInformation(track);
    getLyrics(track.artists[0].name, track.name);
    setInformation(true);
    window.scrollTo(0, 0);
  }

  function handleClickNoAlbum(track) {
    getTrackInformation(track);
    getAudioInformation(track);
    getLyrics(track.artists[0].name, track.name);
    setInformation(true);
    window.scrollTo(0, 0);
  }

  function getTrackInformation(track) {
    let url = `https://api.spotify.com/v1/tracks/${track.id}`;
    fetch(url, { headers })
      .then(resp => resp.json())
      .then(data => {
        console.log(data);
        setTrackInformation(data);
      });
  }

  function getAudioInformation(track) {
    let url = `https://api.spotify.com/v1/audio-analysis/${track.id}`;
    fetch(url, { headers })
      .then(resp => resp.json())
      .then(data => {
        console.log(data.track);
        setAudioInformation(data.track);
      });
  }

  function getAlbumInformation(track) {
    let url = `https://api.spotify.com/v1/albums/${track.album.id}`;
    fetch(url, { headers })
      .then(resp => resp.json())
      .then(data => {
        console.log(data);
        setAlbumInformation(data);
      });
  }

  function getArtistInformation(artist) {
    let url = `https://api.spotify.com/v1/artists/${artist.id}`;
    fetch(url, { headers })
      .then(resp => resp.json())
      .then(data => {
        console.log(data);
        setArtistInformation(data);
      });
  }

  function getArtistTopTracks(artist) {
    let url = `https://api.spotify.com/v1/artists/${
      artist.id
    }/top-tracks?country=De`;
    fetch(url, { headers })
      .then(resp => resp.json())
      .then(data => {
        console.log(data);
        setArtistTopTracks(data.tracks);
      });
  }

  function getLyrics(artistname, trackname) {
    const accessToken =
      "jczmFXo6Et4IchToHRQAgfjlXmOTBDLjxdUJjyxdcC8a-MIYYt3sFXXHm1y5JYht";
    let url = `https://api.genius.com/search?q=${artistname}%20${trackname}&access_token=${accessToken}`;
    fetch(url)
      .then(resp => resp.json())
      .then(data => {
        for (var i = 0; i < data.response.hits.length; i++) {
          if (
            data.response.hits[i].result.primary_artist.name.includes(
              artistname
            )
          ) {
            console.log(data.response.hits[i].result);
            setLyrics(data.response.hits[i].result.url);
            break;
          }
          setLyrics("lyrics not found");
        }
      });
  }

  function msToMinutes(ms) {
    var minutes = Math.floor(ms / 60000);
    var seconds = ((ms % 60000) / 1000).toFixed(0);
    return seconds == 60
      ? minutes + 1 + ":00"
      : minutes + ":" + (seconds < 10 ? "0" : "") + seconds;
  }

  function redirectTo(site) {
    window.open(site, "_blank");
  }

  function getKey(keynumber) {
    switch (keynumber) {
      default:
        return "Undefined";
      case 0:
        return "C";
      case 1:
        return "C#";
      case 2:
        return "D";
      case 3:
        return "D#";
      case 4:
        return "E";
      case 5:
        return "F";
      case 6:
        return "F#";
      case 7:
        return "G";
      case 8:
        return "G#";
      case 9:
        return "A";
      case 10:
        return "A#";
      case 11:
        return "B";
    }
  }

  function getTimeSignature(timesignaturenumber) {
    switch (timesignaturenumber) {
      default:
        return "Undefined";
      case 3:
        return "3/4";
      case 4:
        return "4/4";
      case 5:
        return "5/4";
      case 6:
        return "6/4";
      case 7:
        return "7/4";
    }
  }

  return (
    <div>
      <Navbar bg="success" variant="dark">
        <Nav>
          <SearchForm searchTracks={searchTracks} />
          <Nav.Link variant="dark" onClick={favouriteTracks}>
            Favourite Songs
          </Nav.Link>
          <Nav.Link variant="dark" onClick={recentlyPlayed}>
            Recently Played
          </Nav.Link>
          <Nav.Link variant="success" onClick={savedTracks}>
            Saved Tracks
          </Nav.Link>
          <NavDropdown title="Top 50" id="basic-nav-dropdown">
            <NavDropdown.Item onClick={top50World}>World</NavDropdown.Item>
            <NavDropdown.Item onClick={top50Usa}>USA</NavDropdown.Item>
            <NavDropdown.Item onClick={top50Germany}>Germany</NavDropdown.Item>
            <NavDropdown.Item onClick={top50France}>France</NavDropdown.Item>
            <NavDropdown.Item onClick={top50Uk}>UK</NavDropdown.Item>
            <NavDropdown.Item onClick={top50Italy}>Italy</NavDropdown.Item>
            <NavDropdown.Item onClick={top50Switzerland}>
              Switzerland
            </NavDropdown.Item>
            <NavDropdown.Item onClick={top50Austria}>Austria</NavDropdown.Item>
            <NavDropdown.Item onClick={top50Netherlands}>
              Netherlands
            </NavDropdown.Item>
            <NavDropdown.Item onClick={top50Spain}>Spain</NavDropdown.Item>
            <NavDropdown.Item onClick={top50Canada}>Canada</NavDropdown.Item>
            <NavDropdown.Item onClick={top50Finland}>Finland</NavDropdown.Item>
          </NavDropdown>
          <NavDropdown title="Playlists" id="basic-nav-dropdown">
            {playlists.map((playlist, index) => {
              return (
                <NavDropdown.Item
                  onClick={() => playlistTracks(playlist.id)}
                  key={index}
                >
                  {playlist.name}
                </NavDropdown.Item>
              );
            })}
          </NavDropdown>
        </Nav>
      </Navbar>

      {!information && (
        <div className="flex flex-wrap text-gray-500" style={{ padding: "1%" }}>
          {tracks.map((track, index) => {
            const img = track.album.images[0];
            const imgUrl = img.url;

            return (
              <div className="w-1/5" style={{ padding: "2%" }} key={index}>
                <img
                  className="cursor-pointer"
                  onClick={() => handleClick(track)}
                  src={imgUrl}
                  alt={track.name}
                  width="100%"
                />

                <text color="white">
                  {track.name}
                  <br />
                  {track.artists[0].name}
                  <br />
                  {track.album.name}
                </text>
              </div>
            );
          })}
        </div>
      )}
      {information && (
        <div>
          <CardDeck style={{ padding: "3%", width: "100%" }}>
            <Card bg="success" text="white">
              <Card.Header style={{ fontSize: "1.75vw" }}>Song</Card.Header>
              <Card.Body>
                <Card.Title style={{ fontSize: "2.5vw" }}>
                  {trackInformation && trackInformation.name}
                  <img
                    className="float-right"
                    src={
                      trackInformation && trackInformation.album.images[0].url
                    }
                    alt={trackInformation && trackInformation.name}
                    width="40%"
                  />
                </Card.Title>
                <Card.Text className="block text-left">
                  {trackInformation &&
                    "popularity: " + trackInformation.popularity}
                  <br />
                  {trackInformation && "explicit: " + trackInformation.explicit}
                  <br />
                  {trackInformation &&
                    "Duration: " + msToMinutes(trackInformation.duration_ms)}
                  <br />
                  {audioInformation &&
                    "tempo: " + Math.round(audioInformation.tempo)}
                  <OverlayTrigger
                    overlay={
                      <Tooltip style={{ fontSize: "1.25vw" }}>
                        {" "}
                        The confidence, from 0.0 to 1.0, of the reliability of
                        the tempo. Some tracks contain tempo changes or sounds
                        which don’t contain tempo (like pure speech) which would
                        correspond to a low value in this field.
                      </Tooltip>
                    }
                  >
                    <text>
                      {audioInformation &&
                        " (" + audioInformation.tempo_confidence + ")"}
                    </text>
                  </OverlayTrigger>
                  <br />
                  {audioInformation && audioInformation.mode == 1
                    ? "mode: major"
                    : "mode: minor"}
                  <OverlayTrigger
                    overlay={
                      <Tooltip style={{ fontSize: "1.25vw" }}>
                        {" "}
                        The confidence, from 0.0 to 1.0, of the reliability of
                        the mode.
                      </Tooltip>
                    }
                  >
                    <text>
                      {audioInformation &&
                        " (" + audioInformation.mode_confidence + ")"}
                    </text>
                  </OverlayTrigger>
                  <br />
                  {audioInformation && "key: " + getKey(audioInformation.key)}
                  <OverlayTrigger
                    overlay={
                      <Tooltip style={{ fontSize: "1.25vw" }}>
                        {" "}
                        The confidence, from 0.0 to 1.0, of the reliability of
                        the key. Songs with many key changes may correspond to
                        low values in this field.
                      </Tooltip>
                    }
                  >
                    <text>
                      {audioInformation &&
                        " (" + audioInformation.key_confidence + ")"}
                    </text>
                  </OverlayTrigger>
                  <br />
                  {audioInformation &&
                    "time signature: " +
                      getTimeSignature(audioInformation.time_signature)}
                  <OverlayTrigger
                    overlay={
                      <Tooltip style={{ fontSize: "1.25vw" }}>
                        {" "}
                        The confidence, from 0.0 to 1.0, of the reliability of
                        the time_signature. Sections with time signature changes
                        may correspond to low values in this field.
                      </Tooltip>
                    }
                  >
                    <text>
                      {audioInformation &&
                        " (" + audioInformation.time_signature_confidence + ")"}
                    </text>
                  </OverlayTrigger>
                </Card.Text>
              </Card.Body>
            </Card>
            <Card bg="success" text="white">
              <Card.Header style={{ fontSize: "1.75vw" }}>Artist</Card.Header>
              <Card.Body>
                <Card.Title style={{ fontSize: "2.5vw" }}>
                  {artistInformation && artistInformation.name}
                  <img
                    className="float-right"
                    src={artistInformation && artistInformation.images[0].url}
                    alt={artistInformation && artistInformation.name}
                    width="40%"
                  />
                </Card.Title>
                <Card.Text className="block text-left">
                  {artistInformation &&
                    "followers: " + artistInformation.followers.total}
                  <br />
                  {artistInformation &&
                    "popularity: " + artistInformation.popularity}
                  <br />
                  {artistInformation && "genres: "}
                  {artistInformation &&
                    artistInformation.genres.map((genre, index) => {
                      return (
                        <text key={index}>
                          {index + 1 == artistInformation.genres.length
                            ? genre
                            : genre + ", "}
                        </text>
                      );
                    })}
                  <br />
                </Card.Text>
              </Card.Body>
            </Card>
            <Card bg="success" text="white">
              <Card.Header style={{ fontSize: "1.75vw" }}>Album</Card.Header>
              <Card.Body>
                <Card.Title style={{ fontSize: "2.5vw" }}>
                  {albumInformation && albumInformation.name}
                  <img
                    className="float-right"
                    src={
                      trackInformation && trackInformation.album.images[0].url
                    }
                    alt={trackInformation && trackInformation.name}
                    width="40%"
                  />
                </Card.Title>
                <Card.Text className="block text-left">
                  {albumInformation &&
                    "albumtype: " + albumInformation.album_type}
                  <br />
                  {albumInformation &&
                    "trackamount: " + albumInformation.total_tracks}
                  <br />
                  {albumInformation && "label: " + albumInformation.label}
                  <br />
                  {albumInformation &&
                    "popularity: " + albumInformation.popularity}
                  <br />
                  {albumInformation &&
                    "release date: " + albumInformation.release_date}
                </Card.Text>
              </Card.Body>
            </Card>
          </CardDeck>
          <CardDeck style={{ padding: "3%", paddingTop: "0%", width: "100%" }}>
            <Card bg="success" text="white">
              <Card.Header style={{ fontSize: "1.75vw" }}>Links</Card.Header>
              <Card.Body>
                <Card.Title style={{ fontSize: "2.5vw" }}>
                  {trackInformation && trackInformation.name}
                </Card.Title>
                <Card.Text className="block text-left">
                  <text>URL: </text>
                  <text
                    className="cursor-pointer text-blue-700 underline block text-left"
                    onClick={() =>
                      redirectTo(
                        `http://open.spotify.com/track/${trackInformation.id}`
                      )
                    }
                  >
                    {trackInformation &&
                      `http://open.spotify.com/track/${trackInformation.id}`}
                  </text>
                  <text>lyrics: </text>
                  {lyrics != "lyrics not found" ? (
                    <text
                      className="cursor-pointer text-blue-700 underline"
                      onClick={() => redirectTo(lyrics)}
                    >
                      {lyrics && lyrics}
                    </text>
                  ) : (
                    <text> {lyrics && lyrics} </text>
                  )}
                </Card.Text>
              </Card.Body>
              <Card.Footer>
                <small>click on link to open the URL in a new tab</small>
              </Card.Footer>
            </Card>
            <Card bg="success" text="white">
              <Card.Header style={{ fontSize: "1.75vw" }}>
                Artist Top Tracks
              </Card.Header>
              <Card.Body>
                <Card.Title style={{ fontSize: "2.5vw" }}>
                  {artistInformation && artistInformation.name}
                </Card.Title>
                <Card.Text>
                  {artistTopTracks.map((track, index) => {
                    return (
                      <text
                        className="cursor-pointer block text-left"
                        key={index}
                        onClick={() => handleClickNoArtist(track)}
                      >
                        {index + 1 + ". " + track.name}
                        <br />
                      </text>
                    );
                  })}
                </Card.Text>
              </Card.Body>
              <Card.Footer>
                <small>click on track to view information about it</small>
              </Card.Footer>
            </Card>
            <Card bg="success" text="white">
              <Card.Header style={{ fontSize: "1.75vw" }}>
                Album Tracks
              </Card.Header>
              <Card.Body>
                <Card.Title style={{ fontSize: "2.5vw" }}>
                  {albumInformation && albumInformation.name}
                </Card.Title>
                <Card.Text>
                  {albumInformation &&
                    albumInformation.tracks.items.map((track, index) => {
                      return (
                        <text
                          className="cursor-pointer block text-left"
                          key={index}
                          onClick={() => handleClickNoAlbum(track)}
                        >
                          {index + 1 + ". " + track.name}
                          <br />
                        </text>
                      );
                    })}
                </Card.Text>
              </Card.Body>
              <Card.Footer>
                <small>click on track to view information about it</small>
              </Card.Footer>
            </Card>
          </CardDeck>
        </div>
      )}
    </div>
  );
}
const rootElement = document.getElementById("root");
ReactDOM.render(<App />, rootElement);
