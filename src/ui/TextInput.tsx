import React from 'react';
import RN from 'react-native';

interface Props extends RN.TextInputProps {
  value: string;
  onChangeText: (text: string) => void;
}

const TextInput = ({value, onChangeText}: Props) => {
  return <RN.TextInput value={value} onChangeText={onChangeText} />;
};

export default TextInput;
