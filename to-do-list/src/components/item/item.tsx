import Button from 'react-bootstrap/Button';
import Card from 'react-bootstrap/Card';
import './item.scss'
import { useMenuStore } from '../../store/menuStore'
import{ useGoalStore } from '../../store/goalStore'
import { useTaskStore } from '../../store/taskStore'
import type { goal } from '../../store/goalStore'
import type { task } from '../../store/taskStore'
 
  const {removeTasks} = useTaskStore.getState();
const {removeGoals} = useGoalStore.getState();

function item(props:task | goal) {
  

  
    const IsactiveMenu = useMenuStore((state) => state.menu.active);
  const handleRemove = (e: React.MouseEvent<HTMLButtonElement>) => {
  e.stopPropagation ();
  if(IsactiveMenu === 'task'){
    removeTasks(props as task);
  } else{
    removeGoals(props as goal);
  }
  
  };
    
  
  
    return (
    <Card style={{ width: '18rem' }}>
     
      <Card.Body>
        <Card.Title>{props.name}</Card.Title>
        <Card.Text className='fw-bold'>Descripcion</Card.Text>
        <Card.Text>{props.description}</Card.Text>
        <Card.Text className='fw-bold'>Fecha Vencimiento</Card.Text>
         <Card.Text>{props.dueDate}</Card.Text>
        <Button variant="info" onClick={(e) => handleRemove(e)}>
          Eliminar
        </Button>
      </Card.Body>
    </Card>
  );
}

export default item;