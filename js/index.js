var list = [];
if (localStorage.getItem("content") !== null){
    list = JSON.parse(localStorage.getItem("content"));
}
const lsArr = JSON.parse(localStorage.getItem('myTaskList'));
let modal = document.getElementById('myModal');
let modal1 = document.getElementById('myModal1');
let modal2 = document.getElementById('myModal2');
document.getElementById('btn').onclick = function() {
    modal2.style.display = 'block';
}
document.getElementById('apply').onclick = function() {
    modal2.style.display = "none";
}

document.getElementById('search').onclick = function() {
    let load = document.getElementById('loader');
    load.style.display = 'block';
    let Box = document.getElementById('all');
    let main = Box.firstChild;
    while (main) {
        Box.removeChild(main);
        main = Box.firstChild;
    }
    let event = document.getElementById('country');
    let place_name = document.getElementById('search__input').value;
    let county1 = event.options[event.selectedIndex].value;
    let country = "";
    switch (county1) {
    case '1':
        country = 'co.uk';
        break;
    case '2':
        country = 'fr';
        break;
    case '3':
        country = 'mx';
        break;
    case '4':
        country = 'com.br';
        break;
    case '5':
        country = 'de';
        break;
    case '6':
        country = 'in';
        break;
    case '7':
        country = 'it';
        break;
    case '8':
        country = 'es';
        break;
    }
    let f_event = document.getElementById('listing_type');
    let type = f_event.options[f_event.selectedIndex].value;
    let listing_type = "";
    switch (type) {
    case '9':
        listing_type = 'buy';
        break;
    case '10':
        listing_type = 'rent';
        break;
    }

    let g_event = document.getElementById('property_type');
    let dom_type = g_event.options[g_event.selectedIndex].value;
    let property_type = "";
    switch (dom_type) {
    case '11':
        property_type = 'flat';
        break;
    case '12':
        property_type = 'house';
        break;
    }

    let bedroom_number = document.getElementById('bedroom_number').value;
    let bathroom_number = document.getElementById('bathroom_number').value;
    let price_max = document.getElementById('price_max').value;
    let price_min = document.getElementById('price_min').value;

    let script = document.createElement('SCRIPT');
    script.src = 'https://api.nestoria.' + country + '/api?encoding=json&pretty=1&action=search_listings&country=uk&listing_type=' + listing_type + '&place_name=' + place_name + '&property_type=' + property_type + '&bedroom_min=' + bedroom_number + '&bedroom_max=' + bedroom_number + '&bathroom_min=' + bathroom_number + '&bathroom_max=' + bathroom_number + '&price_min=' + price_min + '&price_max=' + price_max + '&callback=callbackFunc';
    document.getElementsByTagName("head")[0].appendChild(script);
}

function callbackFunc(result) {
    let load = document.getElementById('loader');
    load.style.display = 'none';
    if (result.response.listings.length !== 0 && result.response.application_response_code === '101') {
        for (var i = 0; i < result.response.listings.length; i++) {
            let div = document.createElement('div');
            div.id = i;
            document.getElementById('all').appendChild(div);
            let img = document.createElement('img');
            img.src = result.response.listings[i].img_url;
            img.id = i;
            img.className = 'images';
            img.width = '400';
            img.height = '300';
            document.getElementById(i).appendChild(img);
            let span = document.createElement('span');
            span.id = 'right__bar';
            div.appendChild(span);
            let price = document.createElement('p');
            price.id = "price";
            price.innerText = result.response.listings[i].price_formatted;
            span.appendChild(price);
            let title = document.createElement('h3');
            title.id = "title";
            title.className = "title";
            title.innerText = result.response.listings[i].title;
            span.appendChild(title);
            let summary = document.createElement('p');
            summary.id = "summary";
            summary.innerText = result.response.listings[i].summary;
            span.appendChild(summary);
            let updated = document.createElement('p');
            updated.id = i;
            updated.innerText = result.response.listings[i].updated_in_days_formatted;
            span.appendChild(updated);
            let moreInfo = document.createElement('button');
            moreInfo.id = i;
            moreInfo.className = "more-info__btn";
            moreInfo.innerText = 'More Info';
            span.appendChild(moreInfo);
            moreInfo.onclick = function() {
                modal.style.display = "block";
                let topModal = document.createElement('div');
                topModal.id = 'top';
                document.getElementById('box').appendChild(topModal);
                let imgModal = document.createElement('img');
                imgModal.src = result.response.listings[this.id].img_url;
                let leftBar = document.createElement('div');
                leftBar.id = 'left_bar';
                topModal.appendChild(leftBar);
                leftBar.appendChild(imgModal);
                let propertyFeaturesModal = document.createElement('h2');
                propertyFeaturesModal.innerText = 'Property Features';
                let rightBar = document.createElement('div');
                rightBar.id = 'right_bar';
                topModal.appendChild(rightBar);
                rightBar.appendChild(propertyFeaturesModal);
                let titleModal = document.createElement('h4');
                titleModal.innerText = result.response.listings[this.id].title;
                rightBar.appendChild(titleModal);
                if (result.response.listings[this.id].bathroom_number > '0') {
                    let bathroomModal = document.createElement('p');
                    bathroomModal.innerText = result.response.listings[this.id].bathroom_number + ' bathroom';
                    rightBar.appendChild(bathroomModal);
                }
                let bedroomModal = document.createElement('p');
                bedroomModal.innerText = result.response.listings[this.id].bedroom_number + ' bedroom';
                rightBar.appendChild(bedroomModal);
                let priceModal = document.createElement('p');
                priceModal.innerText = 'Price: ' + result.response.listings[this.id].price_formatted;
                rightBar.appendChild(priceModal);
                let propertyTypeModal = document.createElement('p');
                propertyTypeModal.innerText = 'Property type: ' + result.response.listings[this.id].property_type;
                rightBar.appendChild(propertyTypeModal);
                let maps = document.createElement('div');
                maps.id = "map";
                document.getElementById('box').appendChild(maps);
                let center_lat = result.response.listings[this.id].latitude;
                let center_long = result.response.listings[this.id].longitude;
                ymaps.ready(init);
                var placemark = [{
                    latitude: result.response.listings[this.id].latitude,
                    longitude: result.response.listings[this.id].longitude,
                }];
                function init() {
                    var myMap = new ymaps.Map("map",{

                        center: [center_lat, center_long],
                        zoom: 10,
                        controls: ['zoomControl'],
                        behaviors: ['drag']
                    });
                    placemark.forEach(function(obj) {
                        var placemark = new ymaps.Placemark([obj.latitude, obj.longitude],{});
                        myMap.geoObjects.add(placemark);
                    });

                }
                let closeModal = document.createElement('a');
                closeModal.className = 'close';
                document.getElementById('myModal').appendChild(closeModal);
                closeModal.onclick = function() {
                    modal.style.display = "none";
                    let modalBox = document.getElementById('box');
                    let main = modalBox.firstChild;
                    while (main) {
                        modalBox.removeChild(main);
                        main = modalBox.firstChild;
                    }
                }
            }

            let saved = document.createElement('button');
            saved.id = i;
            saved.className = 'saved';
            saved.innerText = 'избранное';
            saved.innerHTML = "<i class='far fa-bookmark saved-btn'></i>";
            span.appendChild(saved);
            var z = 0;
            saved.onclick = function() {
               var list = [];
                saved.innerHTML = "<i class='fas fa-bookmark saved-btn'></i>";
                if (list.length == 0) {
                    list.push({
                        id: this.id,
                        "name": result.response.listings[this.id].title
                    });
                    localStorage.setItem('content', JSON.stringify(list));
                    z++;
                    document.getElementById('select-count').innerHTML = z;

                    let box1Block = document.createElement('div');
                    box1Block.className = 'box1-block';
                    document.getElementById('box1').appendChild(box1Block);
                    let imgModalBox1 = document.createElement('img');
                    imgModalBox1.className = 'imgModalBox1';
                    imgModalBox1.src = result.response.listings[this.id].img_url;
                    box1Block.appendChild(imgModalBox1);
                    let titleModalBox1 = document.createElement('h3');
                    titleModalBox1.innerText = result.response.listings[this.id].title;
                    box1Block.appendChild(titleModalBox1);
                    let deleteBtn = document.createElement('button');
                    deleteBtn.className = 'deletebtn';
                    deleteBtn.innerHTML = "<i class='fas fa-trash'></i>";
                    let box1 = document.getElementById('box1');
                    deleteBtn.onclick = function() {
                        let box1Block = this.parentNode;
                        let box1 = box1Block.parentNode;
                        box1.removeChild(box1Block);
                        z--;
                        document.getElementById('select-count').innerHTML = z;
                        saved.innerHTML = "<i class='far fa-bookmark saved-btn'></i>";
                    }
                    box1Block.appendChild(deleteBtn);
                }else {
                	
                }

            }
            document.getElementById('select').onclick = function() {
                modal1.style.display = "block";
                let closeModal = document.createElement('a');
                closeModal.className = 'close';
                document.getElementById('box1').appendChild(closeModal);
                closeModal.onclick = function() {
                    modal1.style.display = "none";
                }
            }

        }
    } else {
        let error = document.createElement('p');
        error.innerText = 'No result...';
        error.id = 'error';
        document.getElementById('all').appendChild(error);
    }
}

let input = document.getElementById('search__input');
let search = document.getElementById('search');
input.addEventListener("keyup", function(event) {
    event.preventDefault();
    if (event.keyCode === 13) {
        search.click();
    }
});

window.onscroll = function() {
    let scrollElem = document.getElementById("scrollToTop");
    if (document.body.scrollTop > 10 || document.documentElement.scrollTop > 10) {
        document.getElementById("scrollToTop").style.opacity = "1";
    } else {
        document.getElementById("scrollToTop").style.opacity = "0";
    }
}

let timeOut;
function goUp() {
    let top = Math.max(document.body.scrollTop, document.documentElement.scrollTop);
    if (top > 0) {
        window.scrollBy(0, -100);
        timeOut = setTimeout('goUp()', 20);
    } else
        clearTimeout(timeOut);
}
document.getElementById("scrollToTop").onclick = goUp;
