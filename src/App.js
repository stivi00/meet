/* eslint-disable no-unused-vars */
/* eslint-disable react-hooks/exhaustive-deps */

import CitySearch from './components/CitySearch';
import EventList from './components/EventList';
import NumberOfEvents from './components/NumberOfEvents';
import CityEventsChart from './components/CityEventsChart';
import EventGenresChart from './components/EventGenresChart';
import { useEffect, useState } from 'react';
import { extractLocations, getEvents } from './api';
import { InfoAlert, ErrorAlert, WarningAlert } from './components/Alert';

import './App.css';

const App = () => {
    const [allLocations, setAllLocations] = useState([]);
    const [currentNOE, setCurrentNOE] = useState(32);
    const [events, setEvents] = useState([]);
    const [currentCity, setCurrentCity] = useState('See all cities');
    const [infoAlert, setInfoAlert] = useState('');
    const [errorAlert, setErrorAlert] = useState('');
    const [warningAlert, setWarningAlert] = useState('');

    useEffect(() => {
        if (navigator.onLine) {
            setWarningAlert('');
        } else {
            setWarningAlert(
                'You are offline! Note that some events may not be up to date. '
            );
        }
        fetchData();
    }, [currentCity, currentNOE]);

    const fetchData = async () => {
        const allEvents = await getEvents();
        const filteredEvents =
            currentCity === 'See all cities'
                ? allEvents
                : allEvents.filter((event) => event.location === currentCity);
        setEvents(filteredEvents.slice(0, currentNOE));
        setAllLocations(extractLocations(allEvents));
    };

    return (
        <div className='App'>
            <div className='header-wrapper'>
                <h1 className='header-title'>MeetMate</h1>
                <br></br>
                <div className='alerts-container'>
                    {infoAlert.length ? <InfoAlert text={infoAlert} /> : null}
                    {warningAlert.length ? (
                        <WarningAlert text={warningAlert} />
                    ) : null}
                    {errorAlert.length ? (
                        <ErrorAlert text={errorAlert} />
                    ) : null}
                </div>
                <CitySearch
                    allLocations={allLocations}
                    setCurrentCity={setCurrentCity}
                    setInfoAlert={setInfoAlert}
                />
                <NumberOfEvents
                    setCurrentNOE={setCurrentNOE}
                    setErrorAlert={setErrorAlert}
                />
            </div>
            <div className='content-wrapper'>
                <div className='charts-container'>
                    <CityEventsChart
                        allLocations={allLocations}
                        events={events}
                    />
                    <EventGenresChart events={events} />
                </div>
                <EventList events={events} />
            </div>
        </div>
    );
};

export default App;
