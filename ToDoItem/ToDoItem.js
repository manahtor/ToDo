import React from 'react';
import {Text, TouchableOpacity} from 'react-native';
import styles from './ToDoItem.style';

const ToDoItem = ({item, remove, reload}) => {
  const [done, setDone] = React.useState(item.done);

  React.useEffect(() => {
    item.done = done;
    reload();
  }, [done]);

  return (
    <TouchableOpacity
      style={done ? styles.container_passive : styles.container}
      onPress={() => setDone(!done)}
      onLongPress={() => remove(item)}>
      <Text style={done ? styles.description_passive : styles.description}>
        {item.description}
      </Text>
    </TouchableOpacity>
  );
};

export default ToDoItem;
