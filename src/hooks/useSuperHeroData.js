import { useQuery , useQueryClient} from "react-query";
import axios from "axios";

const fetchSuperHero =(heroId)=>{
    return axios.get(`http://localhost:4000/superheroes/${heroId}`)
}
export const useSuperHeroData =(heroId)=>{
    const queryClient=useQueryClient();  //queryClient has access to query cache

    //maintain seperate query ofr each hero.
    return useQuery(['super-hero', heroId], ()=>fetchSuperHero(heroId),{   
        //not set loading when clicked to details page , only background refetch is initiated.
        initialData :() =>{
            const hero= queryClient.getQueryData('super-heroes')?.data?.find(hero=>hero.id === parseInt(heroId))   //the variable contains the cached data. setting initial data for a query

            if(hero){
                return{
                    data:hero
                }
            }else{
                return undefined
            }
        }
   
    },
    
    )   
}
