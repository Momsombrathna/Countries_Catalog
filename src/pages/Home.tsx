import React, { useEffect } from 'react';
import axios from 'axios';
import { Country } from '../interfaces/CountryData'
import config from '../api/config';
import CountryCard from '../components/CountryCard';
import ReactPaginate from 'react-paginate';
import { GrFormNext } from "react-icons/gr";
import { GrFormPrevious } from "react-icons/gr";

const Home: React.FC = () => {

    // set the countries state
    const [countries, setCountries] = React.useState<Country[]>([]);

    // set sort order state
    const [activeButton, setActiveButton] = React.useState<string>('');

    // set the original countries state
    const [originalCountries, setOriginalCountries] = React.useState<Country[]>([]);

    // set pagination state
    const [currentPage, setCurrentPage] = React.useState(0);
    const itemsPerPage = 25;


    useEffect(() => {
        const fetchData = async () => {
            try {
                const response = await axios.get(`${config.apiUrl}/all`);
                setCountries(response.data);
                // console.log(response.data);
                setOriginalCountries(response.data); // store the original response data
            } catch (err) {
                console.error('Error fetching data:', err);
            }
        }

        fetchData();
    }, []);

    // Sort function for asc
    const sortAscending = () => {
        setCountries([...countries].sort((a, b) => a.name.official.localeCompare(b.name.official)));
        setActiveButton('asc');
    }

    // Sort function for desc
    const sortDescending = () => {
        setCountries([...countries].sort((a, b) => b.name.official.localeCompare(a.name.official)));
        setActiveButton('desc');
    }

    // Function reset sorting data to original data sorting
    const resetSorting = () => {
        setCountries(originalCountries);
        setActiveButton('');
    }

    // Calculate the items for the current page
    const currentItems = countries.slice(currentPage * itemsPerPage, (currentPage + 1) * itemsPerPage);

    return (
        <>
            <div className=" w-full bg-slate-300 ">
                <header className="App-header p-5 flex flex-row justify-center items-center">
                    <h1 className="text-4xl font-bold font-serif text-center text-gray-800">Countries Catalog</h1>
                </header>
                <div className='max-w-md md:px-0 px-3 mx-auto'>
                    <div className="relative flex items-center w-full h-12 rounded-lg focus-within:shadow-lg bg-white overflow-hidden">
                        <div className="grid place-items-center h-full w-12 text-gray-300">
                            <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
                            </svg>
                        </div>
                        <input
                            className="peer h-full w-full outline-none text-sm text-gray-700 pr-2"
                            type="text"
                            id="search"
                            placeholder="Search country name..." />
                    </div>
                </div>
                <div className="flex flex-col gap-2 justify-center items-center mt-5">
                    <p className="text-lg font">Sort by country name</p>
                    <div>
                        <button
                            onClick={() => sortAscending()}
                            className={`bg-sky-500 hover:bg-sky-700 text-white font-bold py-2 px-4 rounded-l ${activeButton === 'asc' ? 'bg-sky-700' : ''}`}>
                            ASC
                        </button>
                        <button
                            onClick={() => sortDescending()}
                            className={`bg-sky-500 hover:bg-sky-700 border-l-2 text-white font-bold py-2 px-4 rounded-r ${activeButton === 'desc' ? 'bg-sky-700' : ''}`}>
                            DESC
                        </button>

                        <button
                            onClick={() => resetSorting()}
                            className='bg-sky-500 ml-2 hover:bg-sky-700 text-white font-bold py-2 px-4 rounded-md'>
                            RESET
                        </button>
                    </div>
                </div>
                <div className='w-full  '>
                    <div className='container mx-auto'>
                        <div className='grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-4'>
                            {
                                currentItems.map((item) => {
                                    return (
                                        <CountryCard item={item} key={item.name.common} />
                                    )
                                })
                            }
                        </div>
                    </div>

                    <ReactPaginate
                        previousLabel={<GrFormPrevious />}
                        nextLabel={<GrFormNext />}
                        breakLabel={'..'}
                        breakClassName={'break-me'}
                        pageCount={Math.ceil(countries.length / itemsPerPage)}
                        marginPagesDisplayed={1}
                        pageRangeDisplayed={3}
                        onPageChange={({ selected }) => setCurrentPage(selected)}
                        containerClassName={'pagination flex justify-center mt-4 mb-4'}
                        pageClassName={'mx-1'}
                        pageLinkClassName={'px-2 py-1 rounded bg-white text-black hover:bg-blue-500 hover:text-white transition-colors duration-200'}
                        activeLinkClassName={'bg-blue-500 text-white'}
                        previousLinkClassName={'px-2  flex justify-center py-1 rounded text-black hover:bg-blue-500 hover:text-white transition-colors duration-200'}
                        nextLinkClassName={'px-2 py-1  flex justify-center rounded  text-black hover:bg-blue-500 hover:text-white transition-colors duration-200'}
                        disabledClassName={'opacity-50 cursor-not-allowed'}
                    />
                    <br />
                </div>
            </div>
        </>
    );
};

export default Home;