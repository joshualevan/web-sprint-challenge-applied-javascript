import axios from 'axios';

const Card = (article) => {
  // TASK 5
  // ---------------------
  // Implement this function, which should return the markup you see below.
  // It takes as its only argument an "article" object with `headline`, `authorPhoto` and `authorName` properties.
  // The tags used, the hierarchy of elements and their attributes must match the provided markup exactly!
  // The text inside elements will be set using their `textContent` property (NOT `innerText`).
  // Add a listener for click events so that when a user clicks on a card, the headline of the article is logged to the console.
  //
  // <div class="card">
  //   <div class="headline">{ headline }</div>
  //   <div class="author">
  //     <div class="img-container">
  //       <img src={ authorPhoto }>
  //     </div>
  //     <span>By { authorName }</span>
  //   </div>
  // </div>
  //
  const cardDiv = document.createElement('div');
  const headlineDiv = document.createElement('div');
  const authorDiv = document.createElement('div');
  const imgContainerDiv = document.createElement('div');
  const authorImg = document.createElement('img');
  const spanName = document.createElement('span');

  cardDiv.appendChild(headlineDiv);
  cardDiv.appendChild(authorDiv);
  authorDiv.appendChild(imgContainerDiv);
  authorDiv.appendChild(spanName);
  imgContainerDiv.appendChild(authorImg);

  cardDiv.classList.add('card');
  headlineDiv.classList.add('headline');
  authorDiv.classList.add('author');
  imgContainerDiv.classList.add('img-container');

  const logHeadline = e => console.log(e.target.textContent);

  headlineDiv.textContent = article.headline;
  headlineDiv.addEventListener('click', logHeadline)
  authorImg.src = article.authorPhoto;
  authorImg.alt = `photo of ${article.authorName}`
  spanName.textContent = article.authorName;

  return cardDiv;
}


const cardAppender = (selector) => {
  // TASK 6
  // ---------------------
  // Implement this function that takes a css selector as its only argument.
  // It should obtain articles from this endpoint: `https://lambda-times-api.herokuapp.com/articles`
  // However, the articles do not come organized in a single, neat array. Inspect the response closely!
  // Create a card from each and every article object in the response, using the Card component.
  // Append each card to the element in the DOM that matches the selector passed to the function.
  //
  axios.get('https://lambda-times-api.herokuapp.com/articles')
  .then(res => {
      const arr = res.data.articles;
      const articleKeys = Object.keys(arr);
      const mappedArticles= articleKeys.map(key => arr[key]);
      mappedArticles.forEach(entry => {
        entry.forEach(book => {
          const card = Card(book);
          document.querySelector(selector).appendChild(card);
        })
      })
    })
  .catch(err => console.log(err));

}


export { Card, cardAppender }