import React, {Component} from 'react';

interface Props {
  finished: boolean;
  children?: React.ReactNode;
}

interface State {}

export default class UserActionProfilerClass extends Component<Props, State> {
  startTime: number = 0;
  duration: number = 0;

  state = {};

  constructor(props: Props) {
    super(props);
    this.state = {};
  }

  UNSAFE_componentWillUpdate(nextProps: Props, _nextState: State) {
    if (this.props.finished !== nextProps.finished && !this.props.finished) {
      this.startTime = new Date().getTime();
    }
  }

  componentDidUpdate(prevProps: Props, _prevState: State, _snapshot: any) {
    if (prevProps.finished !== this.props.finished && this.props.finished) {
      this.duration = new Date().getTime() - this.startTime;
      console.log('[UserAction] Record Time', this.duration + 'ms');
    }
  }

  render() {
    return this.props.children;
  }
}
