import { searchTitle } from '../../features/filtersSlice/filtersSlice';
import { useState } from 'react';
import { useDispatch } from 'react-redux';
import { Link } from 'react-router-dom';
import logoImage from '../../assets/images/logo.svg';

export default function Navbar() {
  const [search, setSearch] = useState('');
  const dispatch = useDispatch();
  const handleSearch = (e) => {
    if (e.key === 'Enter') {
      dispatch(searchTitle(search))
    }
  }
  return (
    <nav className="container relative py-3">
      <div className="flex items-center justify-between">
        <Link to="/">
          <img src={logoImage} />
        </Link>
        <div className="flex-1 max-w-xs search-field group">
          <i className="fa-solid fa-magnifying-glass search-icon group-focus-within:text-blue-500" />
          <input onChange={(e) => setSearch(e.target.value)} type="text" placeholder="Search Task" className="search-input" id="lws-searchTask" value={search} onKeyUp={handleSearch} />
        </div>
      </div>
    </nav>
  )
}