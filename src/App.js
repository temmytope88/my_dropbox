//import './App.css';
import { useState, useEffect } from 'react';
import FormComponent from './components/Form';
import TableComponent from './components/Table';
import "@aws-amplify/ui-react/styles.css";
import {Button, Container, Row} from 'react-bootstrap';
import { withAuthenticator } from "@aws-amplify/ui-react";
import { Amplify, Auth } from 'aws-amplify';
import config from './aws-exports';
import 'bootstrap/dist/css/bootstrap.min.css';
import BrandExample from './components/Nav';
Amplify.configure(config);


function App({signOut}) {
  const [filename, setFilename] = useState("")
  const [accesstoken, setAccessToken] = useState("")
  const [username, setUsername] = useState("")
  const [files, setFiles] = useState([])

  const getFilename = (val) => {
    setFilename(val)
  }

  useEffect(() => {
    const getToken = async () => {

      const username = await Auth.currentAuthenticatedUser()
      console.log(username.username)

      if (username) {
        setUsername(username.username)
      }

    }
    getToken()
  }, [username])

  useEffect(() => {
    const getFiles = async () => {

      try {
        const user = await Auth.currentSession()
        const token = user.accessToken.jwtToken
        setAccessToken(token)
        
        let res = await fetch(`https://pimvhp4mb5.execute-api.eu-north-1.amazonaws.com/dev/savedfiles/?token=${token}`,
          {
            method: 'POST',

            headers: {
              'Content-Type': 'application/json',
            },
            mode: 'cors',
            
          })
        if (res.ok) {
          const details = await res.json()
          //console.log(details)
          if (details.body) {
            const result = details.body
            setFiles(result)
          }
        }
        else {
          console.log(res)
        }
      } catch (err) {
        console.log(err)
      }
    }
    getFiles()
  }, [files])


  return (   
    <Container>
      <Row>
        <BrandExample/>
      </Row><br/>
      <Row>
        <FormComponent filename={getFilename} token={accesstoken} username={username} />
      </Row><br/>

      <Row>
        <TableComponent files={files} username={username} />
      </Row><br/>
      <Row>
        <hr/>
        <p>
          <Button variant="danger" onClick={signOut}>Logout</Button>
        </p>
      </Row>      
    </Container>

  );
}

export default withAuthenticator(App)

