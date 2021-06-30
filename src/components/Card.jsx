import React from 'react';

const Card = (props) => {
    //Declaration des variables:les hooks, useState... ensuite on declare les fonctions puis les jsx

    const numberFormat=(x)=>{
        return x.toString().replace(/\B(?=(\d{3})+(?!\d))/g, " ");
    }
   const {country}=props;
    return (
    
         <li className="card">
             <img src={country.flag} alt=""/>
             <div className="data-container">
                 <ul>
                     <li>{country.name}</li>
                     <li>{country.capital}</li>
                     <li>Pop.{numberFormat(country.population)}</li>
                 </ul>
             </div>

         </li>
      
    );
};

export default Card;