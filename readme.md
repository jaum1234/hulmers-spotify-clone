# Music App - Spotify Clone with NextJS ans Typescript
Music app done with Spotify API. It allows the user to listen to his favorite albums and playlists, search for specific tracks and create his own playlists.

**A Spotify account is needed.**

<img src='https://i.gyazo.com/c16d764fa7f05dce0e7fffc2d67c6280.png' width='600px'/>
<img src='https://i.gyazo.com/6001e515a3b5a6b3f73ef3eee18e1e8f.png' width='600px'/>
<img src='https://i.gyazo.com/7672e9c2614761bd9d2615583ae2f1ce.png' width='600px'/>
<img src='https://i.gyazo.com/a291a895de030e16e7938806d6682592.png' width='600px'/>

## Some technologies used:
- React
- NextJS
- Typescript
- Express
- Spotify Web API
- Chakra UI

## Some thoughts on it
In general, it was a great project to learn more about some core concepts of react, like componets lifecycle, hooks, events handling and use of context.
## Some Issues
- Some texts are not responsive yet.
- I did some refactoring recently, but didn't refactored my types, so they are kind messy right now.
- Refresh token isn't really working yet
- Tracks aren't dinamically removed from a playlist. Page needs to be reloaded.
- One of the menu items is broken on PROD. I'm trying to figure out why :/. 

## Running on localhost
**A Spotify account is needed.**

### Client
```
    cd music-app
    yarn install
    yarn dev
```

### Server
```
    cd server
    yarn install
    yarn dev
```



