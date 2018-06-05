import React, { Component } from 'react';
import './App.css';

class App extends Component {
  constructor(props){
    super(props)
    this.state  = { lng: null,
                    lat: null,
                    temp: null,
                    city: null,
                    country: null,
                    des: null,
                    icon: null,
                    sys: 'C°'
                    }
    this.showPosition = this.showPosition.bind(this);
    this.changeSys =  this.changeSys.bind(this);
  }

  componentDidMount(){
  	if (navigator.geolocation){
  		navigator.geolocation.getCurrentPosition(this.showPosition);
  	} else {
  		alert('Geolocation is not supported by this browser')
  	}
    
  }

  showPosition(position){
    this.setState({ lng: position.coords.longitude,
                    lat: position.coords.latitude});

    fetch(`https://fcc-weather-api.glitch.me/api/current?lat=${this.state.lat}&lon=${this.state.lng}`)
    .then(res => res.json())
    .then(data => {
      this.setState({ city: data.name,
                      temp: Math.round(data.main.temp),
                      des: data.weather[0].description,
                      icon: data.weather[0].icon})
    })
    .catch(err => console.log(err));
  }

  changeSys(){
  	if(this.state.sys === 'C°') this.setState({ sys: 'F°',
  												temp: Math.round((this.state.temp * 1.8) + 32)});
  	else {
  		this.setState({ sys: 'C°', temp: Math.round((this.state.temp - 32) * 5/9)})
  	}
  }

  render() {
    return (
    	<React.Fragment>
    {
    	this.state.city === null ?
    	<div className="App">
    		<div className="container-loading">
	        	<div className="loading">
	        	</div>
        	</div>
    	</div>
        :
        <div className="App">
        <h1 className="title">FCC Weather App</h1>
        <div className="container">
          <h2>{this.state.city}</h2>
          <img src={this.state.icon} alt=""/>
          <h3>{this.state.des}</h3>
          <p>{this.state.temp} {this.state.sys}</p>
          <button onClick={this.changeSys}>{
          	this.state.sys === 'C°' ? 'F°' : 'C°'
          }</button>
        </div>
      </div>

    }
    </React.Fragment>
    );
  }
}

export default App;
