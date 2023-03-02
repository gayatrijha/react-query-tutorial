import { useQuery,  useMutation ,useQueryClient} from "react-query";
// import axios from "axios";

import {request} from '../utils/axios-utils'


const fetchHeros = () => {
    //return axios.get("http://localhost:4000/superheroes");
    return request({url:'/superheroes'})
};


const addSuperHero =(hero) =>{
console.log("axios",hero)
  //return axios.post(`http://localhost:4000/superheroes`, hero)
  return request({url:'/superheroes', method:'post', data:hero})
}


//custom Query Hook which can be resusable.
export const useSuperHeroesData = (onSuccess, onError) =>{

return useQuery(
        "super-heroes",
        fetchHeros,
        {
        //   onSuccess:onSuccess,
        //   refetchInterval:interval,
        //   onError: onErrorFunction,
        //   data tramsformation -only names 
        //   select:(data)=>{      
        //     const superHerosNames = data.data.map(hero => hero.name);
        //     return superHerosNames
        //   }
        }
    )
}

export const useAddSuperHeroData =()=>{
  const queryClient = useQueryClient()
  return useMutation(addSuperHero,{
    //when mutation succeed then the  background refetch is initiated

    // onSuccess:(data)=>{
    //     //queryClient.invalidateQueries('super-heroes')  //invalidate "super-hero" (get data)  query. it refetch tht query (which was expired initiall)

    //     //update query data
    //     queryClient.setQueryData('super-heroes',(oldQueryData)=>{    
    //       return{
    //         ...oldQueryData,
    //         data:[...oldQueryData.data, data.data],    //data.data is a mutated data
    //       }
    //     })
    // }

    /**********  OPTIMISTIC UPDATES ***************** */

    //when mutation is called
    onMutate :async (newHero)=>{   
      await queryClient.cancelQueries('super-heroes')                    //cancel any out going refetches so they dont override our optimistic updates
      const previousData= queryClient.getQueriesData('super-heroes')     //get hold of query data before making any update, which will help in rollback if mutation fails
      //update the list of heroes before making post request
      queryClient.setQueryData('super-heroes',(oldQueryData)=>{    
        return{
          ...oldQueryData,
          data:[...oldQueryData.data, {id:oldQueryData?.data?.length +1, ...newHero},],  
        }
      })
      return{
        previousData, //to roll back back if mutaion errors out
      }
    },

    //if mutaion encounters an error
    // use the context returned from onMutate to roll back
    onError :(_error, _hero, context)=>{
      queryClient.setQueriesData('super-heroes', context.previousData)
    },

    // Always refetch after error or success:
    onSettled :()=>{
      queryClient.invalidateQueries('super-heroes')    //client state is in sync with server state
    }
      
  })            
}