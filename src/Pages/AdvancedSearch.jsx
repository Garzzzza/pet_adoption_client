import React, { useState, useContext } from 'react'
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import { Pet } from '../Components/Pet';
import { SignContext } from '../Context/SignContext';
import { PetContext } from '../Context/PetContext';

const AdvancedSearch = () => {
    const navigate = useNavigate();

    const { token } = useContext(SignContext)
    const { onSearch, renderSearchResults, petType, setPetType, petAdoptionStatus, setPetAdoptionStatus, petname, setPetName, petHeight, setPetHeight, petWeight, setPetWeight, searchResultsArray, setSearchResultsArray } = useContext(PetContext)



    return (
        <div>
            <h1>Advanced Search</h1>

            <div className="formClause">
                <div className="formInputTitle">
                    Type:
                </div>
                <input
                    type="text"
                    onChange={(e) => setPetType(e.target.value)}
                    value={petType}
                />
            </div>

            <div className="formClause">
                <div className="formInputTitle">
                    Name:
                </div>
                <input
                    type="text"
                    onChange={(e) => setPetName(e.target.value)}
                    value={petname}
                />
            </div>

            <div className="formClause">
                <div className="formInputTitle">
                    Adoption Status:
                </div>
                <select
                    value={petAdoptionStatus}
                    onChange={(e) => { setPetAdoptionStatus(e.target.value) }}
                >
                    <option value="available">Available</option>
                    <option value="foster">Foster</option>
                    <option value="adopted">Adopted</option>
                </select>

            </div>

            <div className="formClause">
                <div className="formInputTitle">
                    Height:
                </div>
                <input

                    type="number"
                    onChange={(e) => setPetHeight(e.target.value)}
                    value={petHeight}
                />
            </div>

            <div className="formClause">
                <div className="formInputTitle">
                    Weight:
                </div>
                <input

                    type="number"
                    onChange={(e) => setPetWeight(e.target.value)}
                    value={petWeight}
                />
            </div>

            <div>
                <button className="formButton" onClick={onSearch}>
                    Search
                </button>
            </div>


            <div className="petsDiv">
                {renderSearchResults()}
            </div>
        </div >

    );
}

export default AdvancedSearch