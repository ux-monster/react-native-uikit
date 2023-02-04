/**
 * @format
 */

import 'react-native';
import React from 'react';

// Note: test renderer must be required after react-native.
import renderer from 'react-test-renderer';
import Button from '@/ui/Button';

it('renders correctly', () => {
  renderer.create(<Button />);
});
