# vaquitas.front
Experimenting with react native, a project to help splitting bills with friends

## Live Test

There is a live test of the app just install [Expo Go](https://play.google.com/store/apps/details?id=host.exp.exponent&hl=en&gl=US) on your phone and scan the QR code of the app at [vaquitas.app](https://expo.io/@flakoash/projects/vaquitas)

## Requirements

For running this project you will need:
- [Node.js LTS](https://nodejs.org/en/)
- [expo cli](https://docs.expo.io/workflow/expo-cli/#installation)

## Installation

Just run:

```
npm install
```
and then
```
expo install
```

## Run App locally

if also running the [backend](https://github.com/flakoash/vaquitas.back) locally, you must change the environment.ts file and set your local IP address (you need to use your ip address instead of just localhost):

```
dev: {
    backendApiUrl: "{YOUR-LOCAL-IP-ADDRESS}/api",
  },
```

And then just run on the terminal:

```
npm start
```

A local server will start at http://localhost:19002/ in there you will be able to open the app in an Android or IOS emulator or scan the generated QR code with your [Expo Go](https://play.google.com/store/apps/details?id=host.exp.exponent&hl=en&gl=US) app on your phone

## Build and Android APK

First check that the app is pointing to the backend you want to test with in environment.ts (if running backend in local, use ip address instead of localhost)

Then on the terminal run (you must be previously authenticated in your expo account):

```
expo build:android -t apk
```

And follow the instructions. The project will go to a build queue in expo.io servers, it can take up to 30 min to build, depending on the queue. 

On the terminal you will also get a url to track the build proccess, when it finishes you will be able to download the .apk from that same url 
