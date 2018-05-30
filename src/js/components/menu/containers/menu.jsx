import React from 'react';
import {Route, Switch} from 'react-router-dom';
import MenuItem from '../items/menu-item';
import SectionAddItem from '../../section/containers/section-add-item';
import SectionItems from '../../section/containers/section-items';
import SectionUploadFile from '../../section/containers/section-upload-file';
import SectionPDF from '../../section/containers/section-pdf';


class Menu extends React.Component {
    render() {
        return (
            <div className='panel'>
                <div className='main-panel row'>
                    <div className='main-panel-left col s12 m6 l3'> 
                        
                        <ul className='menu'>
                            {
                                this.props.menus.map((item, index)=>{
                                    return (
                                        <MenuItem menu={item} key={index} style={this.props.style}/>
                                    )
                                })
                            }
                        </ul>             
                    </div>
                    <div className='main-panel-right col s12 m6 l9'> 
                        <section>
                            <main>
                                <Switch>
                                    <Route exact path="/add" component={()=>(<SectionAddItem database={this.props.database}/>)} />
                                    <Route path="/items" component={()=>(<SectionItems database={this.props.database}/>)} />
                                    <Route path="/import" component={SectionUploadFile} />
                                    <Route path="/printer" component={()=>(<SectionPDF database={this.props.database}/>)} />
                                </Switch>
                            </main>
                        </section>  
                    </div>
                </div>
            </div>
        );
    }
}

export default Menu;