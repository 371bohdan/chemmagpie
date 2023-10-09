import React from 'react';
import "leaflet/dist/leaflet.css";
import { MapContainer, TileLayer, Marker, Popup, ZoomControl } from 'react-leaflet';
import { Icon } from "leaflet";
import axios from 'axios'

//Images
import downChevronImage from '../img/down-chevron.png';
import placeholder from '../img/placeholder.png';
import close from '../img/close.png'

const MPC = {
  nitrate: 50,
  nitrite: 0.5,
  chloride: 250,
  phosphate: 3.5,
  sulphate: 250,
  TH: 7,
  COC: 5,
  fluoride: 0.7
}

class LeafletMap extends React.Component {
  constructor(props){
    super(props);
    this.state = {
      sampling_places: [],
      chemical_indexes: [],
      clickMarker: '',
      showLegend: false,

      dataNitrate: '',
      dataNitrite: '',
      dataChloride: '',
      dataPhosphate: '',
      dataSulphate: '',
      dataTH: '',
      dataCOC: '',
      dataFluoride: ''
    }
  }

  parseDate = (dateStr) => {
    const parts = dateStr.split('.');
    const day = parseInt(parts[0], 10);
    const month = parseInt(parts[1], 10) - 1; // Місяці в JavaScript починаються з 0 (січень - 0, лютий - 1 і т.д.)
    const year = parseInt(parts[2], 10);
    return new Date(year, month, day);
  };

customIcon = new Icon(
  {
    iconUrl: require('../img/placeholder.png'),
    iconSize: [38, 38]
  }
);


componentDidMount(){
  this.fetchSamplingPlaces();
  this.fetchChemicalIndexes();
}


fetchSamplingPlaces = async () => {
  try{
    const response = await axios.get('/api/sampling_places');
    const sampling_places = response.data;
    this.setState({ sampling_places: sampling_places }, () => {
      console.log(this.state.sampling_places); // Викликатимеся після успішного оновлення стану
    });
  }catch(err){
    console.log('Not coonect with database', err);
  }
}


fetchChemicalIndexes = async () => {
  try{
    const response = await axios.get('/api/chemical-indexes');
    const chemical_indexes = response.data;
    this.setState({chemical_indexes: chemical_indexes}, () => {
      console.log(this.state.chemical_indexes);
    })
  }catch(err){
    console.log('Not connect with database', err)
  }
}


changeChemicalIndexes = (place) => {
  this.setState({dataNitrate: '', dataNitrite: '', dataChloride: '', dataPhosphate: '', dataSulphate: '', dataCOC: '', dataTH: '', dataFluoride: ''});
  let date_max_nitrate = '';
  let date_max_nitrite = '';
  let date_max_chloride = '';
  let date_max_phosphate = '';
  let date_max_sulphate = '';
  let date_max_COC = '';
  let date_max_TH = '';
  let date_max_fluoride = '';
  this.state.chemical_indexes.map(e => {
    if(e.name_place === place.name_place){
    if(e.chemical_index === 'NO3-' && (date_max_nitrate === '' || date_max_nitrate < this.parseDate(e.date_analysis))) {
      this.setState({dataNitrate: e});
      date_max_nitrate = this.parseDate(e.date_analysis)
    }
    else if(e.chemical_index === 'NO2-' && (date_max_nitrite === '' || date_max_nitrite < this.parseDate(e.date_analysis))){
      this.setState({dataNitrite: e});
      date_max_nitrite = this.parseDate(e.date_analysis);
    }
    else if(e.chemical_index === 'Cl-' && (date_max_chloride === '' || date_max_chloride < this.parseDate(e.date_analysis))){
      this.setState({dataChloride: e});
      date_max_chloride = this.parseDate(e.date_analysis);
    }
    else if(e.chemical_index === 'PO43-' && (date_max_phosphate === '' || date_max_phosphate < this.parseDate(e.date_analysis))){
      this.setState({dataPhosphate: e});
      date_max_phosphate = this.parseDate(e.date_analysis);
    }
    else if(e.chemical_index === 'SO42-' && (date_max_COC === '' || date_max_sulphate < this.parseDate(e.date_analysis))){
      this.setState({dataSulphate: e});
      date_max_sulphate = this.parseDate(e.date_analysis);
    }
    else if(e.chemical_index === 'COC' && (date_max_sulphate === '' || date_max_COC < this.parseDate(e.date_analysis))){
      this.setState({dataCOC: e});
      date_max_COC = this.parseDate(e.date_analysis);
    }
    else if(e.chemical_index === 'TH' && (date_max_TH === '' || date_max_TH < this.parseDate(e.date_analysis))){
      this.setState({dataTH: e});
      date_max_TH = this.parseDate(e.date_analysis);
    }
    else if(e.chemical_index === 'F-' && (date_max_fluoride === '' || date_max_TH < this.parseDate(e.date_analysis))){
      this.setState({dataFluoride: e});
      date_max_fluoride = this.parseDate(e.date_analysis);
    }
    }
  })
}



handleLegend = () => {
  if(this.state.showLegend === false) this.setState({showLegend: true})
  else this.setState({showLegend: false})
}
  render(){
  const sampling_places = this.state.sampling_places
  const customIcon = this.customIcon;
  const {dataNitrate, dataNitrite, dataChloride, dataPhosphate, dataSulphate, dataTH, dataCOC, dataFluoride} = this.state;
  return(
    <div className="map-container">
      <div className='map'>
      <MapContainer center={[50.440636, 30.462625]} zoom={6} zoomControl={false}>
        <TileLayer attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
          url="https://tile.openstreetmap.org/{z}/{x}/{y}.png" 
           />
          <ZoomControl position="bottomright" className="zoom-control"/>
          <div className="title-chemmagpie">
              <p>Chemmagpie</p>
              <div>
                <p className='legend'>legend</p>
                <img src={downChevronImage} alt="Clickable Icon" onClick={this.handleLegend}/>
              </div>
            </div>
            <a className="survey" style={{color:'black'}} href="https://docs.google.com/forms/d/e/1FAIpQLScA4AhmDn4_Qn2PnYy5_1pK49zsDfEZG436kLqiougGcH71wg/viewform?usp=sf_link">take a survey </a>
        {sampling_places.map((place) => (
          <Marker
            key={place._id}
            position={[place.longitude, place.latitude]}
            icon={customIcon}
            eventHandlers={{click: () => this.changeChemicalIndexes(place)}}
          >
            <Popup className='popup'>
            <div style={{textAlign: 'center', fontWeight: 'bold'}}>{place.name_place}</div>
            <div className="general-grid">
              <div style={{fontFamily: 'Verdana, sans-serif'}}>Name water object</div>
              <div style={{fontWeight: 'bold'}}>{place.name_water_object}</div>
              <div style={{fontFamily: 'Verdana, sans-serif'}}>Type water object</div>
              <div style={{fontWeight: 'bold'}}>{place.type_water_object}</div>
            </div>
            <div className="popup-grid">
              <div className="header-grid">Chemical Index</div>
              <div className="header-grid">Result</div>
              <div className="header-grid">Date analysis</div>
            <div>Nitrates</div>
            {dataNitrate.result_chemical_index > MPC.nitrate ? 
              <div className='redundantCPM'>{dataNitrate.result_chemical_index} mg/dm³</div>
            : dataNitrate.result_chemical_index <= MPC.nitrate ? 
              <div className='normalCPM'>{dataNitrate.result_chemical_index} mg/dm³</div>
            : <div>-</div>
            }
            <div>{dataNitrate.date_analysis}</div>
            <div>Nitrites</div>
                {dataNitrite.result_chemical_index > MPC.nitrate ? (
              <div className='redundantCPM'>{dataNitrite.result_chemical_index} mg/dm³</div>
            ):dataNitrite.result_chemical_index <= MPC.nitrate ? (
              <div className='normalCPM'>{dataNitrite.result_chemical_index} mg/dm³</div>
            ): (
              <div>-</div>
            )}
            <div>{dataNitrite.date_analysis}</div>

            <div>Chlorides</div>
            {dataChloride.result_chemical_index > MPC.chloride ? 
              <div className='redundantCPM'>{dataChloride.result_chemical_index} mg/dm³</div>
            :dataChloride.result_chemical_index <= MPC.chloride ? 
             <div className='normalCPM'>{dataChloride.result_chemical_index} mg/dm³</div>
            : 
              <div>-</div>
            }
            <div>{dataChloride.date_analysis}</div>

            <div>Phosphates</div>
            {dataPhosphate.result_chemical_index > MPC.phosphate ? 
              <div className='redundantCPM'>{dataPhosphate.result_chemical_index} mg/dm³</div>
            :dataPhosphate.result_chemical_index <= MPC.phosphate ? 
             <div className='normalCPM'>{dataChloride.result_chemical_index} mg/dm³</div>
            : 
              <div>-</div>
            }
            <div>{dataPhosphate.date_analysis}</div>

            <div>Sulphates</div>
            {dataSulphate.result_chemical_index > MPC.sulphate ? 
              <div className='redundantCPM'>{dataSulphate.result_chemical_index} mg/dm³</div>
            :dataSulphate.result_chemical_index <= MPC.sulphate ? 
             <div className='normalCPM'>{dataSulphate.result_chemical_index} mg/dm³</div>
            : 
              <div>-</div>
            }
            <div>{dataSulphate.date_analysis}</div>

            <div>Total hardness</div>
            {dataTH.result_chemical_index > MPC.TH ? 
              <div className='redundantCPM'>{dataTH.result_chemical_index} mmol/dm³</div>
            :dataTH.result_chemical_index <= MPC.TH ? 
             <div className='normalCPM'>{dataTH.result_chemical_index} mmol/dm³</div>
            : 
              <div>-</div>
            }
            <div>{dataTH.date_analysis}</div>

            <div>Chemical consumption of oxygen</div>
            {dataCOC.result_chemical_index > MPC.COC ? 
              <div className='redundantCPM'>{dataCOC.result_chemical_index} mg/dm³</div>
            :dataCOC.result_chemical_index <= MPC.COC ? 
             <div className='normalCPM'>{dataCOC.result_chemical_index} mg/dm³</div>
            : 
              <div>-</div>
            }
            <div>{dataCOC.date_analysis}</div>

            <div>Fluorides</div>
            {dataFluoride.result_chemical_index > MPC.COC ? 
              <div className='redundantCPM'>{dataFluoride.result_chemical_index} mg/dm³</div>
            :dataFluoride.result_chemical_index <= MPC.fluoride ? 
             <div className='normalCPM'>{dataFluoride.result_chemical_index} mg/dm³</div>
            : 
              <div>-</div>
            }
            <div>{dataFluoride.date_analysis}</div>
          </div></Popup>
          </Marker>
          ))}
        </MapContainer>
        {this.state.showLegend === true &&
        (<div className='legend-map' >
          <p><img className="close-legend" src={close} onClick={this.handleLegend}/></p>
          <p><img src={placeholder}/> - place of sampling</p>
          <p><div style={{display:'inline', backgroundColor: '#ff1d58'}}>100.5</div> - negative result chemical index</p>
          <p><div style={{display:'inline', backgroundColor: '#9bc55b'}}>77.7</div> - positive result chemical index</p>
        </div>)
        }
        </div>
    </div>
  )
}
}

export default LeafletMap;





