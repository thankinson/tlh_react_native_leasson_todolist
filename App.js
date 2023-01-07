import { useState } from 'react';
import { StyleSheet, View, FlatList, Button } from 'react-native';
import { StatusBar } from "expo-status-bar";

import GoalItem from './components/GoalItem';
import GoalInput from './components/GoalInput';

export default function App() {
  const [modalIsVisable, setModalIsVisable] = useState(false);
  const [courseGoals, setCourseGoals] = useState([]);

  function startAddGoalHandler() {
    setModalIsVisable(true)
  };

  function endAddGoalHandler() {
    setModalIsVisable(false);
  };

  function addGoalHandler(enteredGoalText) {
    // setCourseGoals([...courseGoals, enteredGoalText]) //not best way to update state
    setCourseGoals( currentCouerseGoals => [
                    ...currentCouerseGoals, 
                    {
                      text: enteredGoalText, 
                      id: Math.random().toString()
                    }]);
    endAddGoalHandler();
  };

  function deleteGoalHandler(id){
    setCourseGoals(currentCouerseGoals => {
      return currentCouerseGoals.filter((goal) => goal.id !== id);
    });
  };

  return (
    <>
    <StatusBar style='light' />
    <View style={styles.appContainer}>
      <Button title='Add New Goal' color='#5e0acc' 
        onPress={startAddGoalHandler} />
      <GoalInput visible={modalIsVisable} onAddGoal={addGoalHandler}  onCancel={endAddGoalHandler} />
      <View style={styles.goalsContainer}>
        <FlatList 
          data={courseGoals} 
          renderItem={(itemData) => {
            return (
              <GoalItem text={itemData.item.text} 
                        id={itemData.item.id}
                        
                        onDeleteItem={deleteGoalHandler} 
                        />
              )
          }}
          keyExtractor={(item, index) => {
            return item.id;
          }}
          />
      </View>
    </View>
    </>
  );
};

const styles = StyleSheet.create({
  appContainer:{
    flex: 1,
    paddingTop: 50,
    paddingHorizontal: 16,
    backgroundColor: '#1e085a',
  },
  goalsContainer: {
    flex: 5,
  },
});


