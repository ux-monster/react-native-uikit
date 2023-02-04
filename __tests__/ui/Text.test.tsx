/**
 * @format
 */

import 'react-native';
import React from 'react';

// Note: test renderer must be required after react-native.
import renderer from 'react-test-renderer';
import Text from '@/ui/Text';

it('renders correctly', () => {
  renderer.create(<Text>Hello</Text>);
});
