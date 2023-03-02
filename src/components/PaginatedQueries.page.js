import { useState } from "react";
import { useQuery } from "react-query";
import axios from "axios"

const fetchColors=(pageNum)=>{
    return axios.get(`http://localhost:4000/colors?_limit=2&_page=${pageNum}`)
}

export const PaginatedQueriesPage =() =>{
    const [pageNum, setpageNum] = useState(1)
    const {isLoading, isError, error, data, isFetching}= useQuery (['color', pageNum],()=> fetchColors(pageNum),
    {
        keepPreviousData:true
    }
    )

    if(isLoading){
        return <h2>Loading...</h2>
    }
    if(isError){
        return <h2>{error.message}</h2>
    }

    return (
        <>
            <div>
                {data?.data.map((color)=>{
                    return (
                        <div key={color.id}>
                            <h2>{color.id} .{color.label}</h2>
                        </div>
    
                    )
                })}
            </div>
            <div>
                <button onClick={()=>setpageNum((page)=>page-1)} disabled={pageNum ===1}>Prev</button>
                <button onClick={()=>setpageNum((page)=>page+1)} disabled={pageNum ===3}>Next</button>

            </div>
            {isFetching && 'loading...'}
        </>
    )
}

