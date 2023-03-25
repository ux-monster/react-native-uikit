import React from 'react';
import {Easing} from 'react-native';

type Props = {};

function useEasing({}: Props) {
  return {
    easeInSine: Easing.bezier(0.12, 0, 0.39, 0),
    easeOutSine: Easing.bezier(0.61, 1, 0.88, 1),
    easeInOutSine: Easing.bezier(0.37, 0, 0.63, 1),
    easeInQuad: Easing.bezier(0.11, 0, 0.5, 0),
    easeOutQuad: Easing.bezier(0.5, 1, 0.89, 1),
    easeInOutQuad: Easing.bezier(0.45, 0, 0.55, 1),
    easeInCubic: Easing.bezier(0.32, 0, 0.67, 0),
    easeOutCubic: Easing.bezier(0.33, 1, 0.68, 1),
    easeInOutCubic: Easing.bezier(0.65, 0, 0.35, 1),
    easeInQuart: Easing.bezier(0.5, 0, 0.75, 0),
    easeOutQuart: Easing.bezier(0.25, 1, 0.5, 1),
    easeInOutQuart: Easing.bezier(0.76, 0, 0.24, 1),
    easeInQuint: Easing.bezier(0.64, 0, 0.78, 0),
    easeOutQuint: Easing.bezier(0.22, 1, 0.36, 1),
    easeInOutQuint: Easing.bezier(0.83, 0, 0.17, 1),
    easeInExpo: Easing.bezier(0.7, 0, 0.84, 0),
    easeOutExpo: Easing.bezier(0.16, 1, 0.3, 1),
    easeInOutExpo: Easing.bezier(0.87, 0, 0.13, 1),
    easeInCirc: Easing.bezier(0.55, 0, 1, 0.45),
    easeOutCirc: Easing.bezier(0, 0.55, 0.45, 1),
    easeInOutCirc: Easing.bezier(0.85, 0, 0.15, 1),
    easeInBack: Easing.bezier(0.36, 0, 0.66, -0.56),
    easeOutBack: Easing.bezier(0.34, 1.56, 0.64, 1),
    easeInOutBack: Easing.bezier(0.68, -0.6, 0.32, 1.6),
  };
}

export default useEasing;
