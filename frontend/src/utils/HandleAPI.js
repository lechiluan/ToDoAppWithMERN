import axios from 'axios';

const baseURL = 'http://localhost:5000/';

const getAllToDo = (setToDo) => {
    axios
        .get(baseURL)
        .then(({ data }) => {
            console.log('data --->', data);
            setToDo(data);
        })
        .catch((error) => {
            console.error('Error while fetching ToDo items:', error);
        });
};

const addToDo = (text, setText, setToDo) => {
    axios.post(baseURL + 'save', { text }).then(({ data }) => {
        console.log(data);
        setText("");
        getAllToDo(setToDo);
    }).catch((error) => { console.error('Error while adding ToDo:', error); }
    );
}

const updateToDo = (toDoId, text, setToDo, setText, setUpdate) => {
    axios.post(baseURL + 'update', { _id: toDoId, text }).then(({ data }) => {
        console.log(data);
        setText("");
        setUpdate(false);
        getAllToDo(setToDo);
    }).catch((error) => { console.error('Error while updating ToDo:', error); }
    );
}

const deleteToDo = (toDoId, setToDo) => {
    axios.post(baseURL + 'delete', { _id: toDoId }).then(({ data }) => {
        console.log(data);
        getAllToDo(setToDo);
    }).catch((error) => { console.error('Error while deleting ToDo:', error); }
    );   
}


export { getAllToDo, addToDo, updateToDo, deleteToDo};
