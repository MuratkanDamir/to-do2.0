import React from 'react';

import { EditText, EditTextarea } from 'react-edit-text';
import 'react-edit-text/dist/index.css';

const EditableText: React.FC = () =>{
  return (
    <div style={{fontSize:'1.5em', textAlign:'center'}}>
      <EditText />
    </div>
  );
}

export default EditableText;