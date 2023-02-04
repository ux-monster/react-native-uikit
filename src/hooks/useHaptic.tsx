const useHaptic = () => {
  const ReactNativeHapticFeedback = require('react-native-haptic-feedback');

  const options = {
    enableVibrateFallback: true,
    ignoreAndroidSystemSettings: false,
  };

  const haptic = () => {
    ReactNativeHapticFeedback.trigger('impactLight', options);
  };

  return haptic;
};

export default useHaptic;
