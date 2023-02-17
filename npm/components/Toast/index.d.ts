/// <reference types="react" />
interface Props {
    message: string;
    duration: number;
    type: string;
    onDestroy: () => void;
}
declare const _default: (({ message, duration, type, onDestroy }: Props) => JSX.Element) & {
    show: (message: string, duration?: number | undefined, type?: string | undefined, onDestroy?: (() => void) | undefined) => void;
};
export default _default;
