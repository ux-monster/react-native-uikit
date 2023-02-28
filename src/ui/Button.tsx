import Text from '@/ui/Text';
import React from 'react';
import RN from 'react-native';

interface Props extends RN.TouchableHighlightProps {}

const Button = (props: Props) => {
  return (
    <RN.TouchableHighlight {...props}>
      <Text>Button</Text>
    </RN.TouchableHighlight>
  );
};

export default Button;
