import { useState, forwardRef, useImperativeHandle } from "react";

import Button from "./Button";

const Togglable = forwardRef((props, refs) => {
  const [visible, setVisible] = useState(false);

  const hideWhenVisible = { display: visible ? "none" : "" };
  const showWhenVisible = { display: visible ? "" : "none" };

  const toggleVisibility = () => {
    setVisible(!visible);
  };

  useImperativeHandle(refs, () => {
    return {
      toggleVisibility,
    };
  });

  return (
    <div>
      <div style={hideWhenVisible}>
        <Button
          onClick={toggleVisibility}
          text={props.buttonLabel}
          btn={props.btn}
        />
      </div>
      <div style={showWhenVisible}>
        {props.children}
        <Button onClick={toggleVisibility} text="Cancel" btn="btn-cancel" />
      </div>
    </div>
  );
});

Togglable.displayName = "Togglable";

export default Togglable;
