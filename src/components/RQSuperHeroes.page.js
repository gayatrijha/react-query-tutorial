import { useState } from "react";
import {Link} from 'react-router-dom'
import { useSuperHeroesData,useAddSuperHeroData } from "../hooks/useSuperHeroesData";



export const RQSuperHeroesPage = () => {
  // const [interval, setInterval]= useState(3000);
  const [name,setName] = useState('');
  const [alterEgo, setAlterEgo] = useState('')
  const onSuccess= (data)=>{
    console.log("perform side effect after data fetching", data);
    // {refetchInterval:3000}
    // if(data.data.length >=4   && interval===3000){
    //   setInterval(0)
    // }

  }

  const onError = (error)=>{
    console.log("perform side effect after encountring error", error)
  }
 const { data, isLoading, isError, error, isFetching, refetch } =  useSuperHeroesData(onSuccess, onError)
// {
//  useQuery(
//   "super-heroes",
//   fetchHeros,
//   {
//     onSuccess:onSuccess,
//     refetchInterval:interval,
//     onError: onErrorFunction,
//     //data tramsformation -only names 
//     select:(data)=>{      
//       const superHerosNames = data.data.map(hero => hero.name);
//       return superHerosNames
//     }
//   }
// )
//}

   // { 
      // cacheTime: 5000 ,  //data is cached fr 5sec & then is garbage collected , default t=5min
      //staleTime:30000,  //reduce no. of network request fr the data tht doesnt change often by making the request  vailid fr 30sec
      // refetchOnMount: true, //refetch data on mount if data is stale. (true, false , 'always')
      //refetchOnWindowFocus :true ,//UI is upto date with remote data when the user comes back to app
      //refetchInterval :2000 //default is false ..when set to mili sec then there is continous refetch of tht query @ tht intrval

      //refetchIntervalInBackground: true //refetech data in background even if the window loses its focus

      //enabled:false , //dont refetch on mount/window focus bt based on requirement.


    //}
   const {mutate}=useAddSuperHeroData()  //call hook without  parameter
    
  const handleAddHeroClick =() =>{
    console.log({name , alterEgo});
    const hero ={name, alterEgo};
    mutate(hero)
  }
  // console.log({ isLoading, isFetching });
  if (isLoading || isFetching) {
    return <h1>Loading...</h1>;
  }
  if (isError) {
    return <h1>{error.message}</h1>;
  }
  return (
    <>
      <h2>React Query  Page</h2>
      <div>
        <input
        type='text'
        value={name}
        onChange= {(e)=>setName(e.target.value)}
        />

        <input
        type='text'
        value={alterEgo}
        onChange= {(e)=>setAlterEgo(e.target.value)}
        />

        <button onClick={handleAddHeroClick}>Add Hero</button>
      </div>
      <button onClick={refetch}>fetch data </button>
      {data?.data.map((hero) => {
        return <div key={hero.id}>
          <Link to={`/rq-super-heroes/${hero.id}`}>{hero.name}</Link>
          </div>;
      })}

      {/* {
        data.map(heroName =>{
          return <div key={heroName}>{heroName}</div>
        })
      } */}
    </>
  );
};
