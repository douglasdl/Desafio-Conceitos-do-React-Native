import React, { useState } from 'react';
import { Alert, StyleSheet, View } from 'react-native';

import { Header } from '../components/Header';
import { Task, TasksList } from '../components/TasksList';
import { TodoInput } from '../components/TodoInput';

export type EditTaskArgs = {
  taskId: number; 
  taskNewTitle: string;
}

export function Home() {
  const [tasks, setTasks] = useState<Task[]>([]);

  function handleAddTask(newTaskTitle: string) {
    //TODO - add alert for adding item with already existing title
    const existingTitle = tasks.find(item => item.title === newTaskTitle) ? true : false;
      
    if(existingTitle) {
      Alert.alert(
        "Task já cadastrada",
        "Você não pode cadastrar uma task com o mesmo nome",
        [
          { text: "OK", onPress: () => console.log("OK Pressed") }
        ]
      );
    } else {
      //TODO - add new task
      const newTask = {
        id: new Date().getTime(),
        title: newTaskTitle,
        done: false,
      }
      setTasks(oldTasks => [...tasks, newTask]);
    }
  }

  function handleToggleTaskDone(id: number) {
    //TODO - toggle task done if exists
    const updatedTasks = tasks.map(task => ({ ...task }))
    const foundItem = updatedTasks.find(item => item.id === id);
    if(!foundItem) {
      return;
    }
    foundItem.done = !foundItem.done;
    setTasks(updatedTasks);
  }

  function handleRemoveTask(id: number) {
    //TODO - add alert to confirm removing task
      Alert.alert(
        "Remover item",
        "Tem certeza que você deseja remover esse item?",
        [
          { 
            style: "cancel",
            text: "Não", 
            onPress: () => console.log("OK Pressed") },
          { 
            style: "destructive",
            text: "sim", 
            onPress: () => {
              console.log("OK Pressed")
              //TODO - remove task from state
              const updatedTasks = tasks.filter(task => task.id !== id);
              setTasks(updatedTasks);
            }
          }
        ]
      );
  }

  //TODO - Edit task function
  function handleEditTask({ taskId, taskNewTitle }: EditTaskArgs ) {
    const updatedTasks = tasks.map(task => ({ ...task }))
    const foundItem = updatedTasks.find(item => item.id === taskId);
    if(!foundItem) {
      return;
    }
    foundItem.title = taskNewTitle;
    setTasks(updatedTasks);
  }


  return (
    <View style={styles.container}>
      <Header tasksCounter={tasks.length} />

      <TodoInput addTask={handleAddTask} />

      <TasksList 
        tasks={tasks} 
        toggleTaskDone={handleToggleTaskDone}
        editTask={handleEditTask}
        removeTask={handleRemoveTask} 
      />
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#EBEBEB'
  }
})