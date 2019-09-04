# 🍿PLOTIFY


**Plotify** is a **react app** that creates Spotify playlist from movie plots.

See alternate soundtracks for some of your favourite movies [right now](https://plotify-music.herokuapp.com).

## How it works:

1. Users are authenticated with their Spotify account
2. Enter the title of a movie 
3. The plot is fetched with the **OMDB API** 
4. Plot text is filtered with [Compromise](https://github.com/spencermountain/compromise) Natural Language Processor to return nouns (awesome search criteria 🤘)
5. Each noun is passed into the **Spotify Web API search**
6. The track ID of most popular track from each search is passed into a **Spotify Web Player**
7. Users can listen to the entire playlist from the browser
8. Or save the generated playlist in their Spotify account for later

## Features I'd like to add: 

1. Loaders. Loading 20+ tracks into the browser can be a bit sluggish. It'd be much nicer ux to see 'something is happening'
2. Clean up my **states** by implementing Redux
3. Better error message handling. I catch the most obvious error — film not found — but I'd like to create more tailored experiences in the rare case the user encounters another error
4. Allow users to select which returned songs are added to their Spotify playlist
5. Impliment a voting system to determine the most popular films by Plotify playlist
6. Log out button
7. Button to quickly & easily remove the permissions granted by the user once they'd like to leave
6. Revisit, revise, and refactor my code. This was my first **react app**, which means I've no doubt made a lot of mistakes. With experience I'd like too better understand where I've gone wrong and learn for the next one! 

If you spot an bug or have any suggestions to improve the app, please let me know 🙏

Enjoy!
