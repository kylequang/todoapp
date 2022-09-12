import {
  View,
  Text,
  StyleSheet,
  TextInput,
  FlatList,
  TouchableOpacity,
  Alert,
  Modal,
} from 'react-native';
import CheckBox from '@react-native-community/checkbox';
import React, {useEffect, useState} from 'react';
import {useDispatch, useSelector} from 'react-redux';
import {
  addNewTaskAction,
  removeTaskAction,
  getTaskList,
  updateStatusAction,

} from '../redux/action';
import EmptyData from '../components/EmptyData';
import IconButton from '../components/IconButton';
import {DoneTask, DoNot} from '../redux/constants';

export default function ToDoScreen() {
  const [newTask, setNewTask] = useState('');
  const dispatch = useDispatch();
  const data = useSelector(state => state);
  useEffect(() => {
    dispatch(getTaskList());
  }, []);

  const renderListTask = () => {
    return (
      <FlatList
        data={
          statusFilter.select === 'done'
            ? data.done
            : statusFilter.select === 'all'
            ? data.tasks
            : data.doN
        }
        renderItem={renderItem}
      />
    );
  };
  const renderItem = ({item}) => {
    return (
      <View style={styles.row}>
        <CheckBox
          value={item.done}
          boxType="square"
          disabled={item.done ? true : false}
          onChange={() => dispatch(updateStatusAction(item))}
        />
        <Text style={styles.title}>{item.title}</Text>
        {item.done === true ? null : (
          <IconButton icon="closecircle" onPress={() => removeTask(item)} />
        )}
      </View>
    );
  };

  const addTodo = () => {
    if (newTask == '') {
      Alert.alert('Error', 'Empty Task ???');
    } else {
      dispatch(
        addNewTaskAction({id: data.tasks[data.tasks.length-1].id+1, title: newTask, status: ''}),
      );
      setNewTask('');
    }
  };

  const removeTask = item => {
    dispatch(removeTaskAction(item));
  };

  const [statusFilter, setStatusFilter] = useState({
    list: [
      {
        id: 'all',
        value: 'All',
      },
      {
        id: 'done',
        value: 'Done',
      },
    ],
    select: '',
  });
  const handleFilter = item => {

    if (statusFilter.select === item.id) {
      statusFilter.select = '';
      dispatch(getTaskList());
    } else {
      setStatusFilter(preState => {
        return {...preState, select: item.id};
      });
    }
  };
  return (
    <View>
      <View style={{height: '93%'}}>
        <View style={styles.row}>
          <TextInput
            style={styles.textInput}
            placeholder="Add new task"
            onChangeText={setNewTask}
            value={newTask}
          />
          <IconButton icon="plus" onPress={addTodo} />
        </View>
        {
          // ko có task nào và ko có click status nào 
        data.doN.length == 0 && statusFilter.select ==''? <EmptyData /> : renderListTask()} 

      </View>
      <View style={{flexDirection: 'row', justifyContent: 'space-around'}}>
        {statusFilter.list.map(item => (
          <View style={styles.column} key={item.id}>
            {console.log('run filter')}
            <Text>{item.value}</Text>
            <CheckBox
              value={statusFilter.select === item.id}
              onChange={() => handleFilter(item)}
            />
          </View>
        ))}
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  row: {
    margin: 15,
    padding: 10,
    flexDirection: 'row',
    borderRadius: 12,
    justifyContent: 'space-between',
    alignItems: 'center',
    alignContent: 'center',
    backgroundColor: '#deb887',
  },
  column: {
    flexDirection: 'column',
    alignItems: 'center',
  },
  textInput: {
    borderWith: 2,
    borderColor: 'gray',
    width: '85%',
    borderWidth: 1,
    borderRadius: 10,
    padding: 10,
  },

  mainInput: {
    borderWidth: 1,
    height: 55,
    width: 0.9,
    padding: 10,
    margin: 10,
    alignItems: 'center',
    borderRadius: 9,
  },
  todoList: {
    borderWidth: 1,
    borderRadius: 10,
    width: 0.8,
    height: 40,
  },
  todoView: {
    flexDirection: 'row',
    margin: 10,
    padding: 5,
  },
  title: {
    width: '85%',
    paddingLeft: 15,
  },
  removeTask: {
    backgroundColor: 'red',
    borderRadius: 4,
    alignItems: 'center',
    justifyContent: 'center',
    margin: 4,
    height: 20,
    width: '10%',
  },
});
