import Container from 'react-bootstrap/Container';
import Navbar from 'react-bootstrap/Navbar';

function BrandExample() {
  return (
    <>
      <Navbar className="bg-body-tertiary" bg="dark" data-bs-theme="dark">
        <Container>
          <Navbar.Brand href="#home" style={{textAlign: "center"}}>My Dropbox</Navbar.Brand>
        </Container>
      </Navbar>
    </>
  );
}

export default BrandExample;
