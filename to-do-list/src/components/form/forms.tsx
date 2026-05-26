import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';
import './forms.scss'
import { useMenuStore } from '../../store/menuStore'
import{ useGoalStore } from '../../store/goalStore'
import { useTaskStore } from '../../store/taskStore'
import { useRef } from 'react';
 


type FormTaskAndGoalProps = {
  onAdd?: () => void;
};


function FormTaskAndGoal({ onAdd }: FormTaskAndGoalProps) {
  
  const inputRefName = useRef<HTMLInputElement>(null);
  const inputRefDescription = useRef<HTMLTextAreaElement>(null);
  const inputRefDueDate = useRef<HTMLInputElement>(null); 
  const isactiveMenu = useMenuStore((state) => state.menu.active);
  const addTasks = useTaskStore((state) => state.addTask);
  const addGoals= useGoalStore((state) => state.addGoal);
  
  
  
  const handleSubmit = (e: React.SubmitEvent) => {    e.preventDefault()

    const name = inputRefName.current?.value;
    const description = inputRefDescription.current?.value;
    const dueDate = inputRefDueDate.current?.value;

    if (name && description && dueDate) { 
      if (isactiveMenu === 'task') {
        addTasks({ _id: String(Date.now()), name, description, duedate: dueDate });
      } else {
        
        addGoals({ _id: String(Date.now()), name, description, duedate: dueDate });
      }

    if (onAdd) {
      onAdd();
    }
  };
  }  
  return (
    <div className='space form-margin'>
    <Form onSubmit={handleSubmit}>
      <Form.Group className="mb-3">
        <Form.Label>Nombre</Form.Label>
        <Form.Control type="text" placeholder="Ingrese Nombre" ref={inputRefName} />
      </Form.Group>

     <Form.Group className="mb-3">
        <Form.Label>Descripcion</Form.Label>
        <Form.Control as = "textarea" rows={3} ref={inputRefDescription} />
      </Form.Group>
    
      <Form.Group className="mb-3" >
        <Form.Label>Fecha Vencimiento</Form.Label>
        <Form.Control type="date" ref={inputRefDueDate}  />
      </Form.Group>
      <Button type="submit" variant="info" >
        {isactiveMenu === 'task' ? 'Agregar Tarea' : 'Agregar Meta'}
      </Button>
    </Form>
   </div>
  );
}

export default FormTaskAndGoal;