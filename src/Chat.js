import React, { useEffect, useState } from 'react'
import {Avatar, IconButton} from '@material-ui/core';
import SearchIcon from '@material-ui/icons/Search';
import AttachFileIcon from '@material-ui/icons/AttachFile';
import MoreVertIcon from '@material-ui/icons/MoreVert';
import EmojiEmotionsOutlinedIcon from '@material-ui/icons/EmojiEmotionsOutlined';
import MicIcon from '@material-ui/icons/Mic';
import './Chat.css'

import { db } from './firebase';
import firebase from 'firebase';
import { useStateValue } from './StateProvider';
import { useParams } from 'react-router-dom';

function Chat() {
    const{roomId} = useParams();
    const [roomName, setRoomName]= useState("");
    const[messages, setMessages]=useState([]);
    const[input, setInput] =useState("");
    const[{user}, dispatch] = useStateValue();
    const [seed, setSeed]= useState("");
    

    useEffect(()=> {
      
      setSeed(Math.floor(Math.random()*5000));
    }, []);

    useEffect(()=>{
    console.log(roomId);
     
      if(roomId){
        db.collection("rooms").doc(roomId).onSnapshot(snapshot=>{ 
          setRoomName(snapshot.data().name);
        });

        
      }
    },[roomId]);

    
    useEffect(()=>{
    db.collection("rooms").doc(roomId).collection("message").orderBy("timestamp","asc").onSnapshot(snapshot=>{
      setMessages(snapshot.docs.map(doc=>doc.data()))
     })},[roomId]);

    const sendMessage=(e)=>{
      e.preventDefault();
      if(input ==="") {
        return alert("enter msg");
      }
      
      db.collection("rooms").doc(roomId).collection("message").add({
        name:user.displayName,
        message:input,
        timestamp:firebase.firestore.FieldValue.serverTimestamp()
      });
      setInput("");
    }
    
  return (
    <div className='chat'>
       <div className='chat_header'>
        <Avatar src={`https://avatars.dicebear.com/api/human/${seed}.svg`}/>
        <div className='chat_headerInfo'>
            <h3>{roomName}</h3>
            <p>  Last seen at           
              
{ new Date(messages[messages.length-1]?.timestamp?.seconds*1000).toLocaleTimeString()}
             </p>

        </div>

        <div className='header_right'>
            <IconButton>
                <SearchIcon/>
            </IconButton>

            <IconButton>
                <AttachFileIcon/>
            </IconButton>

            <IconButton>
                <MoreVertIcon/>
            </IconButton>

        </div>
       </div>

       <div className='chat_body'>
        {
          messages.map(message =>(
            <p className={`chat_message ${user.displayName===message.name && "chat_reciever"}`}> 
        <span className='chat_name'>{message.name}</span>
        {message.message}
        <span className='chat_time'>
          Last seen at   
          {
            new Date(message.timestamp?.seconds*1000).toLocaleTimeString()
          }
        </span>
        </p> 

          ))
        }


        
        </div>


        <div className='chat_footer'>
            <EmojiEmotionsOutlinedIcon/>
            <AttachFileIcon/>

            <form onSubmit={sendMessage}>
            <input type="text" value={input} 
             
            placeholder="Type your message"
            onChange={e=>setInput(e.target.value)}/>

            <input type="submit"/>


            </form >
            <MicIcon/>
        </div>
    
    </div>
  )
}

export default Chat