
import { IconArrowLeft, IconArrowRight, IconSearch, IconChevronDown } from '@tabler/icons-react';
import React, { useState, useRef } from 'react';
import { Link } from 'react-router-dom';
import { blogs } from "../fetchData.js";
import { Menu, MenuButton, MenuItem, MenuItems } from '@headlessui/react'

const CardSection = () => {
    const [currentPage, setCurrentPage] = useState(1);
    // eslint-disable-next-line
    const [category, setCategory] = useState("All");
    const itemsPerPage = 6;
    const searchRef = useRef(null);

    // State for filtered blogs
    const [filteredBlogs, setFilteredBlogs] = useState(blogs);

    // Calculate total pages based on filtered blogs
    const totalPages = Math.ceil(filteredBlogs.length / itemsPerPage);

    // Get the current page's blogs
    const currentBlogs = filteredBlogs.slice(
        (currentPage - 1) * itemsPerPage,
        currentPage * itemsPerPage
    );

    // Handle search/filter
    const handleSearch = () => {
        const searchValue = searchRef.current.value.toLowerCase();
        const filtered = blogs.filter(blog =>
            blog.blogHeading.toLowerCase().includes(searchValue)
        );
        setFilteredBlogs(filtered);
        setCurrentPage(1); // Reset to the first page after filtering
    };

    // Handle previous page
    const handlePrevious = () => {
        if (currentPage > 1) {
            setCurrentPage(currentPage - 1);
        }
    };

    // Handle next page
    const handleNext = () => {
        if (currentPage < totalPages) {
            setCurrentPage(currentPage + 1);
        }
    };

    // Handle category filter
    const handleCategoryChange = (category) => {
        setCategory(category);
        const filtered = blogs.filter(blog => blog.category === category);
        setFilteredBlogs(filtered);
        setCurrentPage(1); // Reset to the first page after filtering
    };
    return (
        <section className="px-4 py-24 mx-auto max-w-7xl">
            <h2 className="mb-2 text-4xl font-[ZCOOL] text-center xl:text-left font-extrabold leading-tight text-white">Beyond Horizon</h2>
            <div className="grid xl:flex justify-center xl:justify-between items-center ">
                <p className="mb-20 text-lg text-gray-500">
                    Comes directly from the deep thoughts of Beyond Horizon.
                </p>
                <div className="relative w-full xl:w-1/3 mb-10 flex gap-6">
                    <IconSearch className='absolute left-3 top-2 text-gray-400' />
                    <input ref={searchRef} onInput={handleSearch} className="w-full rounded focus:outline-0 p-1.5 border pl-13" type="text" placeholder="Search Blog ..." />
                    {/* category wise filtration */}
                    <Menu as="div" className="relative inline-block text-left" focus:outline-hidden>
                        <div>
                            <MenuButton className="inline-flex w-full justify-center gap-x-1.5 rounded-md bg-white px-3 py-2 text-sm font-semibold text-gray-900 shadow-xs ring-1 ring-gray-300 ring-inset hover:bg-gray-50">
                                Options
                                <IconChevronDown aria-hidden="true" className="-mr-1 size-5 text-gray-400" />
                            </MenuButton>
                        </div>

                        <MenuItems
                            transition
                            className="absolute right-0 z-10 mt-2 w-56 origin-top-right rounded-md bg-white shadow-lg ring-1 ring-black/5 transition focus:outline-hidden data-closed:scale-95 data-closed:transform data-closed:opacity-0 data-enter:duration-100 data-enter:ease-out data-leave:duration-75 data-leave:ease-in"
                        >
                            <div className="py-1">
                            {[...new Set(blogs.map(({ category }) => category))].map((category, index) => (
                                <MenuItem key={index + "category"} className="text-gray-900 hover:bg-gray-100 hover:text-gray-900 group flex rounded-md items-center px-2 py-2 text-sm">
                                    <span onClick={() => handleCategoryChange(category)}
                                        className="block px-4 py-2 text-sm text-gray-700 data-focus:bg-gray-100 data-focus:text-gray-900 data-focus:outline-hidden"
                                    >
                                        {category}
                                    </span>
                                </MenuItem>
                            ))}
                                    

                            </div>
                        </MenuItems>
                    </Menu>
                </div>


            </div>
            {/* card section */}
            <div className="grid items-center justify-center grid-cols-1 gap-12 md:grid-cols-2 lg:grid-cols-2 xl:grid-cols-3">
                {currentBlogs.map(({ id, blogText, category, image, blogAuthor, blogHeading }) => (
                    <div key={id + "blogs"} className="border-2 border-gray-500 rounded-lg p-2">
                        <Link to="">
                            <img
                                src={image}
                                className="object-cover w-full h-56 mb-5 bg-center rounded"
                                alt="blog"
                                loading="lazy"
                            />
                        </Link>
                        <h2 className="mb-2 text-lg font-semibold text-gray-300">
                            <Link to="" className="text-white">{blogHeading}</Link>
                        </h2>
                        <p className="my-3 text-white">
                            Category : <span className="text-xs">{category}</span>
                        </p>
                        <p className="mb-3 text-sm font-normal text-gray-300">
                            {blogText.slice(0, 290)}...
                        </p>
                        <p className="mb-3 text-sm font-normal text-gray-300">
                            <Link to="" className="font-medium text-white mx-2">{blogAuthor}</Link>
                            • April 16, 2020
                        </p>
                    </div>
                ))}
            </div>
            {/* Pagination */}
            <div className="my-4 flex items-center justify-center px-4 py-3 sm:px-6">
                <div className="flex flex-1 justify-between sm:hidden">
                    <button
                        onClick={handlePrevious}
                        disabled={currentPage === 1}
                        className={`relative inline-flex items-center rounded-md border border-gray-300 bg-white px-4 py-2 text-sm font-medium text-gray-700 hover:bg-gray-50 ${currentPage === 1 ? "cursor-not-allowed opacity-50" : ""
                            }`}
                    >
                        Previous
                    </button>
                    <button
                        onClick={handleNext}
                        disabled={currentPage === totalPages}
                        className={`relative ml-3 inline-flex items-center rounded-md border border-gray-300 bg-white px-4 py-2 text-sm font-medium text-gray-700 hover:bg-gray-50 ${currentPage === totalPages ? "cursor-not-allowed opacity-50" : ""
                            }`}
                    >
                        Next
                    </button>
                </div>
                <div className="hidden sm:flex sm:flex-1 sm:items-center sm:justify-between">
                    <div>
                        <nav
                            aria-label="Pagination"
                            className="isolate inline-flex -space-x-px rounded-md shadow-xs"
                        >
                            <button
                                onClick={handlePrevious}
                                disabled={currentPage === 1}
                                className={`relative inline-flex items-center rounded-l-md px-2 py-2 text-gray-400 ring-1 ring-gray-300 ring-inset hover:bg-gray-50 focus:z-20 focus:outline-offset-0 ${currentPage === 1 ? "cursor-not-allowed opacity-50" : ""
                                    }`}
                            >
                                <span className="sr-only">Previous</span>
                                <IconArrowLeft aria-hidden="true" className="size-5" />
                            </button>
                            <span
                                className="relative inline-flex items-center px-4 py-2 text-sm font-medium text-gray-400"
                            >
                                Page {currentPage} of {totalPages}
                            </span>
                            <button
                                onClick={handleNext}
                                disabled={currentPage === totalPages}
                                className={`relative inline-flex items-center rounded-r-md px-2 py-2 text-gray-400 ring-1 ring-gray-300 ring-inset hover:bg-gray-50 focus:z-20 focus:outline-offset-0 ${currentPage === totalPages ? "cursor-not-allowed opacity-50" : ""
                                    }`}
                            >
                                <span className="sr-only">Next</span>
                                <IconArrowRight aria-hidden="true" className="size-5" />
                            </button>
                        </nav>
                    </div>
                </div>
            </div>
        </section>
    );
};

export default CardSection;