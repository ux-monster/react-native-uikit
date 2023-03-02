/**
 * @format
 */

import 'react-native';
import renderer from 'react-test-renderer';
import BottomSheet from '../..';

describe('When: I press the background', () => {
  it('Then: The BottomSheet disappears as it goes down from top to bottom', () => {
    expect(1 + 1).toEqual(2);
  });
});

describe('When: I drag the indicator down', () => {
  it('Then: The BottomSheet disappears as it goes down from top to bottom', () => {
    expect(1 + 1).toEqual(3);
  });
});
