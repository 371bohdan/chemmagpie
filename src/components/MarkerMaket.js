import React from 'react';
import axios from 'axios';

class MarkerMaket extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            box_nitrate: '',
            box_nitrite: '',
            box_chloride: '',
            sampling_places: []
        };
    }

    componentDidMount(){
        this.fetchSamplingPlaces()
      }

    fetchSamplingPlaces = async () => {
        try{
            const response = await axios.get('/api/places');
            const sampling_places = response.data;
            this.setState({ sampling_places: sampling_places }, () => {
            console.log(this.state.sampling_places); // Викликатимеся після успішного оновлення стану
        });
        }catch(err){
            console.log('Not coonect with database', err);
        }
    }

    render() {
        // const filterNitrate = chemicalIndexes.filter(place = place.chemical_index === "NO3-");
        // const filterNitrite = chemicalIndexes.filter(place = place.chemical_index === "NO2-");
        // const filterChloride = chemicalIndexes.filter(place = place.chemical_index === "Cl-");
        const sampling_places = this.state.sampling_places;

        return (
            <div>
                <h1>{sampling_places.name_place}</h1>
                <div className="table">
                    <div className="row">
                        <div className="cell">Type water object: {sampling_places.type_water_object}</div>
                        <div className="cell">Name water object: {sampling_places.name_water_object}</div>
                    </div>
                    {/* <div className="row">
                        {chemical_indexes.map((chem_index) => {
                            let date_c = new Date(chem_index.date);
                            if (
                                chem_index.name_place === place.name_place &&
                                chem_index.chem_index === 'NO3-' &&
                                (date_c > this.state.box_nitrate || this.state.box_nitrate === '')
                            ) {
                                this.setState({ box_nitrate: date_c });
                                return (<div><div className="cell">Chemical index: {chem_index.chem_index}</div>
                                        <div className='cell'>Result: {chem_index.result_chemindex} </div>
                                </div>);
                            }
                            return null;
                        })}
                    </div> */}
                </div>
            </div>
        );
    }
}

export default MarkerMaket;
