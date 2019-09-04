## 🍿PLOTIFY


Plotify is a react app which creates Spotify playlist from movie plots.

See alternate soundtracks for some of your favourite movies [right now]https://plotify-music.herokuapp.com)

#How it works:

1. Users are authenticated with their Spotify account
2. Enter the title of a movie 
3. The plot is fetched with the **OMDB API** 
4. Then filtered with the [Compromise](https://github.com/spencermountain/compromise) Natural Language Processor to return the nouns (which make great search criteria!)
5. Each noun is passed into the **Spotify Web API search**
6. Where the most popular track ID is passed into a **Spotify Web Player**
7. Users can listen to the entire playlist from the browser
8. Or save the generated playlist in their Spotify account for later

