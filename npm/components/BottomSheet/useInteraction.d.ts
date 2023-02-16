import { LayoutChangeEvent } from 'react-native';
type Props = {
    onClosed: () => void;
};
export default function useInteraction({ onClosed }: Props): ({
    bottomContainer: {
        backgroundColor: string;
        transform: {
            translateY: number;
        }[];
    };
    background: {
        opacity: number;
    };
    handleGesture?: undefined;
    handleBackgroundClick?: undefined;
    handleBottomContainerRendering?: undefined;
} | {
    handleGesture: (event: import("react-native-gesture-handler").PanGestureHandlerGestureEvent) => void;
    handleBackgroundClick: () => void;
    handleBottomContainerRendering: (e: LayoutChangeEvent) => void;
    bottomContainer?: undefined;
    background?: undefined;
})[];
export {};
