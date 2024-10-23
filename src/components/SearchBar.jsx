import React, { useState, useRef, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { Form, Badge, Spinner } from 'react-bootstrap';
import { Search } from 'lucide-react';
import TypesenseInstantSearchAdapter from "typesense-instantsearch-adapter";
import { InstantSearch, SearchBox, Hits, Configure } from 'react-instantsearch';

// Initialize Typesense client
const typesenseInstantsearchAdapter = new TypesenseInstantSearchAdapter({
  server: {
    apiKey: "PX3rVhVppZRL4RPUQ9AMD9ulGy19oq9lNn8NTcUK9GUzXyT1",
    nodes: [
      {
        host: "192.168.248.212",
        port: "8108",
        protocol: "http"
      },
    ],
  },
  additionalSearchParameters: {
    query_by: "SN,NS",
    filter_by: "EC:[NSE,BSE]"
  }
});
// http://192.168.248.212/
// 148.100.79.158

const searchClient = typesenseInstantsearchAdapter.searchClient;

const Hit = ({ hit, onSelect }) => (
  <div 
    className="list-group-item list-group-item-action"
    onClick={() => onSelect(hit)}
    style={{ cursor: 'pointer' }}
  >
    <div className="d-flex justify-content-between align-items-center">
      <div>
        <div className="fw-medium">{hit.SN}</div>
        <div className="text-secondary small">
          <span className="me-2">{hit.NS}</span>
          <Badge bg={hit.EC === 'NSE' ? 'primary' : 'danger'}>
            {hit.EC}
          </Badge>
        </div>
      </div>
    </div>
  </div>
);

const CustomSearchBox = ({ currentRefinement, refine }) => (
  <div className="position-relative">
    <Form.Control
      type="text"
      placeholder="Search stocks (e.g., WIPRO)"
      value={currentRefinement}
      onChange={e => refine(e.target.value)}
      className="form-control-lg"
      style={{ paddingLeft: '40px' }}
    />
    <Search 
      className="position-absolute" 
      style={{ 
        left: '12px', 
        top: '50%', 
        transform: 'translateY(-50%)',
        color: '#6c757d',
        width: '20px',
        height: '20px'
      }}
    />
  </div>
);

const StockSearch = () => {
  const [isOpen, setIsOpen] = useState(false);
  const dropdownRef = useRef(null);
  const navigate = useNavigate();

  const [theme, setTheme] = useState(window.matchMedia && window.matchMedia('(prefers-color-scheme: dark)').matches ? 'dark' : 'light');

  useEffect(() => {
    const mediaQuery = window.matchMedia('(prefers-color-scheme: dark)');
    const handleChange = (e) => setTheme(e.matches ? 'dark' : 'light');
    
    mediaQuery.addEventListener('change', handleChange);
    
    return () => {
      mediaQuery.removeEventListener('change', handleChange);
    };
  }, [theme]);

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        setIsOpen(false);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  const handleSelect = (hit) => {
    const trade = {
      SN: hit.SN,
      NS: hit.NS,
      EC: hit.EC,
      Stock_Tocken: hit.Stock_Tocken
    };
    console.log(trade);
    navigate('/trade/tradepage', { state: { trade } });
    setIsOpen(false);
  };

  return (
    <div className="position-relative" ref={dropdownRef} style={{ maxWidth: '500px' }}>
      <style>{`
      .ais-SearchBox {
        width: 100%;
        max-width: 600px;
        margin: 0 auto;
      }
      .ais-SearchBox-form {
        position: relative;
        display: flex;
        align-items: center;
        width: 100%;
      }

      .ais-SearchBox-input {
        width: 100%;
        height: 40px;
        padding: 8px 40px;
        border: 1px solid #e2e8f0;
        border-radius: 8px;
        font-size: 16px;
        color: #1a202c;
        background-color: white;
        transition: all 0.2s ease;
      }

      .ais-SearchBox-input:focus {
        outline: none;
        border-color: #3b82f6;
        box-shadow: 0 0 0 3px rgba(59, 130, 246, 0.2);
      }

      .ais-SearchBox-input::placeholder {
        color: #a0aec0;
      }

      .ais-SearchBox-submit,
      .ais-SearchBox-reset {
        position: absolute;
        top: 50%;
        transform: translateY(-50%);
        border: none;
        background: none;
        padding: 6px;
        cursor: pointer;
        color: #64748b;
        transition: color 0.2s ease;
      }

      .ais-SearchBox-submit:hover,
      .ais-SearchBox-reset:hover {
        color: #1a202c;
      }

      .ais-SearchBox-submit {
        left: 8px;
      }

      .ais-SearchBox-reset {
        right: 8px;
      }

      .ais-SearchBox-submitIcon,
      .ais-SearchBox-resetIcon {
        width: 16px;
        height: 16px;
        fill: currentColor;
      }

      .ais-SearchBox-loadingIndicator {
        position: absolute;
        right: 40px;
        top: 50%;
        transform: translateY(-50%);
      }

      .ais-SearchBox-loadingIcon {
        width: 16px;
        height: 16px;
        animation: spin 1s linear infinite;
      }

      @keyframes spin {
        from {
          transform: rotate(0deg);
        }
        to {
          transform: rotate(360deg);
        }
      }
      `}</style>
      
      <InstantSearch
        searchClient={searchClient}
        indexName="intstruments"
      >
        <Configure hitsPerPage={10} />
        <SearchBox
          component={CustomSearchBox}
          onFocus={() => setIsOpen(true)}
        />
        
        {isOpen && (
          <div className={"position-absolute w-100 mt-1 rounded shadow border "+ (theme === 'dark' ? 'border-dark bg-dark text-light' : 'border-light bg-light')}
               style={{ 
                 maxHeight: '400px', 
                 overflowY: 'auto', 
                 zIndex: 1000 
               }}>
            <Hits
              hitComponent={({ hit }) => (
                <Hit hit={hit} onSelect={handleSelect} />
              )}
            />
          </div>
        )}
      </InstantSearch>
    </div>
  );
};

export default StockSearch;