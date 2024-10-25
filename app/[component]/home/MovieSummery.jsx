'use client';
import Image from "next/image";
import { Tab, TabList, TabPanel, Tabs } from "react-tabs";
import { BsExclamationCircle } from "react-icons/bs";
import { useState } from "react";
import 'react-tabs/style/react-tabs.css';

const MovieSummery = ({data, cast}) => {
    const [showReport, setShowReport] = useState(false); 
    const handleReportClick = () => {
        setShowReport(!showReport);
    };


   
    
    return (
        <div className=" text-white px-2 md:px-4 pt-4 pb-12 mt-12">
            <h1 className="text-2xl">Movie Specification & Summary</h1>

            <Tabs>
                <TabList className="flex space-x-4 mt-12">
                    <Tab className="py-2 px-4 cursor-pointer text-white hover:bg-yellow-500 hover:text-gray-900 transition-all duration-300">
                        Summary
                    </Tab>
                    <Tab className="py-2 md:px-4 cursor-pointer text-white hover:bg-yellow-500 hover:text-gray-900 transition-all duration-300">
                        Specification
                    </Tab>
                    <Tab className="py-2 md:px-4 cursor-pointer text-white hover:bg-yellow-500 hover:text-gray-900 transition-all duration-300">
                        Cast
                    </Tab>
                </TabList>

               
                <TabPanel>
                    <h2 className="px-4 md:px-8 py-4">{data?.overview}</h2>
                </TabPanel>

               
                <TabPanel>
                    <div className="px:2 md:px-8 py-4">
                        <table className="w-full table-auto border-collapse border border-gray-300">
                            <tbody>
                             
                                
                                    <tr >
                                        <td className="p-2 bg-gray-900 border-r  w-1/3">
                                           Title
                                        </td>
                                        <td className="p-2  bg-gray-900 w-2/3">
                                           {data?.original_title}
                                        </td>
                                    </tr>
                                    <tr >
                                        <td className="p-2   border-r w-1/3">
                                       Runtime
                                        </td>
                                        <td className="p-2  w-2/3">
                                           {data?.runtime} Mintue
                                        </td>
                                    </tr>
                                    <tr >
                                        <td className="p-2 bg-gray-900 border-r  w-1/3">
                                        Language
                                        </td>
                                        <td className="p-2  bg-gray-900 w-2/3">
                                           {data?.original_language}
                                        </td>
                                    </tr>
                                    <tr >
                                        <td className="p-2 b border-r  w-1/3">
                                      Rating
                                        </td>
                                        <td className="p-2   w-2/3">
                                           {data?.vote_average}
                                        </td>
                                    </tr>
                                    <tr >
                                        <td className="p-2 bg-gray-900 border-r  w-1/3">
                                        Status
                                        </td>
                                        <td className="p-2  bg-gray-900 w-2/3">
                                           {data?.status}
                                        </td>
                                    </tr>
                                    <tr >
                                        <td className="p-2  border-r  w-1/3">
                                    Vote
                                        </td>
                                        <td className="p-2   w-2/3">
                                           {data?.vote_count
                                        }
                                        </td>
                                    </tr>
                                    <tr >
                                        <td className="p-2  border-r bg-gray-900  w-1/3">
                                       Released Date
                                        </td>
                                        <td className="p-2 bg-gray-900  w-2/3">
                                        {data?.release_date
                                        }
                                        </td>
                                    </tr>
                            </tbody>
                        </table>
                    </div>
                </TabPanel>

            


            
                <TabPanel>
                <div className="grid px-2 md:px-6 grid-cols-2 md:grid-cols-3 mt-12 gap-8">

{
    cast?.cast.map((cast,idx) => 
    
    
    <div key={idx} className="flex items-center gap-5">

<div className="">

    <Image width={50} height={50} alt={cast?.name} src={`http://image.tmdb.org/t/p/w500/${cast?.profile_path}`}/>
</div>

<div className="space-y-1">
<p>{cast?.name}</p>
<p className="text-sm text-gray-400">{cast?.character}</p>
</div>
    </div>)
}
</div>
                </TabPanel>
            </Tabs>

            <h1
                className={`text-red-600 text-center mt-6 border-b border-t pt-4 pb-6 cursor-pointer flex justify-center ${showReport && "border-none"} gap-4 items-center`}
                onClick={handleReportClick}
            >
                <BsExclamationCircle /> Report incorrect information
            </h1>

            {showReport && (
                <div className="mt-4">
                    <textarea
                        className="w-full bg-gray-900 border-0 p-3 border rounded focus:border-yellow-500 outline-none"
                        rows={4}
                        placeholder="Describe the incorrect information..."
                    />
                    <button
                        className="bg-yellow-500 text-white px-4 py-2 rounded mt-2"
                    >
                        Submit
                    </button>
                </div>
            )}
        </div>
    );
};

export default MovieSummery;
