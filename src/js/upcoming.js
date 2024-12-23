const upcomingAPI = {
  method: "GET",
  headers: {
    accept: "application/json",
    Authorization:
      "Bearer eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiJkNGY1NjJmMmY0ZGMyNzEwNzllZmM2NTJkZTZmYmY2OSIsIm5iZiI6MTczNDIxNzAyMS4zNjMwMDAyLCJzdWIiOiI2NzVlMGQzZDU1MWY2OWY3N2NhZGNhZTAiLCJzY29wZXMiOlsiYXBpX3JlYWQiXSwidmVyc2lvbiI6MX0.4iQa3mHbeX0ibxj0ulYA5zIh01W_4z1bB4a-cCP-Y6A",
  },
};

Promise.all([
  fetch(
    "https://api.themoviedb.org/3/movie/upcoming?language=en-US&page=1",
    upcomingAPI
  ),
  fetch(
    "https://api.themoviedb.org/3/genre/movie/list?language=en",
    upcomingAPI
  ),
])
  .then((responses) => {
    return Promise.all(responses.map((response) => response.json())); // chatgpt ye birden fazla api çağırmayı sormak zorunda kaldım sori :(
  })
  .then((data) => {
    console.log(data);
    const upcoming = data[0].results[0];
    const genres = data[1].genres; // genres array'ini al
    console.log(data[1]);

    if (upcoming && upcoming.id) {
      // Resim
      const upcomingUrl = `https://image.tmdb.org/t/p/w500${upcoming.poster_path}`;

      const upcomingImg = document.querySelector(`#upcoming-image`);
      upcomingImg.style.backgroundImage = `url(${upcomingUrl})`;

      // Başlık
      const upcomingTitle = upcoming.original_title;
      const upcomingTitleChildren = document.querySelector(`#upcoming-title`);
      upcomingTitleChildren.textContent = upcomingTitle;

      // Release Date
      const releasedate = upcoming.release_date;
      const date = document.querySelector(`#date`);
      date.textContent = releasedate;

      // vote (average yazmayı bilmiyormuşum, düzeltmeye üş :3 )
      const voteAvarage = upcoming.vote_average;
      const avarage = document.querySelector(`#vote-average`);
      avarage.textContent = voteAvarage;

      // vote count
      const voteCount = upcoming.vote_count;
      const voteResult = document.querySelector(`#vote-count`);
      voteResult.textContent = voteCount;

      // popularity
      const popularity = upcoming.popularity;
      const popularityResult = document.getElementById(`popularity`);
      popularityResult.textContent = popularity;

      // yeter artık genre yazmayalım şuna niye yazıyoruz genre yazmasak ölür müyüz imdat ya
      const upcomingGenre = upcoming.genre_ids; // upcoming verisi
      const genreList = genres; // genres verisi

      let genreNames = []; // Sonuçları depolayacağımız boş dizi

      // upcomingGenre içindeki her id için döngü
      upcomingGenre.forEach((id) => {
        // genres içindeki her bir nesneyle karşılaştırma
        genreList.forEach((genre) => {
          if (genre.id === id) {
            genreNames.push(genre.name); // eşleşen genre.name'i diziye ekle
          }
        });
      });

      const genreResult = document.querySelector(`.genre`);
      genreResult.textContent = genreNames.join(", "); // dizi elemanlarını virgülle birleştir
    } else {
      console.log("obviously not coming");
    }
  })
  .catch((error) => console.error(error));
