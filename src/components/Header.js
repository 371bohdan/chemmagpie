import React from 'react'; // обов'язково без нього компіляція не відбудеться
import Image from './Image'
import logo from '../img/chemmagpie.png'
import Button from './Button'

const Header1 = () =>{
    return (
      <header >Title cite</header>
    )
  }
  
  class Header extends React.Component{
    render(){
      return(
        <header className='header'>{this.props.title}
        <Image image={logo} />
        <Button />
        <Button text="change button text" />
        </header>
      )
    } 
  }

  export default Header;