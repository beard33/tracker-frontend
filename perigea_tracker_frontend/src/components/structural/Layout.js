import React,{useState} from 'react';
import Footer from './Footer';
import NavigationBar from './NavigationBar';
import Sidebar from './Sidebar';

export default function Layout({children}) {
  
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const menuToggle = () =>{
      setIsMenuOpen(!isMenuOpen);
  };

  return (
    <div className="view"> 
    
      <NavigationBar
        logo="./images/scrittaPerigea.png"
        message="./images/message.png"
        inbox6="./images/inbox6.png"
        grid="./images/grid.png"
        search="./images/search.png"
        language="./images/language.png"
        profile2="./images/fotoProfiloGenerica.png"
        isMenuOpen={isMenuOpen}
        onMenuToggle={menuToggle}
      />

      <Sidebar
        isMenuOpen={isMenuOpen}
        onMenuToggle={menuToggle}
      />

      <div className={`centralbody${isMenuOpen === true ? ' open' : ''}`}>
          {children}
      </div>

      <Footer 
        nomeCreatore="© 2020 Perigea Website"
        isMenuOpen={isMenuOpen}
        onMenuToggle={menuToggle}
      />

    </div>
  )
}