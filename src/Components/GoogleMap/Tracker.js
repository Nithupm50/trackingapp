import React, { useEffect, useState } from 'react';
import { GoogleMap, LoadScript ,Marker, InfoWindow} from '@react-google-maps/api';
import axios from 'axios'
import './Style.css'


const Tracker = () => {
    const [ selected, setSelected ] = useState({});
    const [getData , setGetData] = useState();
  

    var options = {
      method: 'GET',
      url: 'https://www.vzoneinternational.com/Integration/API/VZoneTrack/LiveData/9PPyQi',
      // params: {
      //   agencies: '12,16',
      //   routes: '4000421,4000592,4005122',
      //   geo_area: '35.80176,-78.64347|35.78061,-78.68218',
      //   callback: 'call'
      // },
      // headers: {
      //   'x-rapidapi-host': 'transloc-api-1-2.p.rapidapi.com',
      //   'x-rapidapi-key': '42bfb1290emsh71337a7c6c63a01p15d644jsn2505eafe2451'
      // }
    };
    
    axios.request(options).then(function (response) {
      console.log(response.data);
    }).catch(function (error) {
      console.error(error);
    });
    
    

    const locations = [
      {"Id":3,"VehicleId":12031,"TrackingId":630315729,"PlateNo":"S 26471 - Fuso - 2020","Model":"Mitsubishi Canter","Driver":"common driver","DriverContactNo":"","Ignition":"Stop","LocationName":"Sharjah Depot","Distance":"68.75 KM","DynValue":"01 H:03 M","TrackTime":"2022-02-27T16:45:25",location :{lat:25.302538,lng:55.436544},"Angle":291.00,"LastUpdate":"34 Minute(s) ago","IsTempSensor":true,"IsDoorSensor":true,"IsFuelSensor":false,"IsRFIDSensor":true,"IsTempTagSensor":true,"IsTempEnabled":1,"TemperatureValue":" Chiller: 22.80°C (70%) "
        },
        {"Id":2,"VehicleId":12030,"TrackingId":630377857,"PlateNo":"S 26472 - Fuso - 2020","Model":"Mitsubishi Canter","Driver":"Deepak Damani - 03-5286 (TAG:B900000109425B01)","DriverContactNo":"056-8422084","Ignition":"Stop","LocationName":"Sharjah Depot","Distance":"108.26 KM","DynValue":"01 H:18 M","TrackTime":"2022-02-27T17:06:11",location:{lat:25.302728,lng:55.436352},"Angle":134.00,"LastUpdate":"13 Minute(s) ago","IsTempSensor":true,"IsDoorSensor":true,"IsFuelSensor":false,"IsRFIDSensor":true,"IsTempTagSensor":true,"IsTempEnabled":1,"TemperatureValue":" Chiller: 20.90°C (85%) "},
        {"Id":1,"VehicleId":12029,"TrackingId":630394096,"PlateNo":"S 67209 - Fuso - 2020","Model":"Mitsubishi Canter","Driver":"Abdulla P P - 03-798 (TAG:B20000010984ED01)","DriverContactNo":"055 8014546","Ignition":"Stop","LocationName":"Sharjah Depot","Distance":"46.36 KM","DynValue":"02 H:14 M","TrackTime":"2022-02-27T17:11:01",location:{lat:25.302693,lng:55.436320},"Angle":197.00,"LastUpdate":"8 Minute(s) ago","IsTempSensor":true,"IsDoorSensor":true,"IsFuelSensor":false,"IsRFIDSensor":true,"IsTempTagSensor":true,"IsTempEnabled":1,"TemperatureValue":" Chiller: 24.20°C (78%) "},
        {"Id":5,"VehicleId":12851,"TrackingId":630391095,"PlateNo":"S 67209 - Test","Model":" ","Driver":"common driver","DriverContactNo":"","Ignition":"Stop","LocationName":"Enmaa AL Madina Supermarket, Industrial Area 13, Sharjah by 0.10 KM","Distance":"45.86 KM","DynValue":"02 H:14 M","TrackTime":"2022-02-27T17:10:43",location:{lat:25.302690,lng:55.436314},"Angle":287.00,"LastUpdate":"9 Minute(s) ago","IsTempSensor":true,"IsDoorSensor":false,"IsFuelSensor":false,"IsRFIDSensor":false,"IsTempTagSensor":true,"IsTempEnabled":1,"TemperatureValue":" 1 left wall: (300) | 2 right wall: (300) | 3 chiller front: 24.10°C (79) | 4 chiller side: (300) | Wired: 25.40°C "},
        {"Id":4,"VehicleId":12164,"TrackingId":630294685,"PlateNo":"S 82350 - Fuso - 2020","Model":"Mitsubishi Canter","Driver":"Haseeb Mundekkatt - 03-5276 (TAG:310000010A979501)","DriverContactNo":"056-6025406","Ignition":"Stop","LocationName":"Enmaa AL Madina Supermarket, Industrial Area 13, Sharjah by 0.05 KM","Distance":"44.98 KM","DynValue":"03 H:17 M","TrackTime":"2022-02-27T16:37:35",location:{lat:25.302880, lng:55.435955},"Angle":297.00,"LastUpdate":"42 Minute(s) ago","IsTempSensor":true,"IsDoorSensor":true,"IsFuelSensor":false,"IsRFIDSensor":true,"IsTempTagSensor":true,"IsTempEnabled":1,"TemperatureValue":" Chiller: 24.30°C (79) "}
       
      ];

      const onSelect = item => {
      setSelected(item);
      }
  
  const mapStyles = {        
    height: "100vh",
    width: "100%"};
  
  const defaultCenter = {
    lat: 25.302538, lng: 55.436544
  }

  // setGetData(locations.map((item)=>item.DynValue))

   return (
    <LoadScript
    googleMapsApiKey='AIzaSyDv9I5u2hXbYZFpTmp-9i0l49fLKuaDWp4'>
     <GoogleMap  mapContainerStyle={mapStyles}
     zoom={13}
     center={defaultCenter}
    
     >
          {
            locations.map(item => {
              return (
              <Marker key={item.name} position={item.location} onClick={() => onSelect(item)}/>
              )
            })
         }
          {
            selected.location && 
            (
              <InfoWindow
              position={selected.location}
              clickable={true}
              onCloseClick={() => setSelected({})}
            >
              <div>
              <p style={{ color: 'black'  }} className='info'>Tracking Id: {selected.TrackingId} <br/> Driver: {selected.Driver} <br/> Contact No: {selected.DriverContactNo} <br/> Location: {selected.LocationName} <br/> Distance: {selected.Distance}</p>
              
              </div>
            </InfoWindow>
            )
         }
         
     </GoogleMap>
  </LoadScript>
  )
}

export default Tracker