import React from 'react';

const Search = ({search, handleSearch}) => {
    return (
        <>
            filter shown with text : <input value={search} onChange={handleSearch}/>
        </>
    );
};

export default Search;