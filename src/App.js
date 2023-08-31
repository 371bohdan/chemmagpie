import React from 'react'; // обов'язково без нього компіляція не відбудеться

import LeafletMap from './components/LeafletMap'


class App extends React.Component {
    constructor(props){
        super(props)
        this.state = {
        }
    }
    render(){
        return (
        <div>
        <LeafletMap />
        </div>
    )
}
}
 


export default App;