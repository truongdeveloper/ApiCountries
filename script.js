const className = ['.card-main', '.flag', '.name-country', '.popular', '.region', '.capital'];
const [cardMain, flag, nameCountry, popula, region, capital] = 
className.map(classItem => {
    return document.querySelector(classItem);
})

let apiCountry = 
fetch('https://restcountries.com/v3.1/all')
.then((restApi)=>{
    return restApi.json();
})
.then((data) => {
    console.log(data)
    let dataEx = data.map((arr) => {
        return [arr.flags.svg ,arr.name.official, arr.population, arr.region, arr.capital]
    })
    let html = [];
    console.log(dataEx)
    for(let i=0; i < 200; i++){
        html.push(`<div class="country-card">
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
    cardMain.innerHTML = html.join('');
})