<<<<<<< HEAD
# A birthday surprise for you

A responsive birthday website made with Node.js and plain HTML, CSS, and JavaScript.

## Run it

Install Node.js, open a terminal in this folder, and run:

```sh
npm start
```

In PowerShell, if script execution policy blocks `npm`, use `npm.cmd start` instead. You can also start the server directly with `node server.js`.

Then open [http://localhost:3000](http://localhost:3000). Set the `PORT` environment variable if you want to use another port.

## Add your own media

Place your files at these paths (create the `photos` folder if needed):

- `public/assets/intro-video.mp4` — the first-screen video.
- `public/assets/happy-birthday.mp3` — background music, played only in the photo gallery. It starts after she presses the memories button, since browsers require an interaction before playing audio.
- `public/assets/voice-message.mp3` — the final voice message.
- `public/assets/photos/photo-01.jpg` through `photo-10.jpg` — the ten gallery photos.

The gallery preserves each photo's original aspect ratio and shows the whole image without cropping. If you use another photo format, update the corresponding `photoPath` in `public/app.js`.

To personalize the message and photo captions, edit the message text in `public/index.html` and the `photoQuotes` list in `public/app.js`.

## Personalize it

At the top of `public/app.js`, edit the `personalization` settings:

- `herName` — appears in the greeting, header, and birthday finale.
- `anniversary` — optional line shown in the birthday message; leave it empty to hide it.
- `insideJoke` — optional personal line shown in the birthday message; leave it empty to hide it.
- `accentColor` — the main navy color, as a CSS hex color.

The photo carousel also supports swiping on touchscreens. After the voice message, select **Finish my surprise** to see the birthday finale. Music is off on both the voice-message and finale screens.

## Publish it online

The included `render.yaml` makes this Node.js site ready to deploy on Render:

1. Put the project in a GitHub repository. Add your personal video, photos, and audio files before publishing, and make sure you are comfortable with the repository's visibility and the hosting provider's file limits.
2. In Render, choose **New → Blueprint**, connect the repository, and let Render use `render.yaml` to create the web service.
3. When the deployment finishes, open the `onrender.com` address Render provides and test it on your phone.

The intro video, birthday song, and voice recording are hosted with the website, so large media files may exceed hosting or Git provider limits. For large files, use a suitable media host and update the media URLs in `public/index.html` and `public/app.js`. Anyone with the published link can view the page and its media.
=======
# HBD-Mariam
>>>>>>> e804c9b92dffd4adf88d430e9f431a289c4553c1
