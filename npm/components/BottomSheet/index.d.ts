import React from 'react';
interface Props {
    children?: React.ReactNode;
    onClosed: () => void;
}
declare const _default: (({ children, onClosed }: Props) => JSX.Element) & {
    show: (onClosed: () => void) => void;
};
export default _default;
