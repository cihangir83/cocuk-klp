import { Howl } from 'howler';

// Since we are mocking sounds initially, we'll use empty or silent base64
const silentAudio = 'data:audio/mp3;base64,SUQzBAAAAAAAI1RTU0UAAAAPAAADTGF2ZjU5LjI3LjEwMAAAAAAAAAAAAAAA//OEAAAAAAAAAAAAAAAAAAAAAAB0aW5nAAAAAQAAAAEAAAAIAAAA4GF1ZGlvAAAAAAAAAAAAAAABAAAAAAAAAAAAAAAA//OEAAAAAAAAAAAAAAAAAAAAAAB0aW5nAAAAAQAAAAEAAAAIAAAA4GF1ZGlvAAAAAAAAAAAAAAABAAAAAAAAAAAAAAAA';

export const sounds = {
  ambient: new Howl({ src: [silentAudio], loop: true, volume: 0.2 }),
  theme: new Howl({ src: [silentAudio], loop: true, volume: 0.3 }),
  presentationStart: new Howl({ src: [silentAudio] }),
  slideChange: new Howl({ src: [silentAudio] }),
  dataAppear: new Howl({ src: [silentAudio] }),
  presentationEnd: new Howl({ src: [silentAudio] }),
  sliderMove: new Howl({ src: [silentAudio] }),
  chartUpdate: new Howl({ src: [silentAudio] }),
  matrixFill: new Howl({ src: [silentAudio] }),
  warningCR: new Howl({ src: [silentAudio] }),
  scenarioSwitch: new Howl({ src: [silentAudio] }),
  decisionBuild: new Howl({ src: [silentAudio] }),
  gavelBang: new Howl({ src: [silentAudio] }),
  sealStamp: new Howl({ src: [silentAudio] }),
  decisionFanfare: new Howl({ src: [silentAudio] }),
  typingFormal: new Howl({ src: [silentAudio] }),
  documentSign: new Howl({ src: [silentAudio] }),
  badgeEarn: new Howl({ src: [silentAudio] }),
  click: new Howl({ src: [silentAudio], volume: 0.5 }), // Generic UI click
};

export const playSound = (soundName) => {
  if (sounds[soundName]) {
    sounds[soundName].play();
  }
};

export const stopSound = (soundName) => {
  if (sounds[soundName]) {
    sounds[soundName].stop();
  }
};
