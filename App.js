import React, {useState, useEffect} from 'react';
import {
  SafeAreaView,
  View,
  Text,
  FlatList,
  StyleSheet,
  TextInput,
  TouchableOpacity,
} from 'react-native';
import ToDoItem from './components/ToDoItem';

const data = [
  {id: 1, done: false, description: 'Örnek TODO 1'},
  {id: 2, done: false, description: 'Örnek TODO 2'},
];

const App = () => {
  // Dizinin yenilenmeme problemine çözüm -> https://beta.reactjs.org/learn/updating-arrays-in-state
  const [todos, setTodos] = useState(data);
  const [count, setCount] = useState(0);
  const [addingText, onAddingText] = useState('');

  function reloadCount() {
    setCount(todos.filter(todo => todo.done === false).length);
  }

  // ToDo sayısı değiştikçe, sayacı güncelle
  useEffect(() => {
    reloadCount();
  }, [todos]);

  const addTodo = () => {
    const new_id =
      todos.length > 0
        ? todos.reduce((acc, todo) => (acc > todo.id ? acc : todo.id)) + 1
        : 1;
    setTodos(todos.concat({id: new_id, done: false, description: addingText}));
    onAddingText('');
  };

  const removeTodo = item => {
    // Yeni liste dönebilsin diye, silinen item hariç tüm listeyi alıyoruz
    setTodos(todos.filter(todo => todo !== item));
  };

  const renderItem = ({item}) => (
    <ToDoItem item={item} remove={removeTodo} reload={reloadCount} />
  );
  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.title_container}>
        <Text style={styles.title}>Yapılacaklar</Text>
        <Text style={styles.count}>{count}</Text>
      </View>
      <FlatList
        keyExtractor={item => item.id.toString()}
        data={todos}
        renderItem={renderItem}
      />

      <View style={styles.save_container}>
        <TextInput
          style={styles.textinput}
          placeholder="Yapılacak..."
          onChangeText={text => onAddingText(text)}
          value={addingText}
        />
        <TouchableOpacity
          onPress={addTodo}
          style={
            addingText.length > 0
              ? styles.add_button
              : styles.add_button_disable
          }>
          <Text style={styles.add_button_text}>Kaydet</Text>
        </TouchableOpacity>
      </View>
    </SafeAreaView>
  );
};

export default App;

const styles = StyleSheet.create({
  container: {
    backgroundColor: '#102027',
    flex: 1,
  },
  title_container: {
    flexDirection: 'row',
    margin: 10,
  },
  title: {
    flex: 1,
    color: 'orange',
    fontSize: 30,
    fontWeight: 'bold',
  },
  count: {
    color: 'orange',
    fontSize: 30,
  },

  save_container: {
    backgroundColor: '#37474f',
    margin: 10,
    borderRadius: 15,
  },
  textinput: {
    padding: 10,
    margin: 5,
    borderBottomWidth: 1,
    borderBottomColor: '#839ca9',
  },
  add_button: {
    backgroundColor: 'orange',
    padding: 10,
    borderRadius: 10,
    margin: 10,
  },
  add_button_disable: {
    backgroundColor: '#808080',
    padding: 10,
    borderRadius: 10,
    margin: 10,
  },
  add_button_text: {
    textAlign: 'center',
    fontSize: 18,
    fontWeight: 'bold',
  },
});
