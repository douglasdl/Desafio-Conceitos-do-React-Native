import React, { useEffect, useRef, useState } from 'react';
import { View, StyleSheet, Image, TouchableOpacity, TextInput } from 'react-native';
import Icon from 'react-native-vector-icons/Feather';
import trashIcon from '../assets/icons/trash/trash.png';
import editIcon from '../assets/icons/edit/edit.png';
import { EditTaskArgs } from '../pages/Home';
import { Task } from './TasksList';


interface TaskItemProps {
    task: Task;
    toggleTaskDone: (id: number) => void;
    editTask: ({ taskId, taskNewTitle}: EditTaskArgs) => void;
    removeTask: (id: number) => void;
}



export function TaskItem( {task, toggleTaskDone, editTask, removeTask}:TaskItemProps ) {
    const [isEditing, setIsEditing] = useState(false);
    const [newTitle, setNewTitle] = useState(task.title);
    const textInputRef = useRef<TextInput>(null)

    function handleStartEditing() {
        setIsEditing(true);
    }

    function handleCancelEditing() {
        setNewTitle(task.title);
        setIsEditing(false);
    }

    function handleSubmitEditing() {
        editTask({taskId: task.id, taskNewTitle: task.title});
        setIsEditing(false);
    }

    useEffect(() => {
        if (textInputRef.current) {
            if (isEditing) {
                textInputRef.current.focus();
            } else {
                textInputRef.current.blur();
            }
        }
    }, [isEditing])

    return (
        <View style={styles.container}>
            <View style={ styles.infoContainer}>
                <TouchableOpacity
                    activeOpacity={0.7}
                    style={styles.taskButton}
                    //TODO - use onPress (toggle task) prop
                    onPress={() => toggleTaskDone(task.id)}

                >
                    <View 
                        //TODO - use style prop 
                        style={task.done ? styles.taskMarkerDone : styles.taskMarker}
                    >
                        { task.done && (
                            <Icon 
                                name="check"
                                size={12}
                                color="#FFF"
                            />
                        )}
                    </View>

                    <TextInput 
                        //TODO - use style prop
                        value={newTitle}
                        onChangeText={setNewTitle}
                        editable={isEditing}
                        onSubmitEditing={handleSubmitEditing}
                        style={task.done ? styles.taskTextDone : styles.taskText}
                        ref={textInputRef}
                    />
                </TouchableOpacity>
            </View>
            
            <View style={ styles.iconsContainer } >
                { isEditing ? (
                    <TouchableOpacity
                        onPress={handleCancelEditing}
                    >
                        <Icon name="x" size={24} color="#b2b2b2" />
                    </TouchableOpacity>
                ) : (
                    <TouchableOpacity
                        onPress={handleStartEditing}
                    >
                        <Image source={editIcon} />
                    </TouchableOpacity>
                ) }

                <View 
                    style={ styles.iconsDivider }
                />
                <TouchableOpacity
                    //TODO - use onPress (remove task) prop
                    onPress={() => removeTask(task.id)}
                    disabled={isEditing}
                >
                    <Image source={trashIcon} style={{ opacity: isEditing ? 0.2 : 1 }} />
                </TouchableOpacity>
            </View>
        </View>
    )
}

const styles = StyleSheet.create({
    taskButton: {
        flex: 1,
        paddingHorizontal: 24,
        paddingVertical: 15,
        marginBottom: 4,
        borderRadius: 4,
        flexDirection: 'row',
        alignItems: 'center'
    },
    taskMarker: {
        height: 16,
        width: 16,
        borderRadius: 4,
        borderWidth: 1,
        borderColor: '#B2B2B2',
        marginRight: 15,
        alignItems: 'center',
        justifyContent: 'center'
    },
    taskText: {
        color: '#666',
        fontFamily: 'Inter-Medium'
    },
    taskMarkerDone: {
        height: 16,
        width: 16,
        borderRadius: 4,
        backgroundColor: '#1DB863',
        marginRight: 15,
        alignItems: 'center',
        justifyContent: 'center'
    },
    taskTextDone: {
        color: '#1DB863',
        textDecorationLine: 'line-through',
        fontFamily: 'Inter-Medium'
    },
    container: {
        flex: 1, 
        flexDirection: 'row', 
        alignItems: 'center', 
        justifyContent: 'space-between',
    },
    infoContainer: {
        flex: 1,
    },
    iconsContainer: {
        flexDirection: 'row',
        alignItems: 'center',
        paddingLeft: 12,
        paddingRight: 24
    },
    iconsDivider: {
        height: 24,
        width: 1,
        backgroundColor: 'rgba(196, 196, 196, 0.24)',
        marginHorizontal: 12,
    }
})