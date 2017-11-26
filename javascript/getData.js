
const ul = document.getElementById('daily-usage');
const url = 'https://v4.en-trak.com/apis/usages/tts/total/?date=2017-09-28&format=api&period=day';
fetch(url)
.then((resp) => resp.json())
.then(function(data) {
  let usage = data.results;
  return authors.map(function(author) {
    let h1 = createNode('h1');
       
    span.innerHTML = `${author.name.first} ${author.name.last}`;
    append(h1, usage);
    
  })
})
.catch(function(error) {
  console.log(error);
});   