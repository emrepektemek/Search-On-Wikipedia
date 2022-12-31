import axios from 'axios';

export async function getEvents(day,month){

    const url = `https://byabbe.se/on-this-day/${month}/${day}/events.json`
    const response = await axios.get(url);
    
    return response.data.events;
}

export async function getBirths(day,month){

    const url = `https://byabbe.se/on-this-day/${month}/${day}/births.json`
    const response = await axios.get(url);
    
    return response.data.births;
}

export async function getDeaths(day,month){

    const url = `https://byabbe.se/on-this-day/${month}/${day}/deaths.json`
    const response = await axios.get(url);
    
    return response.data.deaths;
}
