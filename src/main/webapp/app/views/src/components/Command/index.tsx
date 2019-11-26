import React from 'react';

interface ICommandProps {
  name: any;
}

class Command extends React.Component<ICommandProps, any> {
  render() {
    const { name, children } = this.props;

    return (
      <div className="command" data-command={name}>
        {children}
      </div>
    );
  }
}

export default Command;
