import {  useInfiniteQuery } from "react-query";
import axios from 'axios'
import { Fragment } from "react";

const fetchColorss =({pageParam =1}) =>{
    return axios.get(`http://localhost:4000/colors?_limit=2&_page=${pageParam}`)
}

export const InfiniteQueriesPage =() =>{
    const {isLoading, isError,error, data, hasNextPage, fetchNextPage, isFetching, isFetchingNextPage} =useInfiniteQuery(['colors'], 
    fetchColorss,
    {
        getNextPageParam :(_lastPage, pages) =>{
            if(pages.length < 4){
                return pages.length +1
            }
            else{
                return undefined 
            }
        },
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
            {data?.pages.map((group, index)=>{
                return(
                    <Fragment key={index}>
                        {
                            group.data.map((color)=>(
                               <h2 key={color.id}>{color.id}  {color.label}</h2> 
                            ))
                        }
                    </Fragment>   
                )
            })}
        </div>

        <div>
            <button disabled={!hasNextPage} onClick={fetchNextPage}>loadnore</button>
        </div>

        <div>
            {isFetching && !isFetchingNextPage ? 'fetching...' : null}
        </div>
        </>
     
    )
}