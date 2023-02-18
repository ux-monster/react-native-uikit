/// <reference types="react" />
interface DraggableListViewProps {
    type?: 'longpress' | 'normal';
    items: Array<any>;
}
declare const DraggableListView: ({ type, items, }: DraggableListViewProps) => JSX.Element;
export default DraggableListView;
