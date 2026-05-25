import React, { useState } from 'react'; // En üst satır TAM OLARAK böyle olmalı
function App() {
  const [todos, setTodos] = useState([
    { id: 1, text: "React ödevine başladım!" },
  ]);
  const [inputValue, setInputValue] = useState("");
  const [editId, setEditId] = useState(null);

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!inputValue.trim()) return;
    if (editId) {
      setTodos(todos.map(t => t.id === editId ? { ...t, text: inputValue } : t));
      setEditId(null);
    } else {
      setTodos([...todos, { id: Date.now(), text: inputValue }]);
    }
    setInputValue("");
  };

  const deleteTodo = (id) => setTodos(todos.filter(t => t.id !== id));

  return (
    <div className="min-h-screen bg-slate-900 text-white p-10">
      <div className="max-w-md mx-auto bg-slate-800 p-6 rounded-xl shadow-xl">
        <h1 className="text-2xl font-bold mb-4 text-center">Görev Yöneticisi</h1>
        <form onSubmit={handleSubmit} className="flex gap-2 mb-4">
          <input 
            type="text" 
            value={inputValue}
            onChange={(e) => setInputValue(e.target.value)}
            className="flex-1 bg-slate-700 p-2 rounded text-white"
            placeholder="Görev ekle..."
          />
          <button className="bg-blue-600 px-4 py-2 rounded">{editId ? 'Güncelle' : 'Ekle'}</button>
        </form>
        <ul className="space-y-2">
          {todos.map(todo => (
            <li key={todo.id} className="flex justify-between bg-slate-700 p-3 rounded">
              {todo.text}
              <div className="flex gap-2">
                <button onClick={() => {setEditId(todo.id); setInputValue(todo.text)}} className="text-blue-400">Düzenle</button>
                <button onClick={() => deleteTodo(todo.id)} className="text-red-400">Sil</button>
              </div>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
}

export default App;