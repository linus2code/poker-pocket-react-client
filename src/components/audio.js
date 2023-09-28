// Plays pre defined audio files,
import { Howl } from 'howler';

// Base dir
let audioDir = './assets/sounds/';

export const playCardOpenPackage = new Howl({
  src: [audioDir + 'open_package.wav'],
});

export const playCardFoldOne = new Howl({
  src: [audioDir + 'fold_one.wav'],
});

export const playCardPlaceChipsOne = new Howl({
  src: [audioDir + 'place_chips_one.wav'],
});

export const playCardChipLayOne = new Howl({
  src: [audioDir + 'chip_lay_one.wav'],
});

export const playChipsHandleFive = new Howl({
  src: [audioDir + 'chips_handle_five.wav'],
});

export const playCardSlideSix = new Howl({
  src: [audioDir + 'card_slide_six.wav'],
});

export const playCardTakeOutFromPackageOne = new Howl({
  src: [audioDir + 'card_take_out_from_package_one.wav'],
});

export const playCollectChipsToPot = new Howl({
  src: [audioDir + 'collect_chips_to_pot.wav'],
});

export const playCheckSound = new Howl({
  src: [audioDir + 'check_sound.ogg'],
  volume: 0.1,
});
