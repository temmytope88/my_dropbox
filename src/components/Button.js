import axios from "axios"
import { useState } from "react"
import { Button } from "react-bootstrap"

const ButtonComponent = (props) => {
    const [response, setResponse] = useState("")
    const HandleClick = async (e) => {
        try{
            console.log("delete function")
            let res = axios.delete(`https://pimvhp4mb5.execute-api.eu-north-1.amazonaws.com/dev/savedfiles/?username=${props.username}&filename=${props.filename}`)

            if (res.ok) {
                setResponse("File sucessfully deleted")
                //console.log(res)
            } else {
                console.log(res)
                setResponse("File no deleted")
            }
        }catch (err) {
            //console.log(err)
        }
    }

    return (
        <Button variant= "danger" onClick={HandleClick}>Delete</Button>
    )    

}
export default ButtonComponent