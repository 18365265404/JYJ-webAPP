import React,{Component} from 'react';
import '../assets/css/list.css'
import {Link} from 'react-router-dom';

export const List = ({list,dataName}) =>(
  <div className="newsList">
    <ul>
      {
        list.map((item,index)=>{
          return (
            <li key={item.id}>
              <Link to={"/detail/"+item.id+"?dataName="+dataName}>
                <h2>{item.id}.{item.title}</h2>
                <p>{item.detail}</p>
              </Link>
            </li>
          )
        })
      }

    </ul>
  </div>
);