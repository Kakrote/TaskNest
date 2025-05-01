"use client"
import AddTask from '@/components/AddTask'
import React, { useState,useCallback,useEffect } from 'react'
import MenuBar from '@/components/MenuBar'
import Navbar from '@/components/Navbar'
import TaskList from '@/components/TaskList'
import { useRouter } from 'next/navigation'
import CompleteTaskList from '@/components/CompleteTaskList'
import { debounce } from 'lodash'

const page = () => {
    const router=useRouter()
    const [showMenu, setShowMenu] = useState(false)

    useEffect(()=>{
        const token=localStorage.getItem("token")
        if(!token){
            router.push('/')
        }
    },[])

    const [filter, setFilter] = useState("Pending");
    const [sortOrder, setSortOrder] = useState("desc");
    const [searchTerm, setSearchTerm] = useState("");
    const [debouncedSearch, setDebouncedSearch] = useState("");

    const handleDebouncedSearch = useCallback(
        debounce((value) => {
          setDebouncedSearch(value);
        }, 300), // ⏱️ 300ms debounce
        []
      );

      const handleChange = (e) => {
        setSearchTerm(e.target.value);
        handleDebouncedSearch(e.target.value);
      };


    const toggelMenu = () => {
        setShowMenu(!showMenu)
    }
    return (
        <div className='flex flex-col bg-gradient-to-br from-[#e3f2fd] via-[#e1f5fe] to-[#bbdefb] min-h-screen relative'>
            <Navbar toggelMenu={toggelMenu} />
            <div className='flex'>
                <div
                    className={`fixed top-14  left-0 z-120 transform ${showMenu ? 'translate-x-0' : '-translate-x-full'
                        } transition-transform h-[480px]  rounded-lg duration-300 ease-in-out md:translate-x-0  md:top-20 md:left-0 md:w-[25%] lg:w-[20%] xl:w-[15%]  p-2 min-h-fit border shadow-md backdrop-blur-lg `}
                >
                    <MenuBar filter={filter} setFilter={setFilter} />
                </div>
                {/* Right Side Container */}
                <div className='space-y-0 flex flex-col w-full md:w-[75%] lg:w-[80%] xl:w-[85%] ml-auto mb-0 mt-[48px] p-1 overflow-y-auto h-[calc(100vh-48px)]'>
                    <AddTask />
                    <div className="flex gap-3 justify-end mt-2 mr-auto ml-auto mb-2">
                        <select
                            value={sortOrder}
                            onChange={(e) => setSortOrder(e.target.value)}
                            className="border px-3 shadow-md py-1 rounded bg-white/70 text-black"
                        >
                            <option value="desc">Newest First</option>
                            <option value="asc">Oldest First</option>
                        </select>
                    
                            <input
                                type="text"
                                placeholder="Search by title..."
                                value={searchTerm}
                                onChange={ handleChange}
                                className="w-full text-black   px-4 py-2 border rounded-lg shadow-md focus:ring-2 focus:ring-blue-400"
                            />
                       
                    </div>

                    <TaskList filter={filter} sortOrder={sortOrder} searchTerm={debouncedSearch} />
                    <CompleteTaskList />

                </div>
            </div>
        </div>
    )
}

export default page
