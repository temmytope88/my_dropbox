import ButtonComponent from "./Button"
import {Table, Button } from 'react-bootstrap'
const TableComponent = (props) => {
    const files = props.files


    return (
        <>
            <br />
            <hr />
            
            <Table striped bordered hover>
                <thead>
                    <tr>
                        <th>#</th>
                        <th>File name</th>
                        <th>URL</th>
                        <th>Action</th>
                    </tr>
                </thead>
                <tbody>
                    {
                        files.length > 0 ?
                        files.map(
                            (file, index) => {
                                return (
                                    <tr key={index}>
                                        <td>{index + 1}</td>
                                        <td>{file.file}</td>
                                        <td>
                                            <Button variant="success">
                                                <a href={file.url} style={{color: "white", textDecoration: "none"} }>View</a>
                                            </Button>
                                        </td>
                                        <td>
                                            <ButtonComponent username={props.username} filename={file.file} />
                                        </td>
                                    </tr>
                                )
                            }
                        ): null
                    }
                    
                </tbody>
            </Table>
        </>
    )
}

export default TableComponent