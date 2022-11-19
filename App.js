import * as React from 'react';
import { useState } from 'react';
import { StyleSheet, Text, View, Image, TouchableOpacity, ScrollView, Button} from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { Ionicons } from '@expo/vector-icons';
import ReactDOM from 'react-dom';
import star from './src/star.png';
import staroutline from './src/star-outline.png';

//Initialise library from local storage if it exists or create a new one
let library = []
const init = () => {
  let data = localStorage.getItem('library');
  if (data) {
    library = JSON.parse(data);
  }
}
init();

//Home Screen screen that displays the library
const HomeScreen = () => {
  return (
    <View style={styles.container}>
      <BookList/>
    </View>
  );
}

//Delete book from library and update local storage
const deleteBook = (index) => {
  library.splice(index, 1);
  localStorage.setItem("library", JSON.stringify(library));
  
  const root = ReactDOM.createRoot(document.getElementById('root'));
  root.render(<App/>);
}

//display the edit book screen
const showEdit = (index) => {
  const root = ReactDOM.createRoot(document.getElementById('root'));
  root.render(<EditBook index={index}/>);
}

//Edit Book Screen that displays the book and allows the user to edit the rating
const EditBook = ({index}) => {
  //Ratings bar
  const [defaultRating, setDefaultRating] = useState(library[index].rating);
  const [maxRating] = useState([1, 2, 3, 4, 5]);
  const RatingsBar = () => {
    return (
      <View style={styles.ratings}>
        {maxRating.map((item) => {
          return (
            <TouchableOpacity onPress={() => setDefaultRating(item)}>
              <Image
                style={styles.stars}
                source={item <= defaultRating ? star : staroutline}
              />
            </TouchableOpacity>
          );
        })}
      </View>
    );
  };

  return (
    <View style={styles.container}>
      <Text>Edit Book</Text>
      <View>
        <input style={styles.hide} type={"text"} id={"idInput"} defaultValue={library[index].id}></input>
        <Text>Title</Text>
        <input type="text" id="titleInput" defaultValue={library[index].title}></input>
        <br></br>
        <Text style={styles.hide}>Author</Text>
        <input style={styles.hide} type="text" id="authorInput" defaultValue={library[index].author}></input>
        <br></br>
        <Text style={styles.hide}>Genre</Text>
        <input style={styles.hide} type="text" id="genreInput" defaultValue={library[index].genre}></input>
        <br></br>
        <Text>Rating</Text>
        <RatingsBar/>
        <Text style={styles.text}>
          {defaultRating} / 5
        </Text>
        <View style={styles.hide}><input type="text" id="ratingInput" value={defaultRating}></input></View>
        <View style={styles.hide}><input type="text" id="lengthInput" value={library[index].length}></input></View>
        <br></br>
        <Button title="Update" onPress={() => updateBook(index)}></Button>
      </View>
    </View>
  );
}

//update the book in library and update local storage
const updateBook = (index) => {
  const id = library[index].id;
  const title = document.getElementById("titleInput").value
  const author = library[index].author;
  const genre = library[index].genre;
  const rating = document.getElementById("ratingInput").value
  const length = library[index].length;
  
  library[index] = {id, title, author, genre, rating, length}
  localStorage.setItem("library", JSON.stringify(library));
  const root = ReactDOM.createRoot(document.getElementById('root'));
  root.render(<App/>);
}

//BookList component that displays the library
const BookList = () => {
  //Seperate the authors and show if there is an undefined author
  const Authors = (authors) => {
    if (authors == undefined)
      authors = "Unknown";
    else if (authors.length >= 2)
      authors = authors.join(" and ");
    return authors;
  };
    
  return(
    <ScrollView>
      <View style={styles.library}>
        {library.map((book, index) => {
          return(
            <View style={styles.book} key={index}>
              <Text style={styles.title}>
                {book.title}
              </Text>
              <Text style={styles.text}>
                by {Authors(book.author)}
              </Text>
              <Text style={styles.text}>
                Genre: {book.genre}
              </Text>
              <br></br>
              <img src={'http://books.google.com/books/content?id=' + book.id + '&printsec=frontcover&img=1&zoom=1&source=gbs_api'}/>
              <br></br>
              {book.rating == 0 && <Text style={styles.text}>Click the edit button to add your rating!</Text>}
              {book.rating != 0 &&
                <View>
                  <View style={styles.ratings}>
                    {Array.apply(null, {length: book.rating}).map((i) => {
                      return <Image key={i} style={styles.stars} source={star}/>
                    })}
                    {Array.apply(null, {length: 5 - book.rating}).map((i) => {
                      return <Image key={i} style={styles.stars} source={staroutline}/>
                    })}
                  </View>
                  <Text style={styles.text}>{book.rating} / 5</Text>
                </View>
              }
              <View style={styles.buttons}>
                <TouchableOpacity onPress={() => showEdit(index)}>
                  <Ionicons style={styles.button} name="pencil-sharp" size="30px" color={"white"}/>
                </TouchableOpacity>
                <TouchableOpacity onPress={() => deleteBook(index)}>
                  <Ionicons style={styles.button} name="trash-sharp" size="30px" color={"white"}/>
                </TouchableOpacity>
              </View>
            </View> 
            
          ) 
        })}
      </View>
    </ScrollView> 
  )
}

//Add Book from search
const addBook = (id, title, author, genre, rating, length) => {
  const newBook = {id, title, author, genre, rating, length};
  library.push(newBook)
  localStorage.setItem("library", JSON.stringify(library));
  const root = ReactDOM.createRoot(document.getElementById('root'));
  root.render(<App/>);
}

//Add Screen that displays the search results and allows the user to add a book to the library from the search results
const AddScreen = () => {
  //Star Ratings
  const [defaultRating, setDefaultRating] = useState(1);
  const [maxRating] = useState([1, 2, 3, 4, 5]);
  const RatingsBar = () => {
    return (
      <View style={styles.ratings}>
        {maxRating.map((item) => {
          return (
            <TouchableOpacity onPress={() => setDefaultRating(item)}>
              <Image
                style={styles.stars}
                source={item <= defaultRating ? star : staroutline}
              />
            </TouchableOpacity>
          );
        })}
      </View>
    );
  };
  
  const Authors = (authors) => {
    if (authors == undefined)
      authors = "Unknown";
    else if (authors.length >= 2)
      authors = authors.join(" and ");
    return authors;
  };
  
  const [search, setSearch] = useState("");
  const [books, setBooks] = useState([]);
  
  const searchBooks = () => {
    console.log(search);
    fetch("https://www.googleapis.com/books/v1/volumes?q=" + search)
      .then((response) => response.json())
      .then((json) => {
        setBooks(json.items);
      })
      .catch((error) => console.error(error));
  }

  return(
    <View style={styles.search}>
      <Text>Search for your book:</Text>
      <View style={styles.searchbar}>
        <input style={styles.input} type="text" id="searchInput" value={search} onChange={(e) => setSearch(e.target.value)}></input>
        <TouchableOpacity onPress={() => searchBooks()} >
          <Ionicons style={styles.button} name="search-sharp" size="30px" color={"white"}/>
        </TouchableOpacity>
      </View>
        <ScrollView>
          <View style={styles.library}>
            {books.map((book, index) => {
              return(
                <View style={styles.book} key={index}>
                  <Text style={styles.title}>
                    {book.volumeInfo.title}
                  </Text>
                  <Text style={styles.text}>
                    by {Authors(book.volumeInfo.authors)}
                  </Text>
                  <br></br>
                  <img src={'http://books.google.com/books/content?id=' + book.id + '&printsec=frontcover&img=1&zoom=1&source=gbs_api'}/>
                  <br></br>
                  {/*<RatingsBar/>
                    <Text>
                      {defaultRating} / 5
                    </Text>
                  <br></br>*/}
                  <TouchableOpacity onPress={() => addBook(book.id, book.volumeInfo.title, book.volumeInfo.authors, book.volumeInfo.categories, 0, book.volumeInfo.pageCount)}>
                    <Ionicons style={styles.button} name="add" size="30px" color={"white"}/>
                  </TouchableOpacity>

                </View> 
              ) 
            }
          )}
        </View>
      </ScrollView>
    </View>
  );
}

//gets the top authors from the library and displays them
const getTopAuthor = () => {
  let authors = [];
  let topAuthor = [];
  let topAuthorCount = 0;
  for (let i = 0; i < library.length; i++) {
    if (library[i].author == undefined)
      continue;
    for (let j = 0; j < library[i].author.length; j++) {
      if (authors[library[i].author[j]] == undefined)
        authors[library[i].author[j]] = 1;
      else
        authors[library[i].author[j]]++;
    }
  }
  for (let author in authors) {
    if (authors[author] > topAuthorCount) {
      topAuthor = [author];
      topAuthorCount = authors[author];
    }
    else if (authors[author] == topAuthorCount)
      topAuthor.push(author);
  }
  if (topAuthor.length > 1) {
    topAuthor[topAuthor.length - 1] = "and " + topAuthor[topAuthor.length - 1];
  }
  return topAuthor.join(", ");

}

//gets the top genres from the library and displays them
const getTopGenre = () => {
  let genres = [];
  let topGenre = [];
  let topGenreCount = 0;
  for (let i = 0; i < library.length; i++) {
    if (library[i].genre == undefined)
      continue;
    for (let j = 0; j < library[i].genre.length; j++) {
      if (genres[library[i].genre[j]] == undefined)
        genres[library[i].genre[j]] = 1;
      else
        genres[library[i].genre[j]]++;
    }
  }
  for (let genre in genres) {
    if (genres[genre] > topGenreCount) {
      topGenre = [genre];
      topGenreCount = genres[genre];
    }
    else if (genres[genre] == topGenreCount)
      topGenre.push(genre);
  }
  if (topGenre.length > 1) {
    topGenre[topGenre.length - 1] = "and " + topGenre[topGenre.length - 1];
  }
  return topGenre.join(", ");
}

//gets the top length from the library and displays it
const getLongest = () => {
  let longest = 0;
  let title = "";
  for (let i = 0; i < library.length; i++) {
    if (library[i].length > longest) {
      longest = library[i].length;
      title = library[i].title;
    }
  }
  return title + " (" + longest + " pages)";
}

//gets the total number of pages in the library and displays it
const getTotalPages = () => {
  let total = 0;
  for (let i = 0; i < library.length; i++) {
    total += library[i].length;
  }
  return total;
}

//Stats Screen displays the stats of the library
const StatsScreen = () => {
  return (
    <View style={styles.container}>
      <Text style={styles.stats}><Ionicons name="person" size="20px"/> Most Read Author</Text>
      <Text style={styles.text}>{getTopAuthor()}</Text>
      <br></br>
      <Text style={styles.stats}><Ionicons name="heart" size="20px"/> Most Read Genre</Text>
      <Text style={styles.text}>{getTopGenre()}</Text>
      <br></br>
      <Text style={styles.stats}><Ionicons name="book" size="20px"/> Longest Book</Text>
      <Text style={styles.text}>{getLongest()}</Text>
      <br></br>
      <Text style={styles.stats}><Ionicons name="reader" size="20px"/> Total Pages Read</Text>
      <Text style={styles.text}>{getTotalPages()}</Text>
    </View>
  );
}

//Navigation Screen displays the navigation bar at the bottom of the screen and allows the user to navigate between the different screens of the app
let lastUsedScreen = "Library";
const Tab = createBottomTabNavigator();
function App () {
  return (
    <View style={styles.main}>
      <NavigationContainer >
        <Tab.Navigator initialRouteName={lastUsedScreen} screenListeners = {({ route }) => ({ focus: () => lastUsedScreen = route.name })}
        screenOptions={({ route }) => ({
            tabBarIcon: ({ focused, color, size }) => {
              if (route.name === 'Library') {
                return (
                  <Ionicons
                    name={focused ? 'library' : 'library-outline'}
                    size={size}
                    color={color}
                  />
                );
              } else if (route.name === 'Add Books') {
                return (
                  <Ionicons
                    name={focused ? 'add-circle' : 'add-circle-outline'}
                    size={size}
                    color={color}
                  />
                );
              } else if (route.name === 'Statistics') {
                return (
                  <Ionicons
                    name={focused ? 'stats-chart' : 'stats-chart-outline'}
                    size={size}
                    color={color}
                  />
                );
              }
            },
            tabBarInactiveTintColor: 'black',
            tabBarActiveTintColor: '#07BEB8',
          })}
        >
          <Tab.Screen name="Library" component={HomeScreen}/>
          <Tab.Screen name="Add Books" component={AddScreen}/>
          <Tab.Screen name="Statistics" component={StatsScreen}/>
        </Tab.Navigator>
      </NavigationContainer>
    </View>
  );
}
export default App;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#ffffff',
    alignItems: 'center',
    justifyContent: 'center',
    flexWrap: 'wrap',
    width: '100vw',    
  },
  stats: {
    fontSize: 18,
    display: "flex",
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    fontWeight: "bold",
  },
  ratings: {
    justifyContent: 'center',
    flexDirection: 'row',
  },
  stars: {
    width: 30,
    height: 30,
    resizeMode: 'cover',
    filter: 'invert(100) sepia(1) saturate(200) hue-rotate(37deg) brightness(500%) contrast(100%)',
  },
  main: {
    height: '99%',
    width: '100vw',
  },
  hide: {
    display: 'none',
  },
  library: {
    display: 'grid',
    gridTemplateColumns: 'repeat(2, 1fr)',
    height: '100%',
  },
  book: {
    alignItems: 'center',
    margin: '10px',
    border: '1px solid black',
    borderRadius: '10px',
    justifyContent: 'space-between',
  },
  buttons: {
    flexDirection: 'row',
    marginTop: '5px',
    marginBottom : '5px',
  },
  button: {
    backgroundColor: '#07BEB8',
    padding: '5px',
    borderRadius: '5px',
    margin: '5px',
  },
  search: {
    flex: 1,
    backgroundColor: '#ffffff',
    width: '100vw',
    alignItems: 'center',
    JustifyContent: 'center',
  },
  searchbar: {
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'center',
  },
  input: {
    fontSize: 18,
    margin: '5px',
    borderRadius: '5px',
    width: '60%',
  },
  title: {
    fontSize: 16,
    fontWeight: 'bold',
    textAlign: 'center',
    margin: '5px',
  },
  text: {
    fontSize: 14,
    textAlign: 'center',
    margin: '5px',
    width: '100%',
    alignItems: "center",
    flexWrap: "wrap",
  },  
});