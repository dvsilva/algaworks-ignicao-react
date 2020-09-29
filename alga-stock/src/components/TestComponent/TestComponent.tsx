import React, { useState, useEffect } from "react";
import "./TestComponent.css";

// const TestComponent = () => <div className="TestComponent">Test Component!!!</div>;
function TestComponent(props: { name: string }) {
  // const state = {  age: 26  };
  const [age, setAge] = useState(21);

  // executado depois que o componente é renderizado
  // [] -> lista de dependencias (observar estado e reagir)
  useEffect(() => {
    console.log("component was created");
  }, []);

  // reagir quando a variavel age é atualizada ou inicializada
  useEffect(() => {
    console.log("age has been updated to: ", age);
  }, [age]);

  // console.log("second log");

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
