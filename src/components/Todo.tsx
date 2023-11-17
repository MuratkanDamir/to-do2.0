import React from 'react'
import { useState } from 'react';

function Todo() {
  const [value, setValue] = useState("")
  return (
        <div>
            <form>
              <input type="text"
                value = {value}
                onChange = {(e) => setValue(e.target.value)}
              />
              <button>add</button>
            </form>
        </div>
  )
}

export default Todo;
