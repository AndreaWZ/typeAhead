let data;

window.onload = function() {

    let request = new XMLHttpRequest();
        request.open("GET", "https://gist.githubusercontent.com/Miserlou/c5cd8364bf9b2420bb29/raw/2bf258763cdddd704f8ffd3ea9a3e81d25e2c6f6/cities.json");
        request.send();
        request.onload = () => {
            if(request.status === 200) {
                data = JSON.parse(request.response); // **refering 
                // data = [...JSON.parse(request.response)] //**copying */
            } else {
                console.log(`error ${request.status} ${request.statusText}`);
            }
        }
}

function getValueEl(value) {
    const keyword = value.trim();
    const ulList = document.getElementById("ul");
    const cityInfo = document.getElementById("cityInfo");
    ulList.innerHTML = '';
    cityInfo.innerHTML = '';
    let count = 0;
        
    if(keyword !== ""){
        const regex = new RegExp(`^${value}`, 'i');
        const srcCities = data.filter((item) => regex.test(item.city));
        // console.log(srcCities);

        for (let obj of srcCities) {
            if(count < 15) {
                const liElement = document.createElement("li");
                const spanElement = document.createElement("span");
                liElement.textContent = obj.city + ", " + obj.state;
                spanElement.textContent = obj.population.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
                ulList.appendChild(liElement);
                liElement.appendChild(spanElement);
                count++;

                liElement.addEventListener("click", function(){
                    const input = document.getElementById("input");
                    const cityName = document.createElement("p");
                    const population = document.createElement("p");
                    const pplGrow = document.createElement("p");

                    input.value = '';
                    ulList.innerHTML = '';

                    cityName.textContent = obj.city.toUpperCase() + ", " + obj.state;
                    population.textContent = obj.population.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
                    pplGrow.textContent = obj.growth_from_2000_to_2013; 

                    cityName.classList.add("fas", "fa-map-marker-alt");
                    population.classList.add("fas", "fa-users");
                    pplGrow.classList.add("fas", "fa-chart-line")
                    cityInfo.appendChild(cityName);
                    cityInfo.appendChild(population);
                    cityInfo.appendChild(pplGrow);
                })
            } else {
                break;
            }
        }
    }
}