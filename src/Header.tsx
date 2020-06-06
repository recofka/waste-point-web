import React from 'react';

interface HeaderProps {
    title?: string;
}

const Header: React.FC<HeaderProps> = (title) => {
    return(
       <header>
           <h1>WastePoint</h1>
       </header>
    );
}

export default Header;