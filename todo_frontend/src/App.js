import ToDoList from './components/ToDoList';

function App() {
  return (
    <div className='App'>
      <header className='App-header'>
        <link
          rel='stylesheet'
          href='https://fonts.googleapis.com/css?family=Roboto:300,400,500,700&display=swap'
        />
        <link
          rel='stylesheet'
          href='https://fonts.googleapis.com/icon?family=Material+Icons'
        />
        <ToDoList />
      </header>
    </div>
  );
}

export default App;
