import React from "react";
import "./Button.css";

declare interface ButtonProps {
  content?: string;
  onClick?: () => void;
  appendIcon?: JSX.Element;
}

// const Button = (props: {content: string}) => {
// const Button: React.FC<{ content: string }> = (props) => {
const Button: React.FC<ButtonProps> = (props) => {
  return (
    <button className="AppButton" onClick={props.onClick}>
      {props.children || "Nameless button"}
      {props.appendIcon}
    </button>
  );
};

export default Button;
