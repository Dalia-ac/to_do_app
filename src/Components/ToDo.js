import { CardActions, TextField } from '@mui/material';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import DoneIcon from '@mui/icons-material/Done';
import Typography from '@mui/material/Typography';
import Grid from '@mui/material/GridLegacy';
import IconButton from '@mui/material/IconButton';
import DeleteIcon from '@mui/icons-material/Delete';
import EditIcon from '@mui/icons-material/Edit';
import { useContext , useState , useEffect } from 'react';
import { ToDoContext } from '../contexts/ToDosContext';
import  {v4 as uudiv4} from 'uuid';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle';
import Button from '@mui/material/Button';





export default function ToDo({todo , handleClick}){


   const {ToDos, setToDos}=useContext(ToDoContext);
   const [DeletDialog , setDeletDialog]=useState(false);
   const [EditDialog , setEditDialog]=useState(false);
   const [updated ,setUpdated]= useState({title:todo.title ,details:todo.details })

  function handleChange(){
     const newTodos= ToDos.map((t) =>{
    if(t.id ==todo.id){
      if(t.isCompleted==false){
      let newToDo={...t , isCompleted:true};
      return newToDo;}else{
        let newToDo={...t , isCompleted:false};
      return newToDo;
      }
    }else{
      return t
    }
  })
  setToDos(newTodos);
  localStorage.setItem('ToDos' , JSON.stringify({newTodos}))
  }


const open=true;
//delet 
function handleDelete(){
  setDeletDialog(true);

}
function handleClose(){
  setDeletDialog(false);

}
function handleConfirm(id){
  const newTodos=ToDos.filter((t)=>
  {
    return t.id !== todo.id
  })
  setToDos(newTodos)
  localStorage.setItem('ToDos' , JSON.stringify({newTodos}))
}


//edit

function handleEdit(){
setEditDialog(true);
}
function handleCloseEdit(){
  setEditDialog(false);
}

function handleEditConfirm(id){
  const newupdated= ToDos.map((t)=>{
    if(t.id==todo.id){
      return {...t , title:updated.title , details:updated.details}
    }else{return t}
  })
  setToDos(newupdated)
  handleCloseEdit()
  localStorage.setItem('ToDos' , JSON.stringify({newupdated}))
  
}


    return(
        <>
        <Dialog
        open={DeletDialog}
        onClose={handleClose}
        style={{direction:"rtl"}}
        aria-describedby="alert-dialog-slide-description"
      >
        <DialogTitle>{"هل انت متاكد انك تريد حذف هذه المهمة؟"}</DialogTitle>
        <DialogContent>
          <DialogContentText id="alert-dialog-slide-description">
            لا يمكنك التراجع بعدها
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          
          <Button onClick={()=>{handleConfirm(ToDos.id)}}>نعم, اريد الحذف</Button>
          <Button onClick={handleClose}>اغلاق</Button>
        </DialogActions>
      </Dialog>


      <Dialog
        open={EditDialog}
        onClose={handleCloseEdit}
        style={{direction:"rtl"}}
        aria-describedby="alert-dialog-slide-description"
      >
        <DialogTitle>{"تعديل مهمة"}</DialogTitle>
        <DialogContent>
          <TextField label="عنوان المهمة" margin='dense' fullWidth  value={updated.title}
          onChange={(e)=>{setUpdated({...updated , title:e.target.value})}}></TextField>
          <TextField label="التفاصيل"margin='dense' fullWidth value={updated.details} 
          onChange={(e)=>{setUpdated({...updated , details:e.target.value})}}></TextField>
        </DialogContent>
        <DialogActions>
          
          <Button onClick={() =>{handleEditConfirm(ToDos.id)}}>تاكيد</Button>
          <Button onClick={handleCloseEdit}>اغلاق</Button>
        </DialogActions>
      </Dialog>



        <Card className="todo"sx={{ minWidth: 275 }} style={{background:"rgba(38, 38, 132, 1)" , color:"white" , marginTop:"10px"}}>
      <CardContent>
      <Grid container spacing={2} style={{padding:"5px"}} >
        <Grid item xs={8}  style={{ padding:"1px"}}>
        <Typography variant="h5"style={{textAlign:"right" ,textDecoration:todo.isCompleted ? "line-through": "none"}}>
          {todo.title}
        </Typography>
         <Typography variant="h6"style={{textAlign:"right" }} >
          {todo.details}
        </Typography>
       
        </Grid>
        <Grid item xs={4} style={{display:"flex" ,justifyContent:"space-around"}} >
    <IconButton className="Icon" style={{background:todo.isCompleted ? "#19b907" :"white" , border:"solid 2px #19b907" ,color:todo.isCompleted ? "white" :"#19b907"}}
    onClick={() =>{handleChange()}}>
       <DoneIcon/>
    </IconButton>
    <IconButton  className="Icon" style={{background:" white" , border:"solid 2px #021bffff" ,color:"#021bffff"}}
    onClick={handleEdit}>
       <EditIcon/>
    </IconButton>
    <IconButton className="Icon" style={{background:"white" , border:"solid 2px #e80c0cff" , color:"#e80c0dff"}}
    onClick={handleDelete}
    >
       <DeleteIcon/>
    </IconButton>
        </Grid>
    </Grid>
      </CardContent>
      </Card>
      </>
    )
}