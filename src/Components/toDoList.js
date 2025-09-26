
import Container from '@mui/material/Container';
import * as React from 'react';
import Card from '@mui/material/Card';
import CardActions from '@mui/material/CardActions';
import CardContent from '@mui/material/CardContent';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import ToggleButton from '@mui/material/ToggleButton';
import ToggleButtonGroup from '@mui/material/ToggleButtonGroup';
import ToDo from './ToDo';
import Grid from '@mui/material/GridLegacy';
import TextField from '@mui/material/TextField';
import { useState } from 'react';
import { useContext , useEffect} from 'react';
import { ToDoContext } from '../contexts/ToDosContext';
import  {v4 as uudiv4} from 'uuid';






export default function ToDoList() {
  const {ToDos, setToDos}=useContext(ToDoContext)

const [titleInput , setTitleInput]=useState("");
const [TodosDisplay ,setTodosDisplay]=useState("all")

const CompletedTodos=ToDos.filter((t) =>{ return  t.isCompleted})
const NotCompletedTodos=ToDos.filter((t) =>{ return !t.isCompleted });
 
let initialDisplay=ToDos;
if(TodosDisplay ==='completed'){
  initialDisplay = CompletedTodos;
}else if(TodosDisplay ==='no-completed'){
  initialDisplay = NotCompletedTodos;
}else{
  initialDisplay = ToDos
}
 

  const toDos=initialDisplay.map((t) =>{
    return <ToDo key={t.id} todo={t}/>
 });


 //filter arrays

 function hanldeChangeDisplay(e){
  setTodosDisplay(e.target.value)
 }


  function handleAdd(){
    const newToDo={
  id:uudiv4() ,
  title:titleInput,
  details:"",
  isCompleted:false,
}
    const NewToDos=[...ToDos ,newToDo ]
    setToDos(NewToDos);
    localStorage.setItem('ToDos' , JSON.stringify({NewToDos}))
    setTitleInput("")

  }
  useEffect(() => {
   const storageT= JSON.parse(localStorage.getItem('ToDos')) ?? [];
  setToDos(storageT);
  },[])
 
  
  return (
      <Container maxWidth="sm" >
    <Card sx={{ minWidth: 275 }} style={{maxHeight:"80vh" , overflow:"scroll"}}>
      <CardContent>

        <Typography variant="h3" style={{fontWeight:"normal"}} >
          مهامي
        </Typography>
        <hr></hr>
        <ToggleButtonGroup
      exclusive
      style={{marginTop:"10px"}}
      value={TodosDisplay}
      onChange={hanldeChangeDisplay}
      color='primary'
    >
      <ToggleButton value="all" >
       الكل
      </ToggleButton>
      <ToggleButton value="completed"  >
        المنجز
      </ToggleButton>
      <ToggleButton value="no-completed" >
    الغير منجز
      </ToggleButton>
      
        </ToggleButtonGroup>


    {toDos}


    
    <Grid container spacing={1} style={{marginTop:"5px"}} >
        <Grid item xs={8}  style={{ }}>
          <TextField style={{width:"100%"}}id="outlined-basic" label="
          عنوان المهمة" variant="outlined" 
          value={titleInput} 
          onChange={(e)=> {setTitleInput(e.target.value)}}/>
          
        </Grid>
        <Grid item xs={4} style={{width:"100%"}} >
          <Button onClick={handleAdd} style={{width:"100%", height:"55px" }} 
          variant="contained"
          disabled={titleInput.length==0}>
            اضافة

          </Button>
        </Grid>
        </Grid>


      </CardContent>
      
    </Card>
      </Container>
        )

}