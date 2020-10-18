import React from "react";
import Button from 'react-bootstrap/Button'
import Modal from 'react-bootstrap/Modal'

export default ({ width, height, children }) => {
  const [xPosition, setX] = React.useState(-width);
  const [show, setShow] = React.useState(false);

  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);

  const toggleMenu = () => {
    if (xPosition < 0) {
      setX(0);
    } else {
      setX(-width);
    }
  };

  React.useEffect(() => {
    setX(0);
  }, []);
  return (
    <React.Fragment>
      <div
        className="side-bar"
        style={{
          transform: `translatex(${xPosition}px)`,
          width: width,
          minHeight: height
        }}
      >
        <button
          id="sideBarButtonClickID"
          onClick={() => toggleMenu()}
          className="toggle-menu"
          style={{
            transform: `translate(${width}px, 20vh)`
          }}
        ></button>
        <div className="content">{children}</div>
      </div>
          <button onClick={handleShow} style={{color: "grey",bottom:0,position:"absolute", padding:"3px", left:"12px", background: "none", border: "none"}}>Privacy</button>
          <Modal show={show} onHide={handleClose}>
        <Modal.Header closeButton>
          <Modal.Title>Privacy Policy</Modal.Title>
        </Modal.Header>
        <Modal.Body><p>This site does not collect or store any information about its users. Google maps provides the map functionality and
           any information gathered by Google is for the sole purpose of Google, Inc. whose privacy policy for Google can be found <a href="https://policies.google.com/privacy?hl=en-US">here</a>.  The initial location request is used to center 
           the map to a more desirable location.  For users with older browsers, or who do not want to use the browser location, a call to freegeoip is made
           to estimate where the map should center.  Information on geoip can be found <a href="https://freegeoip.app/">here</a>.</p></Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={handleClose}>
            Close
          </Button>
        </Modal.Footer>
      </Modal>
    </React.Fragment>
  );
};