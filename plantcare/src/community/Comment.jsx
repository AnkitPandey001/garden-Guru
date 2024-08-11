import React from 'react'

const Comment = ({ onClose }) => {
  return (
    <div className='comm_comment'>
        <h1>Comment pages</h1>
        <button onClick={onClose}>Close</button>
    </div>
  )
}

export default Comment


