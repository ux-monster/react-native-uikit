import {RenderProfiler, UserActionProfiler} from '@/profiler';
import React, {useState} from 'react';
import {Text, TouchableOpacity} from 'react-native';

interface Props {}

const Test = ({}: Props) => {
  const [finished, setFinished] = useState(false);

  const printHello = () => {
    return new Promise((resolve, reject) => {
      console.log('Hello!', finished);
      console.log('Hello!', finished);
      console.log('Hello!', finished);
      console.log('Hello!', finished);
      console.log('Hello!', finished);
      resolve(true);
    });
  };

  const handlePress = () => {
    setFinished(false);
    printHello().then(() => {
      setFinished(true);
      console.log('Finished!');
    });
  };

  return (
    <RenderProfiler>
      <UserActionProfiler finished={finished}>
        <TouchableOpacity onPress={handlePress}>
          <Text>Hello</Text>
        </TouchableOpacity>
      </UserActionProfiler>
    </RenderProfiler>
  );
};

export default Test;
