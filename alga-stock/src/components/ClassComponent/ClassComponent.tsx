import React from "react";

class ClassComponent extends React.Component<{ name: string }> {
  state = {
    name: "Mundo!!!",
  };

  render() {
    return (
      <div>
        <p>name: {this.state.name}</p>
        <button
          onClick={() => {
            this.setState({ name: "Danyllo" });
          }}
        >
          Click me
        </button>

        <div>
          Olá, {this.props.name} Eu sou um componente baseado em classe!
        </div>
      </div>
    );
  }
}

export default ClassComponent;
