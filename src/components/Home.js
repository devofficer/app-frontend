import React, { useState } from 'react';
import Content from './Content';
import Header from './Header';
import Sidebar from './Sidebar';

const Home = () => {
    const [open, setOpen] = useState(false);
    return (
        <div className="bg-dark" style={{maxWidth: "100vw",position: "relative", height: "100vh"}}>
            <Header setOpen={setOpen} open={open} />
            {open && <Sidebar setOpen={setOpen} />}
            <Content />
        </div>
    );
}

export default Home;
