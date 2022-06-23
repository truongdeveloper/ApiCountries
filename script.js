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
      html.push(`<div class="country-card dark-theme-light1">
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
  function detalCountry(data, name) {}
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
          arr.subregion,
          arr.tld,
          arr.capital
        ];
      });
      return dataEx;
    })
    .then((data) => {
      loadData(data);
      return data;
    });
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
  };
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
  }

let detal = document.querySelector('.detal-country');
let btnBack = document.querySelector('.btn-back');
let clickEx = document.querySelector('.title');
btnBack.onclick = function() {
    detal.classList.remove('hide-detal');
    cardMain.classList.remove('hide')
}
clickEx.onclick = function() {
    detal.classList.add('hide-detal');
    cardMain.classList.add('hide')
}