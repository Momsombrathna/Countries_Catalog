import React, { useEffect } from 'react';
import axios from 'axios';
import { Country } from '../interfaces/CountryData'
import config from '../api/config';
import CountryCard from '../components/CountryCard';
import ReactPaginate from 'react-paginate';
import { GrFormNext } from "react-icons/gr";
import { GrFormPrevious } from "react-icons/gr";
import AnimationSearch from "../assets/AnimationSearch.json";
import Lottie from 'lottie-react';


const Home: React.FC = () => {

    const [countries, setCountries] = React.useState<Country[]>([]);
    const [activeButton, setActiveButton] = React.useState<string>('');
    const [searchTerm, setSearchTerm] = React.useState<string>('');
    const [loading, setLoading] = React.useState<boolean>(true);
    const [originalCountries, setOriginalCountries] = React.useState<Country[]>([]);
    const [currentPage, setCurrentPage] = React.useState(0);
    const itemsPerPage = 25;

    function fuzzySearch(searchTerm: string, data: Country[]) {
        const regex = new RegExp(searchTerm.split('').join('.*'), 'i');
        return data.filter((item) => regex.test(item.name.official));
    }


    useEffect(() => {
        const fetchData = async () => {
            setLoading(true);
            try {
                const response = await axios.get(`${config.apiUrl}/all`);
                if (response.data) {
                    setCountries(response.data);
                    setOriginalCountries(response.data);
                    setLoading(false);
                } else {
                    console.error('Error fetching data:', response);
                }
            } catch (err) {
                console.error('Error fetching data:', err);
            }
        }

        fetchData();
    }, []);

    console.log(countries);


    useEffect(() => {
        setLoading(true);
        if (searchTerm) {
            setLoading(false);
            const results = fuzzySearch(searchTerm, originalCountries);
            setCountries(results);
        } else {
            setLoading(false);
            setCountries(originalCountries);
        }
    }, [searchTerm, originalCountries]);

    const sortAscending = () => {
        setCountries([...countries].sort((a, b) => a.name.official.localeCompare(b.name.official)));
        setActiveButton('asc');
    }

    const sortDescending = () => {
        setCountries([...countries].sort((a, b) => b.name.official.localeCompare(a.name.official)));
        setActiveButton('desc');
    }

    const resetSorting = () => {
        setCountries(originalCountries);
        setActiveButton('');
    }

    const currentItems = countries.slice(currentPage * itemsPerPage, (currentPage + 1) * itemsPerPage);

    return (
        <>
            <div className=" w-full bg-gradient-to-r from-blue-300 to-purple-500 ">
                <header className="App-header p-5 flex flex-row justify-center items-center">
                    <h1 className="text-4xl font-bold font-monos text-center text-gray-800">Countries Catalog</h1>
                </header>
                <div className='max-w-md md:px-0 px-3 mx-auto'>
                    <div className="relative flex items-center w-full h-12 rounded-lg focus-within:shadow-lg bg-white overflow-hidden">
                        <div className="grid place-items-center h-full w-12 text-gray-300">
                            {loading || countries.length === 0 ? (
                                <div className="animate-spin">
                                    <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 text-gray-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 19l-7-7m0 0l-7 7m7-7V5" />
                                    </svg>
                                </div>
                            ) : (fuzzySearch(searchTerm, originalCountries).length > 0 ? (
                                <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 text-gray-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 19l-7-7m0 0l-7 7m7-7V5" />
                                </svg>
                            ) : null
                            )}
                        </div>
                        <input
                            className="peer h-full w-full outline-none text-sm text-gray-700 pr-2"
                            type="text"
                            id="search"
                            value={searchTerm}
                            onChange={(e) => setSearchTerm(e.target.value)}
                            placeholder="Search country name..." />
                    </div>
                </div>
                <div className="flex flex-col gap-2 justify-center items-center mt-5">
                    <p className="text-lg  font-monos">Sort by country name</p>
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
                    <div className='container mx-auto h-auto'>
                        {loading || countries.length === 0 ? (
                            <div className="flex justify-center items-center min-h-screen">
                                <Lottie
                                    animationData={AnimationSearch}
                                    className='w-48 md:w-56 lg:w-72 xl:w-96'
                                />
                            </div>
                        ) : (

                            <div className='grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-4 min-h-screen'>
                                {
                                    currentItems.map((item, index) => {
                                        return (
                                            <CountryCard item={item} key={index} />
                                        )
                                    })
                                }

                            </div>
                        )}
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
                        activeClassName={'activePage'}
                    />
                    <br />
                </div>
            </div>

        </>
    );
};

export default Home;