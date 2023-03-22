import React, {Component} from 'react';

interface Props {
  children?: React.ReactNode;
}

interface State {}

export default class RenderProfilerClass extends Component<Props, State> {
  startTime: number = 0;
  duration: number = 0;

  state = {};

  constructor(props: Props) {
    super(props);
    this.state = {};
  }

  UNSAFE_componentWillMount() {
    this.startTime = new Date().getTime();
  }

  componentDidMount() {
    this.duration = new Date().getTime() - this.startTime;
    console.log('[Mount] Record Time', this.duration + 'ms');
  }

  render() {
    return this.props.children;
  }
}
