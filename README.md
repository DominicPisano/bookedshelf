<p align="center">
    <a href="https://bookedshelf.dominicpisano.com">
        <picture>
            <source media="(prefers-color-scheme: dark)" srcset="https://raw.githubusercontent.com/DominicPisano/bookedshelf/main/src/BookedShelfBannerDark.png">
            <source media="(prefers-color-scheme: light)" srcset="https://raw.githubusercontent.com/DominicPisano/bookedshelf/main/src/BookedShelfBannerLight.png">
            <img src="https://raw.githubusercontent.com/DominicPisano/bookedshelf/main/src/BookedShelfBannerLight.png">
        </picture>
    </a>
    <p align="center">BookedShelf is a CRUD app made with React Native that allows the user to add, edit, and delete books from their library. The user can also search for books using the Google Books API and view the statistics of their library, including the top author and genre in the library.</p>
    <p align="center"><a href="https://bookedshelf.dominicpisano.com">Live Demo</a></p>
</p>

# Technical Stack
- [Expo](https://expo.dev/)
- [React Native](https://reactnative.dev/)
- [React Navigation](https://reactnavigation.org/)
- [ReactDOM](https://reactjs.org/docs/react-dom.html)
- [Google Books API](https://developers.google.com/books/)

# Features
- Library that uses the browser's local storage to show all books that added to it.
- Searchbar that uses Google Books API to populate results with books that can be added to the libray.
- Ability to edit a book in the library to add a rating or edit the title.
- Statistics page that show the top author and genre, as well as the longest book and total number of pages of all the books in the library.

# Installation
1. Clone the repository:
```
git clone https://github.com/DominicPisano/bookedshelf.git
```
2. Navigate to the main directory:
```
cd bookedshelf
```
3. Install dependencies:
```
npm install
```
4. Start the webpack dev server:
```
npx expo start --web
```
5. BookedShelf will now be hosted at [localhost:19006](https://localhost:19006).

# Screenshots

<p align="center">
    <img src="https://raw.githubusercontent.com/DominicPisano/bookedshelf/main/src/Library.PNG" width="32%">
    <img src="https://raw.githubusercontent.com/DominicPisano/bookedshelf/main/src/Edit.PNG" width="32%">
    <img src="https://raw.githubusercontent.com/DominicPisano/bookedshelf/main/src/LibraryEdited.PNG" width="32%">
    <img src="https://raw.githubusercontent.com/DominicPisano/bookedshelf/main/src/Search.PNG" width="32%">
    <img src="https://raw.githubusercontent.com/DominicPisano/bookedshelf/main/src/SearchResults.PNG" width="32%">
    <img src="https://raw.githubusercontent.com/DominicPisano/bookedshelf/main/src/Stats.PNG" width="32%">
</p>

