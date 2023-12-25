import React, { useState, useContext, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

import axios from 'axios';
import { SignContext } from "../Context/SignContext"
import { Pet } from '../Components/Pet';
import { PetContext } from '../Context/PetContext';


const Search = () => {
    const navigate = useNavigate();

    const { token } = useContext(SignContext)
    const { petType, setPetType, searchResultsArray, setSearchResultsArray, onSearch, renderSearchResults } = useContext(PetContext)


    useEffect(() => {
        setSearchResultsArray([])
    }, [])

    const goToAdvancedSearch = () => {
        try {
            navigate("/advancedsearch")
        } catch (error) {
            console.log('Error:', error);
        }
    }



    return (
        <div>

            <h1>Search by pet type</h1>
            <div className="searchDiv">
                <input
                    type="text"
                    onChange={(e) => setPetType(e.target.value)}
                    value={petType}
                />
                <button className="formButton" onClick={onSearch}>
                    Search
                </button>
            </div>
            <div>
                <button className="formButton" onClick={goToAdvancedSearch}>
                    Go to Advanced Search
                </button>
            </div>
            <div className="petsDiv">
                {renderSearchResults()}
            </div>
        </div>

    );
};

export default Search;
