import React from "react";

class ClassComponent extends React.Component<{ name: string }> {
  state = {
    name: "Mundo!!!",
  };

  constructor(props: any) {
    super(props);
    console.log("constructor reached");
  }

  componentDidMount() {
    console.log("did mount reached");
  }

  componentDidUpdate() {
    console.log("did update reached");
  }

  render() {
    console.log("render reached");
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
