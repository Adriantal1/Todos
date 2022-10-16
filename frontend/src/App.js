import {Container,ListGroup,ButtonGroup,ToggleButton,Button,Modal,Form} from "react-bootstrap"
import {useState,useEffect} from "react"

function App() {
  const[checked,setChecked] = useState(1)

  const [show, setShow] = useState(false)

  const [todos, setTodos] = useState([])

  const [textValue, setTextValue] = useState("")

  const getTodos = () => {
    fetch("http://127.0.0.1:8000/api/get-todos")
    .then(response=>response.json())
    .then(data=>setTodos(data))
  }

  useEffect(()=>{
    getTodos()
  },[])

  const updateTodo = async(todo) => {
    fetch(`http://127.0.0.1:8000/api/update-todo/${todo.id}`,{
      method: "PUT",
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({...todo, is_complete: !todo.is_complete})
    })
    .then(response => response.json())
    .then(data => getTodos())
  }

  const addTodo = () => {
    if (textValue) {
      fetch("http://127.0.0.1:8000/api/add-todo",{
        method: "POST",
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({text: textValue, is_complete: false})
      })
      .then(response => response.json())
      .then(data => getTodos())
      setTextValue("")
      setShow(false)
    }
  }

  const deleteTodo = (id) => {
    fetch(`http://127.0.0.1:8000/api/delete-todo/${id}`,{
      method: "DELETE",
      headers: {
        'Content-Type': 'application/json'
      },
    })
    .then(response => response.json())
    .then(data => getTodos())
  }

  return (
    <>
    <Container className="d-flex justify-content-center align-items-center vh-100">
      <ListGroup>
        <ListGroup.Item className="d-flex justify-content-center"><h1>Todos</h1></ListGroup.Item>
        <ListGroup.Item>
          <ButtonGroup>
            <ToggleButton variant="outline-dark" type="radio" checked={checked===1} onClick={()=>setChecked(1)}>
              Incomplete
            </ToggleButton>
            <ToggleButton variant="outline-dark" type="radio" checked={checked===2} onClick={()=>setChecked(2)}>
              Complete
            </ToggleButton>
          </ButtonGroup>
          <Button variant="outline-dark" className="ms-1" onClick={() => setShow(true)}>
            Add
          </Button>
        </ListGroup.Item>
        <ListGroup.Item>
          <ListGroup>
            {todos.filter(todo=>checked===1 && !todo.is_complete || checked===2 && todo.is_complete).map((todo,i)=>(
              <ListGroup.Item className="d-flex justify-content-between" key={i}>
                {todo.text}
                <div className="d-flex align-items-center">
                <Button size="sm" variant="" className="d-flex align-items-center me-1" onClick={() => deleteTodo(todo.id)}>
                <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" className="bi bi-trash3-fill" viewBox="0 0 16 16" as={JSON.stringify(Button)}>
                  <path d="M11 1.5v1h3.5a.5.5 0 0 1 0 1h-.538l-.853 10.66A2 2 0 0 1 11.115 16h-6.23a2 2 0 0 1-1.994-1.84L2.038 3.5H1.5a.5.5 0 0 1 0-1H5v-1A1.5 1.5 0 0 1 6.5 0h3A1.5 1.5 0 0 1 11 1.5Zm-5 0v1h4v-1a.5.5 0 0 0-.5-.5h-3a.5.5 0 0 0-.5.5ZM4.5 5.029l.5 8.5a.5.5 0 1 0 .998-.06l-.5-8.5a.5.5 0 1 0-.998.06Zm6.53-.528a.5.5 0 0 0-.528.47l-.5 8.5a.5.5 0 0 0 .998.058l.5-8.5a.5.5 0 0 0-.47-.528ZM8 4.5a.5.5 0 0 0-.5.5v8.5a.5.5 0 0 0 1 0V5a.5.5 0 0 0-.5-.5Z"/>
                </svg>
                </Button>
                <Form.Check type="checkbox" checked={todo.is_complete} onChange={()=>updateTodo(todo)} />
                </div>
              </ListGroup.Item>
            ))}
          </ListGroup>
        </ListGroup.Item>
      </ListGroup>
    </Container>

    <Modal show={show} onHide={()=>setShow(false)} centered>
      <Modal.Header closeButton><Modal.Title>Add a Todo</Modal.Title></Modal.Header>
      <Modal.Body>
        <Form.Control type="text" placeholder="Example" value={textValue} onChange={(e) => setTextValue(e.target.value)} />
      </Modal.Body>
      <Modal.Footer>
        <Button onClick={addTodo}>Confirm</Button>
      </Modal.Footer>
    </Modal>
    </>
  );
}

export default App;
