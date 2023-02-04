import Text from '@/ui/Text';
import React from 'react';
import RN, {TouchableHighlightProps} from 'react-native';

type Props = TouchableHighlightProps & {};

const Button = (props: Props) => {
  return (
    <RN.TouchableHighlight {...props}>
      <Text>Button</Text>
    </RN.TouchableHighlight>
  );
};

export default Button;
