import React from 'react';
import Map from './components/MapPage/Map'
import Sidebar from './components/SidePanel/Sidebar'
import QueryForm from './components/QueryForm/QueryForm'
import secrets from './secrets'
const gMapsKey = secrets.googleMapApiKey;

function App() {
  return (
    <div className="viewport">
      <div className="sideBarContainer">
        <Sidebar width={400} height={"100vh"}>
          <QueryForm></QueryForm>
      </Sidebar>
      </div>
      <div className="static-pane">
        <Map googleMapKey={gMapsKey}></Map>
      </div>
    </div>
  );
}

export default App;
