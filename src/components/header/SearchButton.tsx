
import { useState } from 'react';
import { useRouter } from 'next/navigation';


export default function SearchButton() {
const [query, setQuery] = useState('');
const [showSearch, setShowSearch] = useState(false);
const router = useRouter();


const handleSearch = (e: React.ChangeEvent<HTMLInputElement>) => setQuery(e.target.value);

const startSearch = () => {
    setShowSearch(false);
    router.push(`/search?query=${encodeURIComponent(query)}`); 
  }

    return (
        <>
                    <div className={` ${showSearch? '' : 'mobile-search-disabled'}`}>
                        <button type='button' onClick={startSearch} className={`requestSender ${showSearch? 'ActiveSender' : ''}`}>Search</button>
                        <input
                        type="text"
                        value={query}
                        onChange={handleSearch}
                        placeholder="Search..."
                        className={`search-input ${showSearch? 'ActiveSearchInput' : ''}`}
                        /> 
                    </div>

                    {/* Btn to start SearchInputfield etc. */}
                    {showSearch? 
                        '' :
                    <button type='button' onClick={() => setShowSearch(true)} className="search-btn">
                        Search 
                    </button>              
                    }
       </>
    );
}