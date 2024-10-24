'use client';
import Image from "next/image";
import { Tab, TabList, TabPanel, Tabs } from "react-tabs";
import { BsExclamationCircle } from "react-icons/bs";
import { useState } from "react";
import 'react-tabs/style/react-tabs.css';

const MovieSummery = ({data}) => {
    const [showReport, setShowReport] = useState(false); 
    const handleReportClick = () => {
        setShowReport(!showReport);
    };
    const product = {
        _id: "afs452g2df2dgfd2dg",
        image: "https://example.com/product-cover.jpg", 
        productName: "The Great Adventure",
        author: "John Doe",
        publication: "Adventure Publishing",
        category: "Fiction",
        price: 599,
        discount: 10, // in percentage
        stockStatus: "In Stock",
        productLength: 350, // in pages
        isbn: "978-3-16-148410-0",
        edition: 2024,
        country: "Bangladesh",
        language: "English",
        available: 16,
        summary:
          "An epic tale of courage, discovery, and survival as a group of explorers embark on a journey to unknown lands, overcoming extraordinary challenges.",
        authorDetails:
          "John Doe is a renowned author and explorer, having traveled to over 50 countries and written multiple bestsellers. His works often explore the boundaries of human experience, blending adventure with philosophical insights.",
        promoCode: true,
        authorPhoto: "https://example.com/product-cover.jpg",
        authorFollower: 34,
        myRetting: 2,
        avgRating: 3,
    };
    
    return (
        <div className=" text-white px-4 pt-4 pb-12 mt-12">
            <h1 className="text-2xl">Movie Specification & Summary</h1>

            <Tabs>
                <TabList className="flex space-x-4 mt-8">
                    <Tab className="py-2 px-4 cursor-pointer text-white hover:bg-yellow-500 hover:text-gray-900 transition-all duration-300">
                        Summary
                    </Tab>
                    <Tab className="py-2 px-4 cursor-pointer text-white hover:bg-yellow-500 hover:text-gray-900 transition-all duration-300">
                        Specification
                    </Tab>
                    
                </TabList>

                {/* Summary Tab */}
                <TabPanel>
                    <h2 className="px-8 py-4">{data?.overview}</h2>
                </TabPanel>

                {/* Specification Tab */}
                <TabPanel>
                    <div className="px-8 py-4">
                        <table className="w-full table-auto border-collapse border border-gray-300">
                            <tbody>
                                {/* Table rows */}
                                
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
                                        Status
                                        </td>
                                        <td className="p-2  bg-gray-900 w-2/3">
                                           {data?.status}
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
                            </tbody>
                        </table>
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
