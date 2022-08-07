import React, { useState, useEffect } from 'react';
import mockUser from './mockData.js/mockUser';
import mockRepos from './mockData.js/mockRepos';
import mockFollowers from './mockData.js/mockFollowers';
import axios from 'axios';


const rootUrl = 'https://api.github.com';



const GithubContext = React.createContext()

const GithubProvider = ({children}) => {
    const [githubUser,setGithubUser] = useState(mockUser)
    const [repos,setRepos] = useState(mockRepos)
    const [githubFollowers,setGithubFollowers] = useState(mockFollowers)
    const [requests,setRequests] = React.useState(60)
    const[reset,setReset] = React.useState('')
    const [error,setError] =React.useState({show:false,msg:''})
    const [loading,setLoading] = React.useState(false)

  
  const fetchLimit = async() =>{
    try {
      const data = await axios(`${rootUrl}/rate_limit`)
    //   console.log(data)
      let {data:{rate:{remaining}}} = data
        console.log(remaining)
        setRequests(remaining)
        if(remaining == 0){
          errorToggle(true,'sorry, you have exceeded max limit of requests')
        }       
    } catch (error) {
      console.log(error)
    }
  }

  const errorToggle = (show,msg)=>{
    setError({show,msg})
  }
  const fetchUser = async(user) =>{
    errorToggle()
    setLoading(true)
    try {
        const userURL = `${rootUrl}/users/${user}`
        const response = await axios(userURL)   
        setLoading(false)
        setGithubUser(response.data)  
        console.log(response.data) 
        getReposAndFollowers(user)
       console.log(user)
    } catch (error) {
        errorToggle(true,'there is no user with that name')
    }
    setLoading(false)
    fetchLimit()

  }

  const getReposAndFollowers = async(userName)=>{
    console.log(userName)
    const repoURL = `${rootUrl}/users/${userName}/repos?per_page=100`
    const followersURL = `${rootUrl}/users/${userName}/followers`
    try {
         
        // setRepos(response.data)
        // setGithubFollowers(followersData.data)
        // console.log(followersData.data)
        // console.log(response.data)
        // setRepos(response.data)
        // setGithubFollowers(followersData)
        await Promise.allSettled([axios(repoURL),
        axios(followersURL)]).then(results=> {
            console.log(results)
            const  [repos,followers] = results;
            const status = 'fulfilled';
            if(repos.status== status){
                
                setRepos(repos.value.data)
              } 
            if (followers.status == status){
            setGithubFollowers(followers.value.data)

            }
        })
    } catch (error) {
       console.log(error) 
    }
    

  }


  
//   useEffect( ()=>{fetchLimit()},[])

    return (
        <GithubContext.Provider value={{githubUser,setGithubUser,githubFollowers,repos,requests,error,fetchUser,loading}} >{children}</GithubContext.Provider>
        );
};

export {GithubProvider,GithubContext};