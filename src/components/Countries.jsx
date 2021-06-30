import React, { useEffect, useState } from 'react';
import axios from "axios";
import Card from "../components/Card";


const Countries = () => {
    const [data, setData]=useState([]);

    const [sortedData, setSortedData]= useState([]);
    //Pour eviter que les données generées par l'API ne soient pas infinies; on declare cç et on fait un if 
    const [playOnce, setPlayOnce]= useState(true);

    //Fiare des recherches
    const [rangeValue, setRangeValue]=useState([40]);

    //Pour le pays selectionné
    const [selectedRadio, setSelectedRadio]=useState('');
    const radios=["Africa", "America", "Asia", "Europe", "Oceania"];

    //Puis on mappe les différents noms de la variable radios pour créer des inputs
    
    useEffect(
        ()=>{
            if(playOnce){
            axios.get('https://restcountries.eu/rest/v2/all?fields=name;population;region;capital;flag').then(
        (response)=>{
            setData(response.data);
            //On evite l'appel en permanence
            setPlayOnce(false);
        });
    }        
    //Trier les pays par ordre alpha

              const sortedCountry=()=>{
                  const countryObject= Object.keys(data).map((i)=>data[i]);
                      const sortedArray= countryObject.sort(
                          //Tri decroissant
                          (a,b)=>{return b.population-a.population}
                      );
                      console.log(sortedArray);
                      sortedArray.length=rangeValue;
                     setSortedData(sortedArray);
              };
              sortedCountry();
        },[data, rangeValue,playOnce]);
    return (
        <div className="countries">
            <div className="sort-container">
                <input type="range" min="1" max="250"
                 value={rangeValue} 
                  onChange={(e)=> setRangeValue(e.target.value) } />

                  <ul>
                      {radios.map(
                          (radio)=>{return(
                              <li key={radio}>
                                  <input type="radio" value={radio} id={radio} checked={
                                  (radio===selectedRadio)} onChange={(e)=>setSelectedRadio(e.target.value)} />

                                  <label htmlFor={radio}>{radio}</label>
                              </li>
                          );
                        })}
                  </ul>
            </div>
            {/* Un bouton pour annuler la recherche */}
            <div className="cancel">
                {selectedRadio && <h5 onClick={()=>setSelectedRadio("")}>Annuler la recherche</h5>}
            </div>
            <ul className="countries-list">
                
                {sortedData
                .filter(
                    (country)=>country.region.includes(selectedRadio)
                )
                .map(
                    (country)=>(<Card country={country} key={country.name}/>
                    ))}
                   
            </ul>
            
            
        </div>
    );
};

export default Countries;