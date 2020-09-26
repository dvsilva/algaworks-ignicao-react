import React, { useState } from "react";
import "./TestComponent.css";

// const TestComponent = () => <div className="TestComponent">Test Component!!!</div>;
function TestComponent(props: { name: string }) {
  // const state = {  age: 26  };
  const [age, setAge] = useState(21);

  return (
    <div className="TestComponent">
      Olá, {props.name}. {age}
      <button
        onClick={() => {
          setAge(age + 1);
          // nao atualiza pois o state nao seria uma variavel que seria atualizada
          // state.age++;
          // console.log(state.age);
        }}
      >
        +
      </button>
    </div>
  );
}

export default TestComponent;
