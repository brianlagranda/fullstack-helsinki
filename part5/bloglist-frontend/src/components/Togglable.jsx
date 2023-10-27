import { useState, forwardRef, useImperativeHandle } from 'react';

import Button from './Button';

const Togglable = forwardRef((props, refs) => {
  const [visible, setVisible] = useState(false);

  const hideWhenVisible = { display: visible ? 'none' : '' };
  const showWhenVisible = { display: visible ? '' : 'none' };

  const toggleVisibility = () => {
    setVisible(!visible);
  };

  useImperativeHandle(refs, () => {
    return {
      toggleVisibility,
    };
  });

  return (
    <div className='mx-auto w-64 flex justify-center py-4'>
      <div style={hideWhenVisible} className=' p-4'>
        <Button
          onClick={toggleVisibility}
          text={props.buttonLabel}
          btn={props.btn}
        />
      </div>
      <div style={showWhenVisible} className=''>
        {props.children}
      </div>
    </div>
  );
});

Togglable.displayName = 'Togglable';

export default Togglable;
