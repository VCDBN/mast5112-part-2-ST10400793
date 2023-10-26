import React, { useState } from 'react';
import { TextInput, Button, View, Text, StyleSheet, Alert } from 'react-native';
import { Picker } from '@react-native-picker/picker';

// Define a TypeScript interface for the book details
interface BookDetails {
  title: string;
  author: string;
  genre: string;
  pages: number;
}

const App = () => {
  // State variables to store book details and statistics
  const [bookTitle, setBookTitle] = useState('');
  const [bookAuthor, setBookAuthor] = useState('');
  const [bookGenre, setBookGenre] = useState(''); // Start with an empty genre
  const [bookPages, setBookPages] = useState('');

  const [lastBookDetails, setLastBookDetails] = useState<BookDetails | null>(null);
  const [totalPagesRead, setTotalPagesRead] = useState(0);
  const [numberOfBooks, setNumberOfBooks] = useState(0);

  // Predefined list of book genres
  const predefinedGenres = [
    'Fantasy',
    'Mystery',
    'Romance',
    'MeloDrama',
    'Fiction',
    'Non-Fiction',
    'Horror',
    'Historical Fiction',
  ];

  // Function to add a new book
  const addBook = () => {
    // Check if the form is valid before adding the book
    if (!isFormValid()) {
      return;
    }

    // Create a new book object
    const newBook: BookDetails = {
      title: bookTitle,
      author: bookAuthor,
      genre: bookGenre,
      pages: parseInt(bookPages, 10),
    };

    // Update state variables and clear the form
    setLastBookDetails(newBook);
    setTotalPagesRead(totalPagesRead + newBook.pages);
    setNumberOfBooks(numberOfBooks + 1);
    clearForm();
  };

  // Function to check if the form is valid
  const isFormValid = () => {
    if (!bookTitle || !bookAuthor || bookGenre === '' || !bookPages) {

      // Show an error message if the form is not valid

      Alert.alert('Error!', 'Please fill in all required fields');
      return false;
    }
    return true;
  };

  // Function to clear the form fields
  const clearForm = () => {
    setBookTitle('');
    setBookAuthor('');
    setBookGenre('');
    setBookPages('');
  };

  return (
    <View style={styles.container}>
      {/* Heading for the app */}
      <Text style={styles.heading}>HOME</Text>
      {/* Input fields for book details */}
      <TextInput
        style={styles.input}
        placeholder="Title:"
        value={bookTitle}
        onChangeText={(text) => setBookTitle(text)}
      />
      <TextInput
        style={styles.input}
        placeholder="Author:"
        value={bookAuthor}
        onChangeText={(text) => setBookAuthor(text)}
      />
      <Picker
        style={styles.input}
        selectedValue={bookGenre}
        onValueChange={(itemValue) => setBookGenre(itemValue)}
      >
        {/* Default "Select Genre" option */}
        <Picker.Item label="Genre:" value="" />
        {/* Map predefined genres to Picker items */}
        {predefinedGenres.map((genre, index) => (
          <Picker.Item key={index} label={genre} value={genre} />
        ))}
      </Picker>
      <TextInput
        style={styles.input}
        placeholder="No. of Pages"
        value={bookPages}
        onChangeText={(text) => setBookPages(text)}
        keyboardType="numeric"
      />
      {/* Button to add a book */}
      <Button title="Add Book:" onPress={addBook} />

      {lastBookDetails && (
        // Display last book details if available
        <View style={styles.bookDetails}>
          <Text style={styles.subheading}>Last Book Details:</Text>
          <Text>Title: {lastBookDetails.title}</Text>
          <Text>Author: {lastBookDetails.author}</Text>
          <Text>Genre: {lastBookDetails.genre}</Text>
          <Text>Pages: {lastBookDetails.pages}</Text>
        </View>
      )}
      {/* Display statistics section */}
      <View style={styles.statistics}>
        <Text style={styles.subheading}>Statistics:</Text>
        <Text>Total Number of Pages Read: {totalPagesRead}</Text>
        <Text>
          Average Number of Pages Read:{' '}
          {numberOfBooks > 0 ? (totalPagesRead / numberOfBooks).toFixed(2) : 0}
        </Text>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({ //Meta  Platforms, Inc., 2022c) 
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#ECE8D4',
    padding: 20,
  },
  
  heading: {
    fontSize: 30,
    fontWeight: 'bold',
    marginBottom: 20,
    backgroundColor: 'green',
    color: 'white',
    borderRadius: 20,
    padding: 10,
  },

  input: {
    height: 50,
    fontSize: 18,
    borderColor: 'green',
    borderRadius: 10,
    borderWidth: 1,
    width: 300,
    marginBottom: 10,
    padding: 10,
    backgroundColor: 'lightgreen',
    color: 'black',
  },
 
  
  bookDetails: {
    marginTop: 20,
    padding: 10,
  },
  subheading: {
    fontSize: 20,
    fontWeight: 'bold',
  },
  statistics: {
    marginTop: 20,
    padding: 10,
  },
});

export default App;

//Ryan. 2019. Getting Started with React Native and Visual Studio 
//Code on Windows: Hello World sample app. [Online]. Available  
//at: https://www.ryadel.com/en/react-native-visual-studio-codewindows-hello-world-sample-app/ [Accessed 13 October 2023]

//Dabit, N. 2019. Chapter 1 in React Native in Action: Developing  
//iOS and Android apps with JavaScript. Manning. [Online]. 
//Available at: https://livebook.manning.com/book/react-nativein-action/chapter-1/ [Accessed 13 October 2023.]



