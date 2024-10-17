
'use client';

import { useState, useEffect } from 'react';
import axios from 'axios';
import { FaArrowUp, FaArrowDown } from 'react-icons/fa';
import { useReactTable, createColumnHelper, getCoreRowModel, getPaginationRowModel, getSortedRowModel, getFilteredRowModel, SortingState, flexRender } from '@tanstack/react-table';
import './ShowArticles.css';

interface Article {
  title: string;
  author: string;
  journal_name: string;
  publication_year: string;
  volume: string;
  pages: string;
  doi: string;
  se_category: string;
  claims: string;
  evidence: string;
  evidence_result: boolean;
  participant: string;
  research_type: string;
  status: string;
}

function ShowArticles() {
  const [articles, setArticles] = useState<Article[]>([]);
  const [loading, setLoading] = useState(true);
  const [activeFilters, setActiveFilters] = useState<string[]>([]);  
  const [filteredArticles, setFilteredArticles] = useState<Article[]>([]); 
  const [showFilters, setShowFilters] = useState(false); 

  useEffect(() => {
    axios.get(`http://localhost:8082/api/articles/`)
      .then(response => {
        setArticles(response.data);
        setFilteredArticles(response.data);
        setTimeout(() => {
          setLoading(false);
        }, 1500);
      })
      .catch(err => {
        console.log(err);
        setLoading(false);
      });
  }, []);

  const handleFilterToggle = (filter: string) => {
    const isActive = activeFilters.includes(filter);

    const newFilters = isActive
      ? activeFilters.filter(f => f !== filter)
      : [...activeFilters, filter];
    
    setActiveFilters(newFilters);
    
    applyFilters(newFilters);
  };

  const applyFilters = (filters: string[]) => {
    if (filters.length === 0) {
      setFilteredArticles(articles);
    } else {
      const filtered = articles.filter(article => {
        return filters.every(filter => {
          switch (filter) {
            case 'Title':
              return article.title && article.title.toLowerCase().includes(filter.toLowerCase());
            case 'Author':
              return article.author && article.author.toLowerCase().includes(filter.toLowerCase());
            case 'Journal Name':
              return article.journal_name && article.journal_name.toLowerCase().includes(filter.toLowerCase());
            case 'Publication Year':
              return article.publication_year && article.publication_year.toLowerCase().includes(filter.toLowerCase());
            case 'Volume':
              return article.volume && article.volume.toLowerCase().includes(filter.toLowerCase());
            case 'Pages':
              return article.pages && article.pages.toLowerCase().includes(filter.toLowerCase());
            case 'DOI':
              return article.doi && article.doi.toLowerCase().includes(filter.toLowerCase());
            case 'SE Category':
              return article.se_category && article.se_category.toLowerCase().includes(filter.toLowerCase());
            case 'Claims':
              return article.claims && article.claims.toLowerCase().includes(filter.toLowerCase());
            case 'Evidence':
              return article.evidence && article.evidence.toLowerCase().includes(filter.toLowerCase());
            case 'Evidence Result':
              return article.evidence_result !== null && article.evidence_result.toString().toLowerCase().includes(filter.toLowerCase());
            case 'Participant':
              return article.participant && article.participant.toLowerCase().includes(filter.toLowerCase());
            case 'Research Type':
              return article.research_type && article.research_type.toLowerCase().includes(filter.toLowerCase());
            case 'Status':
              return article.status && article.status.toLowerCase().includes(filter.toLowerCase());
            default:
              return false;
          }
        });
      });
      setFilteredArticles(filtered);
    }
  };
  

  const toggleFilterVisibility = () => {
    setShowFilters(prevState => !prevState);
  };

  const handleToggleAll = () => {
    setActiveFilters([]);
    setFilteredArticles(articles);
  };

  const columnHelper = createColumnHelper<Article>();
  
  //Filters 
  const columns = [
    columnHelper.accessor('title', {
      header: () => 'Title',
      cell: info => info.getValue(),
    }),
    columnHelper.accessor('author', {
      header: () => 'Author',
      cell: info => info.getValue(),
    }),
    columnHelper.accessor('journal_name', {
      header: () => 'Journal Name',
      cell: info => info.getValue(),
    }),
    columnHelper.accessor('publication_year', {
      header: () => 'Publication Year',
      cell: info => info.getValue(),
    }),
    columnHelper.accessor('volume', {
      header: () => 'Volume',
      cell: info => info.getValue(),
    }),
    columnHelper.accessor('pages', {
      header: () => 'Pages',
      cell: info => info.getValue(),
    }),
    columnHelper.accessor('doi', {
      header: () => 'DOI',
      cell: info => info.getValue(),
    }),
    columnHelper.accessor('se_category', {
      header: () => 'Category',
      cell: info => info.getValue(),
    }),
    columnHelper.accessor('claims', {
      header: () => 'Claims',
      cell: info => info.getValue(),
    }),
    columnHelper.accessor('evidence', {
      header: () => 'Evidence',
      cell: info => info.getValue(),
    }),
    columnHelper.accessor('evidence_result', {
      header: () => 'Evidence Result',
      cell: info => (info.getValue() ? 'True' : 'False'),
    }),
    columnHelper.accessor('participant', {
      header: () => 'Participant',
      cell: info => info.getValue(),
    }),
    columnHelper.accessor('research_type', {
      header: () => 'Research Type',
      cell: info => info.getValue(),
    }),
    columnHelper.accessor('status', {
      header: () => 'Status',
      cell: info => info.getValue(),
    }),
  ];

  const [sorting, setSorting] = useState<SortingState>([]);
  const [filtering, setFiltering] = useState<any>([]);
  const [colVisibility, setColVisibility] = useState<any>({
    volume: false,
    pages: false,
    se_category: false,
    evidence: false,
    participant: false,
  });

  const table = useReactTable({
    data: filteredArticles,
    columns,
    getCoreRowModel: getCoreRowModel(),
    getPaginationRowModel: getPaginationRowModel(),
    getFilteredRowModel: getFilteredRowModel(),
    getSortedRowModel: getSortedRowModel(),
    state: {
      sorting: sorting,
      globalFilter: filtering,
      columnVisibility: colVisibility,
    },
    onSortingChange: setSorting,
    onGlobalFilterChange: setFiltering,
    onColumnVisibilityChange: setColVisibility,
  });

  if (loading) {
    return (
      <div className='container-fluid text-center loading-screen vert-center'>
        <h3 className='text-header'>Loading articles...</h3>
        <br />
        <div className='spinner-border' role='status'>
          <span className='visually-hidden'>Loading...</span>
        </div>
      </div>
    );
  }

  return (
    <div className='container'>
      <h3 className='text-center text-header'>View all articles in SPEED</h3>
      <br />

      <div className='form-group'>
        <input
          type='text'
          value={filtering}
          onChange={e => table.setGlobalFilter(String(e.target.value))}
          placeholder='Search...'
          className='form-control search-db mb-2'
        />
      </div>

      <div>
        <button className='btn btn-outline-primary mb-2' onClick={toggleFilterVisibility}>
          {showFilters ? 'Hide Filters' : 'Show Filters'}
        </button>
        <button className='btn btn-outline-secondary mb-2 ml-2' onClick={handleToggleAll}>
          Toggle All
        </button>
      </div>

      {showFilters && (
        <div>
          <h4>Filters</h4>
          <div className='filter-tags'>
            {['Title', 'Author', 'Journal Name', 'Publication Year', 'Volume', 'Pages', 'DOI', 'SE Category', 'Claims', 'Evidence', 'Evidence Result', 'Participant', 'Research Type', 'Status'].map((filter) => (
              <span
                key={filter}
                className={`filter-tag ${activeFilters.includes(filter) ? 'active' : ''}`}
                onClick={() => handleFilterToggle(filter)}
              >
                {filter}
              </span>
            ))}
          </div>
        </div>
      )}

      <div className='table-container'>
        <table className='table table-sm table-hover'>
          <thead>
            {table.getHeaderGroups().map(headerGroup => (
              <tr key={headerGroup.id}>
                {headerGroup.headers.map(header => (
                  <th
                    key={header.id}
                    onClick={header.column.getToggleSortingHandler()}
                    className='theader'
                  >
                    <div style={{ display: 'inline-flex', alignItems: 'center' }}>
                      {header.isPlaceholder ? null : flexRender(header.column.columnDef.header, header.getContext())}
                      {{
                        asc: <FaArrowDown size={16} className='arrows' />,
                        desc: <FaArrowUp size={16} className='arrows' />,
                      }[header.column.getIsSorted() as string] ?? null}
                    </div>
                  </th>
                ))}
              </tr>
            ))}
          </thead>
          <tbody>
            {table.getRowModel().rows.map(row => (
              <tr key={row.id}>
                {row.getVisibleCells().map(cell => (
                  <td key={cell.id}>
                    {flexRender(cell.column.columnDef.cell, cell.getContext())}
                  </td>
                ))}
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
