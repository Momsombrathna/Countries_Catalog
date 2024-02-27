
import { Country } from '../interfaces/CountryData';


const CountryCard = ({ item }: { item: Country }) => {

    const { name, flags, cca2, cca3, idd, altSpellings } = item;

    return (
        <>
            <div className='inline-block m-4'>
                <div className="max-w-md bg-slate border-2 border-gray-300 rounded-xl overflow-hidden transition-colors duration-500">

                    <div className="p-4">
                        <div className='flex justify-start items-start'>
                            <img src={flags.png} alt="" className=' w-full h-44 md:h-32 object-cover rounded-md' />
                        </div>

                        <div className='flex flex-col mt-3'>
                            <p className='text-lg text-gray-800 font-bold overflow-hidden overflow-ellipsis whitespace-nowrap max-w-[200px]'>{name.official}</p>
                            <p className="text-sm text-gray-700 font-bold">cca2: {cca2}</p>
                            <p className="text-sm text-gray-700 font-bold">cca3: {cca3}</p>
                            <p className='text-sm text-gray-700 overflow-hidden overflow-ellipsis whitespace-nowrap max-w-[200px]'>
                                {/* {Object.entries(name.nativeName).map(([key], index) => (
                                    <div key={index}>
                                        <div className='flex flex-row gap-1'>
                                            <p className='font-bold'>{key} :</p>
                                            <p>{name.nativeName[key].official}</p>
                                        </div>
                                    </div>
                                ))} */}

                            </p>
                        </div>

                        <div className='flex flex-col mt-1'>
                            <p className="text-sm mb-1 text-gray-700">
                                <div className='flex flex-row gap-1'>
                                    <p className='font-bold'>altSpellings:</p>
                                    <p className='overflow-hidden overflow-ellipsis whitespace-nowrap max-w-[200px]'> {altSpellings}</p>
                                </div>
                            </p>
                            <div className='text-sm text-gray-700 flex flex-row gap-1'>
                                <p className='font-bold'>idd:</p>
                                <p className='overflow-hidden overflow-ellipsis whitespace-nowrap max-w-[200px]'> root({idd.root}), suffixes({idd.suffixes})</p>
                            </div>
                        </div>

                        <div className='mt-3'>
                            <button className=' w-full h-10 rounded-md drop-shadow-md text-white bg-sky-500'>
                                Show Details
                            </button>
                        </div>
                    </div>

                </div>
            </div>
        </>
    );
};

export default CountryCard;