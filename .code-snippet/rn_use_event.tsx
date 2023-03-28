import React, {useState} from 'react';

interface Props {
  handleChangeInteraction: (saveState) => Promise<void>;
  handlePressInteraction: (saveState) => Promise<void>;
  handleBlurInteraction: (saveState) => Promise<void>;
}

const useEvent = ({
  handleChangeInteraction,
  handlePressInteraction,
  handleBlurInteraction,
}: Props) => {
  const [state, setState] = useState<any>();

  // Event Handler
  const handleChange = async () => {
    await handleChangeInteraction(() => {
      console.log('Update state');
    });
    await fetch('')
      .then(newState => {
        if (newState !== state) {
          setState(newState);
        }
      })
      .catch(error => {});
  };

  // Event Handler
  const handlePress = async () => {
    await handlePressInteraction(() => {
      console.log('Update state');
    });
    await fetch('')
      .then(newState => {
        if (newState !== state) {
          setState(newState);
        }
      })
      .catch(error => {});
  };

  // Event Handler
  const handleBlur = async () => {
    await handleBlurInteraction(() => {
      console.log('Update state');
    });
    await fetch('')
      .then(newState => {
        if (newState !== state) {
          setState(newState);
        }
      })
      .catch(error => {});
  };

  return {
    handleChange,
    handlePress,
    handleBlur,
  };
};

export default useEvent;
