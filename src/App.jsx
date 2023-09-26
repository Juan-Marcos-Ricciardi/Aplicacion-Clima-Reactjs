import { useState } from 'react'
import './App.css'
import Navbar from './components/Navbar'


export const  App = () => {
    

  
    
    const urlBase = 'https://api.openweathermap.org/data/2.5/weather'
    const API_KEY = 'b9020e37d293145125f68b364cba0dcc'
    const difKelvin = 273.15

    const [ciudad, setCiudad] = useState('')
    const [dataClima, setDataClima] = useState(null)

    const handleCambioCiudad = (e) => {
        setCiudad(e.target.value)
    }
    const handleSubmit = (e) => {
        e.preventDefault()
        if(ciudad.length > 0) fetchClima()
    }

    const fetchClima = async () => {
        try{
            const response = await fetch(`${urlBase}?q=${ciudad}&appid=${API_KEY}`)
            const data = await response.json()
            setDataClima(data)
        }catch(error){
            console.error('Ocurrió el siguiente problema: ', error)
        }
    }


  return (<>
    <Navbar/>
    <div className="container">
        <h2>Aplicación del Clima</h2>
        <form onSubmit={handleSubmit}>
            <input 
            type="text"
            placeholder='Clima en...'
            value={ciudad}
            onChange={handleCambioCiudad}
            />
            <button type="submit">Buscar</button>
        </form>  
        {
            dataClima && (
                <div>
                    <h2>{dataClima.name}</h2>
                    <p>Temperatura: {parseInt(dataClima?.main?.temp - difKelvin)}ºC</p>
                    <p>Condición meteorológica: {dataClima.weather[0].description}</p>
                    <img src={`https://openweathermap.org/img/wn/${dataClima.weather[0].icon}@2x.png`}/>
                </div>
            )
        }
    </div>
    </>
  )
  
   
   }

      

    

export default App
