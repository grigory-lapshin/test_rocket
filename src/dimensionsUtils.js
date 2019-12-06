import {Dimensions} from 'react-native';

const {width, height: SCREEN_HEIGHT} = Dimensions.get('window');

const CARD_WIDTH = width * 0.72;
const CARD_HEIGTH = width * 0.72 * 0.628;

const cardDimensions = {width: CARD_WIDTH, height: CARD_HEIGTH};

const OFFSET_BASIS = SCREEN_HEIGHT / 2 - cardDimensions.height;

const SCROLL_THRESHOLD = SCREEN_HEIGHT * 0.25;

const UPPER_SCROLL_BOUND = 0;
const LOWER_SCROLL_BOUND = -SCROLL_THRESHOLD;

const DEFAULT_PADDING = 16;

export {
  cardDimensions,
  SCREEN_HEIGHT,
  OFFSET_BASIS,
  SCROLL_THRESHOLD,
  UPPER_SCROLL_BOUND,
  LOWER_SCROLL_BOUND,
  DEFAULT_PADDING,
};
