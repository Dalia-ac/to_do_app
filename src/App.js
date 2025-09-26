import logo from './logo.svg';
import './App.css';
import ToDoList from './Components/toDoList';
import {createTheme , ThemeProvider} from "@mui/material/styles"
import { ToDoContext } from './contexts/ToDosContext';
import  {v4 as uudiv4} from 'uuid';
import { useState } from 'react';


const theme= createTheme({
  typography:{
    fontFamily:[
      "A"
    ]
  },palette:{
    primary:{
      main:"#dd2c00"
    }
  }
})

const initialTodos=[{
  id:uudiv4(),
  title:"hhhhh",
  details:"2222",
  isCompleted:false
},
{
  id:uudiv4(),
  title:"www",
  details:"eeee",
  isCompleted:false
},
{
  id:uudiv4(),
  title:"www",
  details:"2222",
  isCompleted:false
}];


function App() {
  const [ToDos , setToDos]=useState(initialTodos);
  return (
    
    <ThemeProvider theme={theme} >
    <div className="App" style={{display:"flex" , height:'100vh', alignItems:"center" , background:"rgb(35, 34, 34)" , direction:"rtl" }}>
      <ToDoContext.Provider value={{ToDos:ToDos , setToDos:setToDos}}>
     <ToDoList/>
      </ToDoContext.Provider>
    </div>
    </ThemeProvider>
    
  );
}

export default App;
