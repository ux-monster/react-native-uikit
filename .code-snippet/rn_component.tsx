import React from 'react';
import {StyleSheet, View} from 'react-native';

interface Props {}

const Component = ({}: Props) => {
  const styles = useStyles();
  return <View style={styles.continer}></View>;
};

export default Component;

const useStyles = () =>
  StyleSheet.create({
    continer: {},
  });
