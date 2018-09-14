import React, { Component } from 'react';
import {
    BrowserRouter,
    Route
} from 'react-router-dom';
import './index.css';
import registerServiceWorker from './registerServiceWorker';

registerServiceWorker();

 class App1 extends Component{
    render(){
        return(
                <h1>Hello</h1>
            )
        
    }
}

export default class extends Component{
    render(){
        return(
            <BrowserRouter>
                <Route path="/" component={App1}/>
            </BrowserRouter>
        )
    }
}

