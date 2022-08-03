import React from 'react';
import styled from 'styled-components';
import { GithubContext } from '../context/context';
import { ExampleChart, Pie3D, Column3D, Bar3D, Doughnut2D } from './Charts';
// import {ChartComponent}  from './Charts/ExampleChart'
const Repos = () => {
  const {repos} = React.useContext(GithubContext)
  let languages = repos.reduce((total,item)=>{
    const {language,stargazers_count} = item;
    if(!language) return total;
    if(!total[language]){
      total[language] = {label:language,value:1,stars:stargazers_count}
    }else{
      total[language]={...total[language],value:total[language].value+1,stars:stargazers_count+total[language].stars}
    }
    return total
  },{})
  console.log(Object.values(languages))
  const chartData =Object.values(languages).sort((a,b)=>b.value-a.value).slice(0,5)
  const dongnutData = Object.values(languages).sort((a,b)=> {return b.stars-a.stars}).map((item)=> {return {...item,value:item.stars}}).slice(0,5)
  // const {stars,name,fork} = repos
  let {stars,forks} = repos.reduce((total,item)=>{
      const {stargazers_count,name,forks}=item;
      total.stars[stargazers_count]={label:name,value:stargazers_count}
      total.forks[forks]={label:name,value:forks}
    return total
  },{stars:{},forks:{}})
  const mostPopular = Object.values(stars).slice(-5).reverse()
  const mostForked = Object.values(forks).slice(-5).reverse()
  
  const dummyData = [{label:"javaScript",value:120},{label:"html",value:30},{label:"CSS",value:47}]
  // console.log(dongnutData)

  
  
  
  
  return <section className='section'>
      <Wrapper className='section-center'>
        <Pie3D data = {chartData}/>
        <Column3D data={mostPopular}/>
        <Doughnut2D data = {dongnutData}/>
        <Bar3D data = {mostForked}/>
      </Wrapper>
  </section> 
};

const Wrapper = styled.div`
  display: grid;
  justify-items: center;
  gap: 2rem;
  @media (min-width: 800px) {
    grid-template-columns: 1fr 1fr;
  }

  @media (min-width: 1200px) {
    grid-template-columns: 2fr 3fr;
  }

  div {
    width: 100% !important;
  }
  .fusioncharts-container {
    width: 100% !important;
  }
  svg {
    width: 100% !important;
    border-radius: var(--radius) !important;
  }
`;

export default Repos;
