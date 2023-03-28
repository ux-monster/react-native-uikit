import React from 'react';
import {StyleSheet, View} from 'react-native';

interface Props {}

const Screen = ({}: Props) => {
  const styles = useStyles();
  return <View style={styles.continer}></View>;
};

export default Screen;

const useStyles = () =>
  StyleSheet.create({
    continer: {},
  });
