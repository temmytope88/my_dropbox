import { useState} from "react";
import axios from 'axios'
import { Form} from "react-bootstrap";
import Button from 'react-bootstrap/Button'

const FormComponent = (props) => {
    const [fil, setfile] = useState('')
    const [data, setData] = useState({})
    
    const HandleChange = (e) => {
        e.preventDefault();
        const file = e.target.files[0];
        var reader = new FileReader();
        reader.onloadend = function () {
            var base64Data = reader.result.split(',')[1];
            const data = {
                file_data: base64Data
            };
            setData(data)
        }
        setfile(file.name)
        reader.readAsDataURL(file);
        props.filename(file.name)
    }

    
    const HandleSubmit = async (e) => {
        e.preventDefault()       
        axios.post(`https://pimvhp4mb5.execute-api.eu-north-1.amazonaws.com/dev/uploadfiles?fileName=${fil}&username=${props.username}`,
        JSON.stringify(data), {
            headers: {
                'Content-Type': 'application/json'
            }
        })
        .then((response) => {            
                console.log(response)
            if (response.data.statusCode === 200) {
                console.log("file uploaded")
            }
            
        })
        .catch((error) => {
            console.error(error);
        })

        props.filename("")
        e.target[0].value = null
    }

    return (
        
        <Form onSubmit={HandleSubmit}>
            <Form.Group controlId="formFileLg" className="mb-3" >
                <Form.Label>Upload File</Form.Label><br/>
                <Form.Control type="file" size="lg" onChange={HandleChange} /><br/>                
            </Form.Group>
            <Button variant="primary" type="submit">Upload</Button>{' '}
        </Form>
        
    )

}


export default FormComponent
