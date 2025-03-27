import {
  Button,
  Modal,
  StyleSheet,
  Switch,
  Text,
  TextInput,
  View,
} from 'react-native';
import React, {useEffect, useState} from 'react';
import {useCourseStore} from '../stores/authStore';

const Courses = () => {
  const {courses, addCourse, removeCourse, toggleStatus} = useCourseStore(
    state => state,
  );

  const [modelStatus, setModelStatus] = useState(courses.length === 0);
  const [courseName, setCourseName] = useState('');
  const toggleModelStatus = () => {
    setModelStatus(!modelStatus);
  };
  const handleAddCourse = () => {
    // Add course to the list
    addCourse({
      id: Date.now(),
      name: courseName,
      status: false,
    });
    toggleModelStatus();
    setCourseName('');
  };

  useEffect(() => {
    if (courses.length === 0) {
      setModelStatus(true);
    }
  }, [courses]);
  return (
    <View style={{}}>
      <View style={{flexDirection: 'row', justifyContent: 'space-between'}}>
        <Text style={{textAlign: 'center'}}>Courses</Text>
        <Button title="Add Course +" onPress={toggleModelStatus} />
      </View>

      {courses.length > 0 &&
        courses.map(course => (
          <View
            key={course.id}
            style={{flexDirection: 'row', justifyContent: 'space-between'}}>
            <Text>{course.name}</Text>
            <View style={{flexDirection: 'row', gap: 10}}>
              <Button
                title="Delete Course"
                onPress={() => removeCourse(course.id)}
              />
              <Switch
                value={course.status}
                onChange={() => toggleStatus(course.id)}
              />
            </View>
          </View>
        ))}

      <Modal
        onPress={toggleModelStatus}
        visible={modelStatus}
        style={{
          flex: 1,
          justifyContent: 'center',
          alignItems: 'center',
          backgroundColor: 'rgba(93, 20, 20, 0.5)',
        }}>
        <View
          style={{
            flex: 1,
            justifyContent: 'center',
            alignItems: 'center',
            backgroundColor: 'gray',
            gap: 20,
          }}>
          <Text>Enter course</Text>

          <TextInput
            placeholder="Course Name"
            value={courseName}
            onChangeText={setCourseName}
          />

          <Button title="Add Course" onPress={handleAddCourse} />
        </View>
      </Modal>
    </View>
  );
};

export default Courses;

const styles = StyleSheet.create({});
