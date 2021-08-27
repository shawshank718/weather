import React, { useState, useEffect } from 'react';
import { DateTime }                   from 'luxon';

import './Secondary.css'

type Props = {
  data: any
};

function Secondary({data}: Props) {
  return (
    <div className="SecondaryWrapper">
      <h1 className="Temperature">{Math.round(data.temp)}&deg;</h1>
      <img className="WeatherIcon" src={'/weather-icons/' + data.icon + '.png'} alt=""/>
      <h4 className="Description">{data.description}</h4>
      <h3 className="Date">{DateTime.fromSeconds(data.dt).toLocaleString({ ...DateTime.DATE_MED, weekday: 'short' })}</h3>
    </div>
  )
}

export default Secondary;
