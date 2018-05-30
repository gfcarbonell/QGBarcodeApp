import React from 'react';
import Menu from '../components/menu/containers/menu';
import Header from '../components/header/containers/header';
import Footer from '../components/footer/containers/footer';

class Main extends React.Component {
  render() {
    let menus = this.props.data.menus;
    let headers = this.props.data.headers;
    let database = this.props.data.database;
    return (
        <div className='main'>
            <Header data={headers} style={{background:'#7cb342'}} />
            <Menu menus={menus} database={database} style={{background:'#7cb342'}} />
            <Footer style={{background:'#7cb342'}} />
        </div>
    );
  }
}

export default Main;