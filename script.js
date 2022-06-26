  const className = [
    ".card-main",
    ".flag",
    ".name-country",
    ".popular",
    ".region",
    ".capital"
  ];
  const [cardMain, flag, nameCountry, popula, region, capital] = className.map(
    (classItem) => {
      return document.querySelector(classItem);
    }
  );
  const loading = document.querySelector(".loading");
  let dataEx;
  function loadData(dataEx) {
    let html = [];
    for (let i = 0; i < dataEx?.length; i++) {
      html.push(`<div class="country-card dark-theme-light1" value="${dataEx[i][1]}">
                      <img src="${dataEx[i][0]}" alt="" class="flag">
                      <div class="infor">
                          <h3 class="name-country">${dataEx[i][1]}</h3>
                          <div class="info-country">
                              <p class="popular"> <strong>Population:</strong> ${dataEx[i][2]}
                              </p>
                              <p class="region"> <strong>Region: </strong>${dataEx[i][3]}</p>
                              <p class="capital"> <strong> Capital: </strong>${dataEx[i][4]}</p>
                          </div>
                      </div>
                  </div>`);
    }
    cardMain.innerHTML = html.join("");
  }
  let detalInfo = document.querySelector('.detal-info')
  function loadDetal(detal) {
    let html = [];
    for (let i = 0; i < detal?.length; i++) {
      html.push(`<img src="${detal[i][0]}" alt="" class="detal-flag">
      <div class="infor">
          <h3 class="name-country info-country-detal">${detal[i][1]}</h3>
          <div class="info-country-detal" style="margin-top:2rem;">
              <p class="capital"> <strong> Native Name: </strong>${detal[i][2]}</p>

              <p class="popular"> <strong>Population:</strong> ${detal[i][3]}
              </p>
              <p class="region"> <strong>Region:</strong> ${detal[i][4]}</p>
              <p class="capital"> <strong> Sub Region: </strong> ${detal[i][4]}</p>

              <p class="capital"> <strong> Capital:</strong> ${detal[i][5]}</p>
          </div>
          <div class="info-country-detal" style="margin-top:2rem;">
              <p class="capital"> <strong> Top Level Domain: </strong> ${detal[i][6]}</p>
              <p class="region"> <strong>Currencies: </strong>${detal[i][7]}</p>
              <p class="capital"> <strong> Languages: </strong> ${detal[i][8]}</p>
          </div>
          <div class="info-country-detal" style="margin-top:2rem ;">
              <h4 style="font-size: 18px;">Boder Countries: </h4>
              <div class="border-country">
                  <div class="boder-country-box">
                      Lao
                  </div>
              </div>

          </div>
      </div>`);
    }
    detalInfo.innerHTML = html.join("");
  }
  function detalCountry(name) {
      fetch("https://restcountries.com/v3.1/name/" + name)
      .then((ApiDetal)=>{
        return ApiDetal.json();
      })
      .then((data) =>{
          let dataDetal = data.map((arr) => {
              return [
                arr.flags.svg,
                arr.name.common,
                arr.population,
                arr.region,
                arr.subregion,
                arr.tld,
                arr.capital
              ]
          })
          return dataDetal;
      })
      .then((data) => {
          console.log(data)
          loadDetal(data)
      })
  }
  let apiCountry = fetch("https://restcountries.com/v3.1/all")
    .then((restApi) => {
      return restApi.json();
    })
    .then((data) => {
      console.log(data);
      dataEx = data.map((arr) => {
        return [
          arr.flags.svg,
          arr.name.common,
          arr.population,
          arr.region,
          arr.capital
        ];
      });
      return dataEx;
    })
    .then((data) => {
      loadData(data);
      return data;
    })
    .then((data) => {
      cardClick(data.length)
    })

  // Tạo sự kiện Onclick cho các thẻ được tạo ra
  function cardClick(number) {
    let CountryCard = document.querySelectorAll(".country-card");
    let nameCountry;
    
    for(let i=0 ; i< number; i++){
      CountryCard[i].onclick = function() {
        nameCountry = CountryCard[i].attributes.value.textContent
        detalCountry(nameCountry);
        detal.classList.add('hide-detal');
        cardMain.classList.add('hide')
      }
    }
  }
    // Lọc theo Châu Lục
  let fillRegion = document.getElementById("region");
  fillRegion.onchange = function () {
    let fillData = [];
    if(fillRegion.value == "all"){
        loadData(dataEx)
        return 0;
    }
    for (let i in dataEx) {
      if (dataEx[i][3] == fillRegion.value) {
        fillData.push(dataEx[i]);
      }
    }
    loadData(fillData);
    cardClick(fillData.length)
  };
//   Tìm kiếm theo tên nước trên local
  let findCountry = document.getElementById("find-country")
  findCountry.onchange = function() {
    let findData = [];
    if(findCountry.value == ''){
        loadData(dataEx)
        return 0;
    }
    for(let i in dataEx){
        if(dataEx[i][1] == findCountry.value){
            findData.push(dataEx[i])
        }
    }
    loadData(findData)
    cardClick(findData.length)
  }
// Ẩn hiện detal
let detal = document.querySelector('.detal-country');
let btnBack = document.querySelector('.btn-back');
btnBack.onclick = function() {
    detal.classList.remove('hide-detal');
    cardMain.classList.remove('hide')
}