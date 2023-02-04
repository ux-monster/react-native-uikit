import React from 'react';
import * as RN from 'react-native';

type Props = {
  children?: React.ReactNode | undefined;
};

const Text = ({children}: Props) => {
  return <RN.Text>{children}</RN.Text>;
};

export default Text;
