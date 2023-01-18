import React from 'react';
import { StyleSheet, View, FlatList } from 'react-native';
import { List, FAB } from 'react-native-paper';
import { useNavigation } from '@react-navigation/native';
import format from 'date-fns/format'
import { useState, useEffect } from 'react';
import { loadAll } from './store';

// const memos = [
//   {
//     text: "メモメモメモ",
//     createdAt: 1585574700000, // 2020.03.30 22:25
//   },
//   {
//     text: "メモメモメモ",
//     createdAt: 1585567500000, // 2020.03.30 20:25
//   },
//   {
//     text: "長いメモメモメモメモメモメモメモメモメモメモメモメモメモメモ",
//     createdAt: 1585459500000, // 2020.03.29 14:25
//   },
//   {
//     text: "メモメモメモ",
//     createdAt: 1585369500000, // 2020.03.28 13:25
//   },
//   {
//     text: "メモメモメモ",
//     createdAt: 1585275900000, // 2020.03.27 11:25
//   },
// ];

export const MainScreen = () => {
	const navigation = useNavigation();
	const [memos, setMemos] = useState([]);

  const onPressAdd = () => {
    navigation.navigate('Compose'); // (3)
  };
 useEffect(() => {
  const initialize = async () => {
	  const newMemos = await loadAll();
	  setMemos(newMemos);
  };
  const unsubscribe = navigation.addListener('focus', initialize); // (1)

  return unsubscribe;
}, [navigation]);
  return (
    <View style={styles.container}>
      <FlatList
        style={styles.list}
        data={memos} // (1)
        keyExtractor={item => `${item.createdAt}`} // (2)
        renderItem={({ item }) => ( // (3)
         <List.Item
				title={item.text}
				titleNumberOfLines={5}
           description={
            `作成日時: ${format(item.createdAt, 'yyyy.MM.dd HH:mm')}` // (2)
		   }
				descriptionStyle={{ textAlign: 'right' }}
  />
        )}
		  />
		   <FAB
        style={{
          // (2)
          position: 'absolute',
          right: 16,
          bottom: 16,
        }}
        icon="plus"
        onPress={onPressAdd}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  list: {
    flex: 1,
  },
});