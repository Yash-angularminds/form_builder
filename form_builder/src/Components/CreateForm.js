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
import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import { CheckBox } from '@mui/icons-material';
import Checkbox from '@mui/material/Checkbox';



function CreateForm() {

    const [fieldType, setFieldType] = useState('');
    const [optionField, setOptionField] = useState(false);
    const [label, setLabel] = useState('')
    const [fieldName, setFieldName] = useState('')
    const [optionList, setOptionList] = useState('')
    const [renderFields, setRenderFields] = useState([])
    const [formData, setFormData] = useState([])


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
        // pushFields()
    }

    const handleFormData = (fieldName, data) => {
        setFormData(
            renderFields.map((field) =>
                field.label == fieldName
                    ? { ...field, value: data }
                    : { name: fieldName, value: data }
            ))
        console.log(fieldName);
        // console.log(data);
    }

    const logData = () => {
        console.log(formData);
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
                    <Typography>
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
                    {optionField === true ? <TextField sx={{ my: 2 }} id="outlined-basic" label="Options" variant="outlined" value={optionList} onChange={(e) => setOptionList(e.target.value)} /> : null}
                    <br />
                    <Button
                        variant="contained"
                        sx={{ mt: 7 }}
                        onClick={() => handleSubmit()}
                    >
                        Submit
                    </Button>
                </Box>
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
                    <Typography>
                        Form:
                    </Typography>
                    {renderFields ? renderFields.map((field) => (
                        <>
                            {field.fieldType == "Text" ?

                                <>
                                    {console.log(field.fieldName)}
                                    <TextField
                                        sx={{ my: 2 }}
                                        id="outlined-basic"
                                        label={field.label}
                                        variant="outlined"
                                        // value={fieldName}
                                        name={field.fieldName}
                                        onChange={(e) => handleFormData(field.fieldName, e.target.value)}
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
                                        style={{ width: 200 }}
                                        onChange={(e) => handleFormData(field.fieldName, e.target.value)}
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
                                            onChange={(e) => handleFormData(field.fieldName, e.target.value)}
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
                                            defaultValue="Male"
                                            name={field.fieldName}
                                            onChange={(e) => handleFormData(field.fieldName, e.target.value)}
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
                                    {field.options.split(',').map((option, i) => (
                                        <FormControlLabel control={<Checkbox />} label={option} />
                                    ))}
                                    <br />
                                </>
                                : ''}
                        </>
                    )) : <p>No Fields Added</p>}
                    <Button
                        variant="contained"
                        sx={{ mt: 7 }}
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

