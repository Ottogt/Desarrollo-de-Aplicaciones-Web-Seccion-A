import { useEffect, useState } from 'react'
import Item from './components/item/item'
import './App.scss'
import AddingMobileButton from './components/addingMobileButton/addingMobileButton'
import FormTaskAndGoal from './components/form/forms'
import Menu from './components/menu/menu'
import Container from 'react-bootstrap/Container'
import Row from 'react-bootstrap/Row'
import Col from 'react-bootstrap/Col'
import Modal from 'react-bootstrap/Modal'
import { useTaskStore, initializeTasks } from './store/taskStore'
import { useGoalStore, initializeGoals } from './store/goalStore'
import { useMenuStore } from './store/menuStore'


function App() {

const tasks = useTaskStore((state) => state.tasks);
const goals = useGoalStore((state) => state.goals);
const isActiveInMenu = useMenuStore((state) => state.menu.active);

  useEffect(() => {
    initializeTasks();
    initializeGoals();
  }, [])

  const [showModal, setShowModal] = useState(false)

  const handleOpenModal = () => setShowModal(true)
  const handleCloseModal = () => setShowModal(false)

  return (
    <div className="App">
      <Menu />

      <Container>
        <Row>
          <Col className="d-none d-md-block">
            <FormTaskAndGoal />
          </Col>

          <Col>
            <div className="d-md-none overlapping-div" onClick={handleOpenModal}>
              <AddingMobileButton />
            </div>

            <Row>
              {isActiveInMenu === 'task' ? (
                <div key='tasks' className="scrolling">
                  {tasks.map((task) => (
                    <Item key={task._id} {...task} />
                  ))}
                </div>
              ) : (
                <div key='goals' className="scrolling">
                  {goals.map((goal) => (
                    <Item key={goal._id} {...goal} />
                  ))}
                </div>
              )}
            </Row>
          </Col>
        </Row>
      </Container>

      <Modal show={showModal} onHide={handleCloseModal} centered>
        <Modal.Header closeButton>
          <Modal.Title>Agregar tarea</Modal.Title>
        </Modal.Header>

        <Modal.Body>
          <FormTaskAndGoal onAdd={handleCloseModal} />
        </Modal.Body>
      </Modal>
    </div>
  )
}

export default App