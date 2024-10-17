'use client';

import { 
    useReactTable, 
    getCoreRowModel, 
    flexRender, 
    createColumnHelper,
    getPaginationRowModel,
    getSortedRowModel,
    SortingState,
    getFilteredRowModel,
} from '@tanstack/react-table';
import React, { useState, useEffect, useMemo } from 'react';
import { FaArrowUp, FaArrowDown } from 'react-icons/fa';
import Link from 'next/link';
import axios from 'axios';
import './ShowArticles.css';

interface Article {
    title: string;
    author: string;
    journal_name: string;
    publication_year: string;
    volume: string;
    pages: string;
    doi: string;

    se_relevancy: boolean;
    se_category: string;
    peer_reviewed: boolean;
    moderation_flag: boolean;

    claims: string;
    evidence: string;
    evidence_result: boolean;
    participant: string;
    research_type: string;
    analysis_flag: boolean;

    rejection_reason: string;
    status: string;
    updated_date: Date;
}

function ShowArticles() {
    const [articles, setArticles] = useState<Article[]>([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        axios.get(`http://localhost:8082/api/articles/`)
        .then(response => {
            setArticles(response.data);
            setTimeout(() => {
                setLoading(false);
            }, 1500);
        })
        .catch(err => {
            console.log(err);
            setLoading(false);
        });
    }, []);

    const data = useMemo(() => articles, [articles]);
    const columnHelper = createColumnHelper<Article>();
    const columns = [
        columnHelper.accessor('title', {
            header: () => 'Title',
            cell: (info) => info.getValue(),
        }),
        columnHelper.accessor('author', {
            header: () => 'Author',
            cell: (info) => info.getValue(),
        }),
        columnHelper.accessor('journal_name', {
            header: () => 'Journal Name',
            cell: (info) => info.getValue(),
        }),
        columnHelper.accessor('publication_year', {
            header: () => 'Publication Year',
            cell: (info) => info.getValue(),
        }),
        columnHelper.accessor('volume', {
            header: () => 'Volume',
            cell: (info) => info.getValue(),
        }),
        columnHelper.accessor('pages', {
            header: () => 'Pages',
            cell: (info) => info.getValue(),
        }),
        columnHelper.accessor('doi', {
            header: () => 'DOI',
            cell: (info) => info.getValue(),
        }),
        columnHelper.accessor('se_category', {
            header: () => 'Category',
            cell: (info) => info.getValue(),
        }),
        columnHelper.accessor('claims', {
            header: () => 'Claims',
            cell: (info) => info.getValue(),
        }),
        columnHelper.accessor('evidence', {
            header: () => 'Evidence',
            cell: (info) => info.getValue(),
        }),
        columnHelper.accessor('evidence_result', {
            header: () => 'Evidence Result',
            cell: (info) => info.getValue(),
        }),
        columnHelper.accessor('participant', {
            header: () => 'Type of Participant',
            cell: (info) => info.getValue(),
        }),
        columnHelper.accessor('research_type', {
            header: () => 'Type of Research',
            cell: (info) => info.getValue(),
        }),
        columnHelper.accessor('status', {
            header: () => 'Status',
            cell: (info) => info.getValue(),
        }),
    ]


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
        data, 
        columns, 
        getCoreRowModel: getCoreRowModel(),
        getPaginationRowModel: getPaginationRowModel(),
        getFilteredRowModel: getFilteredRowModel(),
        getSortedRowModel: getSortedRowModel(),
        globalFilterFn: 'includesString',
        state: {
            sorting: sorting,
            globalFilter: filtering,
            columnVisibility: colVisibility,
        },
        onSortingChange: setSorting,
        onGlobalFilterChange: setFiltering,
        onColumnVisibilityChange: setColVisibility,
    });

    const [dropdownOpen, setDropdownOpen] = useState(false);
    const toggleDropdown = () => {
        setDropdownOpen((prev) => !prev);
    }

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

    if (articles.length === 0) {
        return (
            <div className='container-fluid text-center vert-center'>
                <h3 className='text-header'>There are currently no articles in SPEED.</h3>
                <br />
                <Link href='/submit' className='btn btn-primary btn-lg'>Submit an article</Link>
            </div>
            
        );
    } else {
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
                        className="form-control search-db mb-2"
                    />
                </div>

                <div>
                    <button onClick={toggleDropdown} className='btn btn-outline-primary'>
                        {dropdownOpen ? 'Hide Filters' : 'Show Filters'}
                    </button>

                    {dropdownOpen && (
                        <div className='dropdown filters'>
                            <label className='mr-2'>
                                <input 
                                    {...{
                                        type: 'checkbox',
                                        checked: table.getIsAllColumnsVisible(),
                                        onChange: table.getToggleAllColumnsVisibilityHandler(),
                                    }}
                                />{' '}
                                Toggle All
                            </label>
                            {table.getAllLeafColumns().map(column => {
                                return (
                                    <label key={column.id} className='px-1 mr-2'>
                                        <input 
                                            {...{
                                                type: 'checkbox',
                                                checked: column.getIsVisible(),
                                                onChange: column.getToggleVisibilityHandler(),
                                            }}
                                        />{' '}
                                        {column.id}
                                    </label>
                                )
                            })}
                        </div>
                    )}
                    <br /><br />
                </div>

                <table className='table table-sm table-hover'>
                    <thead>
                        {table.getHeaderGroups().map(headerGroup => (
                            <tr key={ headerGroup.id }>
                                { headerGroup.headers.map(header => (
                                    <th 
                                        key={ header.id } 
                                        onClick={header.column.getToggleSortingHandler()}
                                        className='theader'
                                    >
                                        <div style={{ display: 'inline-flex', alignItems: 'center' }}>
                                            {flexRender(
                                                header.column.columnDef.header,
                                                header.getContext()
                                            )}
                                            {
                                                {asc: <FaArrowDown size={16} className='arrows'/>, 
                                                 desc: <FaArrowUp size={16} className='arrows'/>}
                                                [header.column.getIsSorted() as string] ?? null
                                            }
                                        </div>
                                    </th>
                                ))}
                            </tr>
                        ))}
                    </thead>
                    <tbody>
                        {table.getRowModel().rows.map(row => (
                            <tr key={ row.id }>
                                {row.getVisibleCells().map(cell => (
                                    <td key={ cell.id }>
                                        {flexRender(
                                            cell.column.columnDef.cell, 
                                            cell.getContext())}
                                    </td>
                                ))}
                            </tr>
                        ))}
                    </tbody>
                </table>
                <div>
                    <button onClick={() => table.setPageIndex(0)} className='btn btn-sm btn-outline-secondary mr-2'>&lt;&lt;</button>
                    <button disabled={!table.getCanPreviousPage()} onClick={() => table.previousPage()} className='btn btn-sm btn-outline-secondary mr-2'>&lt;</button>
                    <button disabled={!table.getCanNextPage()} onClick={() => table.nextPage()} className='btn btn-sm btn-outline-secondary mr-2'>&gt;</button>
                    <button onClick={() => table.setPageIndex(table.getPageCount() - 1)} className='btn btn-sm btn-outline-secondary mr-2'>&gt;&gt;</button>
                    <span className="flex items-center gap-1">
                    <div className='ml-8 mt-2'>Page</div>
                        <strong className='mt-2'>
                            {table.getState().pagination.pageIndex + 1} of{' '}
                            {table.getPageCount()}
                        </strong>
                    </span>
                </div>
            </div>
        );
    }
}

export default ShowArticles;