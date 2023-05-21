import React from 'react';

//  props.children 을 넣어야 Nested Component 에서 Wrapper 가 정상작동한다.
function Wrapper( {children} ) {
  const style = {
    border: '5px solid black',
    padding: '16px',
  };
  return (
    <div style={style}>
        {children}
    </div>
  )
}

export default Wrapper;