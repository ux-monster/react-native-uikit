import React from 'react';
import * as RN from 'react-native';

type Props = {
  value: string;
  onChangeText: (text: string) => void;
};

const TextInput = ({value, onChangeText}: Props) => {
  return <RN.TextInput value={value} onChangeText={onChangeText} />;
};

export default TextInput;
