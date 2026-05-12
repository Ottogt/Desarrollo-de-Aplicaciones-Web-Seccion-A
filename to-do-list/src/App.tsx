
import './App.scss'
import Item from './components/item/item'
import FormTaskAndGoal from './components/form/forms'
import Menu from './components/menu/menu'
import Row from 'react-bootstrap/Row' 
import Col from 'react-bootstrap/Col'
import Container from 'react-bootstrap/Container'
import AddingMobileButton from './components/addingMobileButton/addingMobileButton'
import Modal from 'react-bootstrap/Modal';
import  { useEffect, useState } from "react";
import { useMenuStore } from './store/menuStore'
import{ useGoalStore } from './store/goalStore'
import { useTaskStore } from './store/taskStore'

function App() {
    const [showModal, setShowModal] = useState(false)
    const handleOpenModal = () => setShowModal(true);
    const handleCloseModal = () => setShowModal(false);

    const tasks = useTaskStore((state) => state.tasks);
    const goals = useGoalStore((state) => state.goals);
    const IsactiveMenu = useMenuStore((state) => state.menu.active);

    useEffect(() => {
       useTaskStore.getState().setTasks([
        { id: 1, name: 'Tarea 1', description: 'Descripción de la tarea 1', dueDate: '2026-12-31' },
        { id: 2, name: 'Tarea 2', description: 'Descripción de la tarea 2', dueDate: '2026-11-30' },
       ]);
       useGoalStore.getState().setGoals([
        { id: 1, name: 'Meta 1', description: 'Descripción de la meta 1', dueDate: '2024-12-31' },
        { id: 2, name: 'Meta 2', description: 'Descripción de la meta 2', dueDate: '2024-11-30' },
       ]);
        useMenuStore.getState().setActive('tasks');
    }, []);

  return (
     <div className="App">
         <Menu></Menu> 
     <Container>
      <Row>
        <Col className='d-none d-md-block'>
             <FormTaskAndGoal/> 
        </Col>
        <Col> 
             <div className="d-md-none overlapping-div" onClick={handleOpenModal}>
                <AddingMobileButton/>
             </div>
             <Row>
                     <div className='scrolling'>
                      {IsactiveMenu === 'task' ?(
                        tasks.map((task) => (
                        <Item key={task.id} {...task} />))
                      ):(
                        goals.map((goal) => (
                          <Item key={goal.id} {...goal} />))
                      )}
                      
                     </div>
             </Row>
       </Col>
      </ Row>
      </Container>
        
        <Modal show={showModal} onHide={handleCloseModal} centered>
        <Modal.Header closeButton>
          <Modal.Title>Agregar Meta</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <FormTaskAndGoal onAdd={handleCloseModal} />
        </Modal.Body>
      </Modal>  

     </div> 
    
  )
}

export default App
