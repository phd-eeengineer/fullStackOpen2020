import React, { useState, useImperativeHandle } from 'react'
import PropTypes from 'prop-types'

const Togglable = React.forwardRef((props, ref) => {
  const [visible, setVisible] = useState(false)

  const hideWhenVisible = { display: visible ? 'none' : '' }
  const showWhenVisible = { display: visible ? '' : 'none' }

  const toggleVisibility = () => {
    setVisible(!visible)
  }

  // useImperativeHandle() fonksiyonu React'ın fonksiyonu;
  // İçindeki parametrenin değeri component dışından da değiştirilebilir. 
  useImperativeHandle(ref, () => {
    return {      
      toggleVisibility    
    }  
  })

  return (
    <div>
      <div style={hideWhenVisible}>
        <button id="label-button" onClick={toggleVisibility}>{props.buttonLabel}</button>
      </div>
      <div style={showWhenVisible}>
        {props.children}
        <button id="cancel-button" onClick={toggleVisibility}>cancel</button>
      </div>
    </div>
  )
})

Togglable.propTypes = {
  buttonLabel: PropTypes.string.isRequired
}

export default Togglable

