import React, { useState, useEffect } from 'react';
import { DateTime }                   from 'luxon';

import './Primary.css';

type Props = {
  data: any
};

function Primary({data}: Props) {
  return (
    <div className="PrimaryWrapper">
      <div className="WeatherDetailsWrapper">
        <div>
          <h1 className="Temperature">{Math.round(data.temp)}&deg;</h1>
          <h4 className="Description">{data.description}</h4>
        </div>
        <img className="WeatherIcon" src={'/weather-icons/' + data.icon + '.png'} alt=""/>
      </div>
      <div className="OtherDetailsWrapper">
        <h1 className="City">{data.city}, {data.country}</h1>
        <h3 className="Date">{DateTime.fromSeconds(data.dt).toLocaleString({ ...DateTime.DATE_MED, weekday: 'short' })}</h3>
      </div>
    </div>
  )
}

export default Primary;
