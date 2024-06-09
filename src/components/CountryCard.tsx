
import { Country } from '../interfaces/CountryData';
import { useState } from 'react';


const CountryCard = ({ item }: { item: Country }) => {

    // destructure the country object
    const { name, flags, cca2, cca3, region, idd, altSpellings } = item;

    // dialog popup state
    const [isOpen, setIsOpen] = useState(false);

    return (
        <>
            <div className='inline-block m-4'>
                <div className="max-w-md bg-white/30 rounded-xl overflow-hidden transition-colors duration-500">

                    <div className="p-4">
                        <div className='flex justify-start items-start'>
                            <img src={flags.png} alt="" className=' w-full h-44 md:h-32 object-cover rounded-md' />
                        </div>

                        <div className='flex flex-col mt-3'>
                            <p className='text-lg text-gray-800 font-bold overflow-hidden overflow-ellipsis whitespace-nowrap max-w-[400px]'>{name.official}</p>
                            <p className="text-sm text-gray-700 "><span className='font-bold'>Region:</span> {region}</p>
                            <p className="text-sm text-gray-700"><span className='font-bold'>CCA2: </span>{cca2}</p>
                            <p className="text-sm text-gray-700"><span className='font-bold'>CCA3:</span> {cca3}</p>
                        </div>

                        <div className='flex flex-col'>
                            <div className='text-sm text-gray-700 flex flex-row gap-1'>
                                <p className='font-bold'>IDD:</p>
                                <p className='overflow-hidden overflow-ellipsis whitespace-nowrap max-w-[200px]'> root({idd.root}), suffixes({idd.suffixes})</p>
                            </div>
                        </div>

                        <div className='mt-3'>
                            <button
                                onClick={() => setIsOpen(true)}
                                className=' w-full h-10 rounded-md drop-shadow-md text-white bg-sky-500 hover:bg-sky-700'>
                                Show Details
                            </button>
                        </div>
                        {isOpen && (
                            <div className="fixed inset-0 flex items-center justify-center z-50">
                                <div className="absolute inset-0 bg-black opacity-50"></div>
                                <div className="backdrop-blur-xl bg-white/30 rounded-lg shadow-2xl p-3 m-4 sm:w-full md:w-1/2 lg:w-1/3 xl:w-1/4 text-center relative z-10">
                                    <div className='flex flex-row justify-start gap-2 items-start'>
                                        <img src={flags.png} alt="" className=' h-32 w-60 object-cover rounded-md' />
                                        <div className='flex flex-col justify-start items-start'>
                                            <h3 className=' font-bold'>Native Name</h3>
                                            <p className='text-sm text-gray-700 overflow-hidden '>
                                                {Object.entries(name.nativeName).map(([key], index) => (
                                                    <div key={index}>
                                                        <div className='flex justify-start items-start'>
                                                            <span className='font-bold'>{key}:</span>
                                                            &nbsp;<p className='text-left'>{name.nativeName[key].official}</p>
                                                        </div>
                                                    </div>
                                                ))}

                                            </p>
                                        </div>
                                    </div>
                                    <div className='flex flex-col mt-1 justify-start items-start'>
                                        <p className='text-lg text-gray-800 text-left font-bold'>{name.official}</p>
                                        <p className="text-sm text-gray-700 "><span className='font-bold'>Region:</span> {region}</p>
                                        <p className="text-sm text-gray-700 "><span className='font-bold'>CCA2:</span> {cca2}</p>
                                        <p className="text-sm text-gray-700 "><span className='font-bold'>CCA3:</span> {cca3}</p>
                                        <p className='text-sm text-gray-700 text-left'><span className='font-bold'>Alternative Spellings:</span> {altSpellings}</p>
                                        <p className="text-sm text-gray-700 "><span className='font-bold'>IDD Root:</span> {idd.root}</p>
                                        <p className="text-sm text-gray-700 "><span className='font-bold'>IDD Suffixes:</span> {idd.suffixes}</p>
                                    </div>
                                    <button
                                        className="px-3 py-1 mt-2 text-white bg-sky-500 hover:bg-sky-700 rounded"
                                        onClick={() => setIsOpen(false)}
                                    >
                                        Got it, thanks
                                    </button>
                                </div>
                            </div>
                        )}
                    </div>
                </div>
            </div>
        </>
    );
};

export default CountryCard;