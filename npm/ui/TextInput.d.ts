/// <reference types="react" />
type Props = {
    value: string;
    onChangeText: (text: string) => void;
};
declare const TextInput: ({ value, onChangeText }: Props) => JSX.Element;
export default TextInput;
