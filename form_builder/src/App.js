import './App.css';
import CreateForm from './Components/CreateForm';
import Container from '@mui/material/Container';
import { Typography } from '@mui/material';
import Form from './Components/Form';
import {useState} from 'react'

function App() {
  const [renderFields, setRenderFields] = useState([])

  return (
    <>
      <Typography
      variant="h3"
      sx={{textAlign : "center",my:5}}
      >
        Form Builder App
      </Typography>
      <Container
      sx={{ display: "flex" }}
      fixed
      >
      <CreateForm renderFields={renderFields} setRenderFields={setRenderFields}/>
      <Form renderFields={renderFields} setRenderFields={setRenderFields}/>
      </Container>
    </>
  );
}

export default App;
