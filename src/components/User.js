import React from 'react';
import styled from 'styled-components';
import Card from './Card';
import Followers from './Followers';
import { GithubContext } from '../context/context';
const User = () => {
    const{githubUser} = React.useContext(GithubContext)
    const{avatar_url,name,login,bio,blog,company,location,html_url,type} = githubUser;
  return <section className='section'>
    <Wrapper className='section-center'>
      <Card/>
      <Followers/>
    </Wrapper>
  </section>;
};

const Wrapper = styled.div`
  padding-top: 2rem;
  display: grid;
  gap: 3rem 2rem;
  @media (min-width: 992px) {
    grid-template-columns: 1fr 1fr;
  }
  /* align-items: start; */
`;

export default User;
