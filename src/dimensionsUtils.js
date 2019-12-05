import {Dimensions} from 'react-native';

const {width, height: SCREEN_HEIGHT} = Dimensions.get('window');

const CARD_WIDTH = width * 0.66;
const CARD_HEIGTH = width * 0.66 * 0.628;

const cardDimensions = {width: CARD_WIDTH, height: CARD_HEIGTH};

const NOTCH = 30;

const OFFSET_BASIS = SCREEN_HEIGHT / 2 - cardDimensions.height - NOTCH;

const SCROLL_THRESHOLD = SCREEN_HEIGHT * 0.25;

export {cardDimensions, SCREEN_HEIGHT, OFFSET_BASIS, SCROLL_THRESHOLD};
