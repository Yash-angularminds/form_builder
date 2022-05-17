import React, { useState } from 'react'
import Box from '@mui/material/Box';
import Container from '@mui/material/Container';
import TextField from '@mui/material/TextField';
import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import Select from '@mui/material/Select';
import Button from '@mui/material/Button';
import { FormGroup, Typography } from '@mui/material';
import TextareaAutosize from '@mui/material/TextareaAutosize';
import Radio from '@mui/material/Radio';
import RadioGroup from '@mui/material/RadioGroup';
import FormControlLabel from '@mui/material/FormControlLabel';
import FormLabel from '@mui/material/FormLabel';
import Checkbox from '@mui/material/Checkbox';
let checks2 = []

function CreateForm() {

    const [fieldType, setFieldType] = useState('');
    const [optionField, setOptionField] = useState(false);
    const [label, setLabel] = useState('')
    const [fieldName, setFieldName] = useState('')
    const [optionList, setOptionList] = useState('')
    const [renderFields, setRenderFields] = useState([])
    const [formData, setFormData] = useState([])
    const [checkBoxData, setCheckBoxData]  = useState([])
    // let temp = []

    const handleChange = (e) => {
        let field = e.target.value

        // e.target.value == "Select" ? setOptionField(true) : setOptionField(false)

        if (field == "Select" || field == "Radio" || field == "Checkbox") {
            setOptionField(true)
        }
        else if (field === "Text" || "Textarea") {
            setOptionField(false)
        }
        setFieldType(field);
        // console.log(e);
    };

    const handleSubmit = () => {
        let temp = {
            label: label,
            fieldType: fieldType,
            fieldName: fieldName,
            options: optionList
        }
        setRenderFields([...renderFields, temp])
        setLabel("")
        setFieldType("")
        setFieldName("")
        setOptionList("")
        setOptionField(false)
        // pushFields()
    }
    localStorage.setItem("renderFields",JSON.stringify(renderFields))

    const handleFormData = (e) => {
        const name = e.target.name;
        const value = e.target.value;
        setFormData((values) => ({...values, [name]: value}))
    }

    let dupli; 
    const handleCheckBoxData = (e) => {
        const name = e.target.name;
        const value = e.target.value;

        if (e.target.checked) {
            dupli = formData[name] || [];
            dupli.push(value);
            checks2 = dupli;
            setFormData ({
              ...formData,
              [name]: dupli
            });
        } 

        else {
            var dupliV = formData[name] || [];
            let indi = dupliV.findIndex((item) => item === value);
            dupliV.splice(indi, 1);
            // var dupliV = checks2.filter((each) => each !== e.target.value);
            setFormData({
              ...formData,
              [name]: dupliV,
            });
            checks2 = dupliV;
        }
              
        // if(e.target.checked){
        //     // setCheckBoxData((values) => ({...values, [name]: value}))
        //     setCheckBoxData([...checkBoxData, value])
        // }
        // else{
        //     setCheckBoxData(checkBoxData.filter(value => value!==e.target.value))
        // }
        
        // console.log(name);
    }

    const handleReset = () => {
        setRenderFields([])
    }

    const logData = () => {
        console.log(formData);
        // setFormData({...formData, hobbies:checkBoxData})
        // console.log(checkBoxData);
    }

    // console.log(renderFields);
    // console.log(fieldType);
    // console.log(optionField);

    return (
        <React.Fragment>
            <Container
                sx={{ display: "flex" }}
                fixed>
                <Box
                    sx={{
                        width: 550,
                        height: 600,
                        // backgroundColor: 'primary.dark',
                        border: '1px solid black',
                        justifyContent: "center",
                        textAlign: "center",
                        mr: 3,
                        // '&:hover': {
                        //     backgroundColor: 'primary.main',
                        //     opacity: [0.9, 0.8, 0.7],
                        // },
                    }}
                >
                    <Typography variant="h5">
                        Build a form:
                    </Typography>
                    <br />
                    <TextField
                        sx={{ my: 2 }}
                        id="outlined-basic"
                        label="Label"
                        variant="outlined"
                        value={label}
                        onChange={(e) => setLabel(e.target.value)}
                    />
                    <br />
                    <FormControl sx={{ width: "50%" }}>
                        <InputLabel id="demo-simple-select-label">Field Type</InputLabel>
                        <Select
                            labelId="demo-simple-select-label"
                            id="demo-simple-select"
                            value={fieldType}
                            label="Field Type"
                            // sx={{ml:2}}
                            onChange={(e) => handleChange(e)}
                        >
                            <MenuItem value={"Text"}>Text</MenuItem>
                            <MenuItem value={"Textarea"}>Textarea</MenuItem>
                            <MenuItem value={"Select"}>Select</MenuItem>
                            <MenuItem value={"Checkbox"}>Checkbox</MenuItem>
                            <MenuItem value={"Radio"}>Radio</MenuItem>
                        </Select>
                    </FormControl>
                    <br />
                    <TextField
                        sx={{ my: 2 }}
                        id="outlined-basic"
                        label="Name"
                        variant="outlined"
                        value={fieldName}
                        onChange={(e) => setFieldName(e.target.value)}
                    />
                    <br />
                    {optionField === true ? 
                    <TextField 
                        sx={{ my: 2 }} 
                        id="outlined-basic" 
                        label="Options" 
                        variant="outlined" 
                        value={optionList} 
                        onChange={(e) => setOptionList(e.target.value)} 
                    /> 
                    : null}
                    <br />
                    <Button
                        variant="contained"
                        sx={{mt: 7,mr:2}}
                        onClick={() => handleSubmit()}
                    >
                        Submit
                    </Button>
                    <Button
                        variant="contained"
                        color = "error"
                        sx={{ mt: 7 }}
                        onClick={() => handleReset()}
                    >
                        Reset Form
                    </Button>
                </Box>
                <Box
                    sx={{
                        width: 550,
                        minHeight: 600,
                        // backgroundColor: 'primary.dark',
                        border: '1px solid black',
                        justifyContent: "center",
                        textAlign: "center",
                        mr: 3,
                        // '&:hover': {
                        //     backgroundColor: 'primary.main',
                        //     opacity: [0.9, 0.8, 0.7],
                        // },
                    }}
                >
                    <Typography variant="h5">
                        Form Preview:
                    </Typography>
                    {renderFields? renderFields.map((field) => (
                        <>
                            {field.fieldType == "Text" ?

                                <>
                                    {console.log(field.fieldName)}
                                    <TextField
                                        sx={{ my: 2 }}
                                        id="outlined-basic"
                                        label={field.label}
                                        variant="outlined"
                                        // value={formData.fieldName || ""}
                                        name={field.fieldName}
                                        onChange={(e) => handleFormData(e)}
                                    />
                                    <br />
                                </>
                                : ''}
                            {field.fieldType == "Textarea" ?
                                <>
                                    <TextareaAutosize
                                        aria-label="minimum height"
                                        minRows={3}
                                        placeholder={field.label}
                                        name={field.fieldName}
                                        // value={formData.fieldName || ""}
                                        style={{ width: 200 }}
                                        onChange={(e) => handleFormData(e)}
                                    />
                                    <br />
                                </>
                                : ''}
                            {field.fieldType == "Select" ?
                                <>
                                    <FormControl sx={{ width: "50%" }}>
                                        <InputLabel id="demo-simple-select-label">{field.label}</InputLabel>
                                        <Select
                                            // labelId="demo-simple-select-label"
                                            // id="demo-simple-select"
                                            // value={age}
                                            // sx={{width: "50%" }}
                                            label={field.label}
                                            name={field.fieldName}
                                            // value={formData.fieldName || ""}
                                            onChange={(e) => handleFormData(e)}
                                        >
                                            {field.options.split(',').map((option, i) => (
                                                <MenuItem key={i} value={option}>{option}</MenuItem>
                                            ))}
                                        </Select>
                                    </FormControl>
                                    <br />
                                </>
                                : ''}
                            {field.fieldType == "Radio" ?
                                <>
                                    <FormControl>
                                        <FormLabel id="demo-radio-buttons-group-label">{field.label}</FormLabel>
                                        {console.log(field.fieldName)}
                                        <RadioGroup
                                            aria-labelledby="demo-radio-buttons-group-label"
                                            // defaultValue="Male"
                                            name={field.fieldName}
                                            // value={formData.fieldName || ""}
                                            onChange={(e) => handleFormData(e)}
                                        >
                                            {field.options.split(',').map((option, i) => (
                                                <FormControlLabel key={i} value={option} control={<Radio />} label={option} />
                                            ))}
                                        </RadioGroup>
                                    </FormControl>
                                    <br />
                                </>
                                : ''}
                            {field.fieldType == "Checkbox" ?
                                <>
                                    {/* <FormGroup>
                                        <FormControlLabel control={<Checkbox defaultChecked />} label="Label" />
                                        <FormControlLabel disabled control={<Checkbox />} label="Disabled" />
                                    </FormGroup> */}

                                    <Typography>{field.label}</Typography>
                                    {/* <FormGroup>
                                    {field.options.split(',').map((option, i) => (
                                        <FormControlLabel key={i} value={option} control={<CheckBox />} label={option} />
                                    ))}  
                                    </FormGroup> */}
                                    <FormGroup>
                                    {field.options.split(',').map((option, i) => (
                                        <FormControlLabel 
                                        sx={{ml:30}}
                                        control={<Checkbox />} 
                                        label={option} 
                                        name={field.fieldName}
                                        value={option}
                                        onChange={(e) => handleCheckBoxData(e)}
                                        />
                                    ))}
                                    </FormGroup>
                                    <br />
                                </>
                                : ''}
                        </>
                    )) : <Typography>No Fields Added</Typography>}
                    <Button
                        variant="contained"
                        sx={{mt: 7}}
                        onClick={() => logData()}
                    >
                        Submit
                    </Button>
                </Box>
            </Container>
        </React.Fragment>
    )
}

export default CreateForm

