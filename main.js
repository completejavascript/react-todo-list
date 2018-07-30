const ITEMS_TODO = "items-todo";

class TodoApp extends React.Component {
  constructor(props) {
    super(props);
    
    const items = localStorage.getItem(ITEMS_TODO);
    this.state = { 
      items: items ? JSON.parse(items) : [], 
      text: '' 
    };
    
    this.handleChange = this.handleChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
    this.handleDelete = this.handleDelete.bind(this);
  }

  render() {
    return (
      <div className="App">
        <h1 className="App-title">TODO</h1>
        <p className="App-subtitle">
          Simple Todo App using React by <a target="_blank" href="http://about.phamvanlam.com">Lam Pham</a>.
        </p>
        <TodoList 
           items={this.state.items} 
           handleDelete={this.handleDelete}
        />
        <TodoForm 
           handleChange={this.handleChange} 
           handleSubmit={this.handleSubmit} 
           text={this.state.text}
           items={this.state.items} 
        />
      </div>
    );
  }

  handleChange(e) {
    this.setState({ 
      text: e.target.value 
    });
  }
  
  handleDelete(e) {
    const item = e.target;
    const itemID = Number(item.getAttribute("itemID"));
    const newTodoItems = this.state.items.filter(item => item.id !== itemID);
    
    this._updateItemsState(newTodoItems);
  }

  handleSubmit(e) {
    e.preventDefault();
    
    if (!this.state.text.length) {
      return;
    }
    
    const newItem = {
      text: this.state.text,
      id: Date.now()
    };
    const newTodoItems = this.state.items.concat(newItem);
    
    this._updateItemsState(newTodoItems);
  }
  
  _updateItemsState(newTodoItems) {
    this.setState({
      items: newTodoItems,
      text: ''
    });
    localStorage.setItem(ITEMS_TODO, JSON.stringify(newTodoItems));
  }
}

class TodoList extends React.Component {
  render() {
    return (
      <div className="List">
        {
          this.props.items.map(item => (
            <TodoListItem 
              key={item.id} 
              itemID={item.id}
              text={item.text}
              handleDelete={this.props.handleDelete}
            />
          ))
        }
      </div>
    );
  }
}

class TodoListItem extends React.Component {
  render() {
    return (
      <div className="List-item">
        <p className="List-item-content">{this.props.text}</p>
        <p className="List-item-delete" onClick={this.props.handleDelete} itemID={this.props.itemID}>X</p>
      </div>
    );
  }
}

class TodoForm extends React.Component {
  render() {
    return (
      <form className="Form" onSubmit={this.props.handleSubmit}>
        <div className="Form-label">
          <label htmlFor="new-todo">
            What needs to be done?
          </label>
        </div>
        <div className="Form-input-btn">
          <input
            id="new-todo"
            onChange={this.props.handleChange}
            value={this.props.text}
          />
          <button>
            Add #{this.props.items.length + 1}
          </button>
        </div>
      </form>
    );
  }
}

const rootNode = document.querySelector("#root");
ReactDOM.render(<TodoApp />, rootNode);
