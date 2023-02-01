if (navigator.geolocation) {
    navigator.geolocation.getCurrentPosition(function(position) {
      var latitude = position.coords.latitude;
      var longitude = position.coords.longitude;
//   var latitude = 12.972442; // Latitude for Karnataka, India
//   var longitude = 77.580643; // Longitude for Karnataka, India
      
  // Get the timezone information from an external API
//   fetch(`https://api.timezonedb.com/v2.1/get-time-zone?key=2191805a10d71c06700c9e12fdeda498&format=json&by=position&lat=${latitude}&lng=${longitude}`)
  fetch(`https://api.geoapify.com/v1/geocode/reverse?lat=${latitude}&lon=${longitude}&format=json&apiKey=c6811de164b6424997b4e8afee9881aa`)
    .then(response => response.json())
    .then(data => {
      var timezone = data.results[0].timezone.name;
      var std_offset = data.results[0].timezone.offset_STD;
      var std_offset_seconds = data.results[0].timezone.offset_STD_seconds;
      var dst_offset = data.results[0].timezone.offset_DST;
      var dst_offset_seconds = data.results[0].timezone.offset_DST_seconds;
      var country = data.results[0].country;
      var postcode = data.results[0].postcode;
      var city = data.results[0].city;
      console.log(data)
      console.log(timezone)

      document.getElementById("latitude").innerHTML = latitude;
      document.getElementById("longitude").innerHTML = longitude;
      document.getElementById("timezone").innerHTML = timezone;
      document.getElementById("std_offset").innerHTML = std_offset;
      document.getElementById("std_offset_seconds").innerHTML = std_offset_seconds;
      document.getElementById("dst_offset").innerHTML = dst_offset;
      document.getElementById("dst_offset_seconds").innerHTML = dst_offset_seconds;
      document.getElementById("country").innerHTML = country;
      document.getElementById("postcode").innerHTML = postcode;
      document.getElementById("city").innerHTML = city;
    });
})
}
const inputbox = document.getElementById("inputbox")
const resultcontainer = document.getElementById("resultcont");
const error = document.getElementById("error");
// took reference fromGeoApifi
function getLocation() {
  if (navigator.geolocation) {
    navigator.geolocation.getCurrentPosition(showPosition);
  }
}

function searchTimeZone(data){
    const name = document.getElementById("name")
    const lati = document.getElementById("lati")
    const longi = document.getElementById("longi")
    const offSTD = document.getElementById("offSTD")
    const offSTDsec = document.getElementById("offSTDsec")
    const offDST = document.getElementById("offDST")
    const offDSTsec = document.getElementById("offDSTsec")
    const country = document.getElementById("country-r")
    const post = document.getElementById("postt")
    const city = document.getElementById("city-r")
    name.innerHTML = data.timezone.name;
    lati.innerHTML = data.lat;
    longi.innerHTML = data.lon;
    offSTD.innerHTML = data.timezone.offset_DST;
    offSTDsec.innerHTML = data.timezone.offset_STD_seconds;
    offDST.innerHTML = data.timezone.offset_DST;
    offDSTsec.innerHTML = data.timezone.offset_DST_seconds;
    country.innerHTML = data.country;
    post.innerHTML = data.postcode
    city.innerHTML = data.city;
}
function search(){
    const address = inputbox.value;

    fetch(`https://api.geoapify.com/v1/geocode/search?text=${encodeURIComponent(address)}&apiKey=c6811de164b6424997b4e8afee9881aa`)
    .then(resp => resp.json())
    .then((geocodingResult) => {
        if(geocodingResult.features.length > 0){
            error.classList.add("hide")
            resultcontainer.classList.remove("hide")
            searchTimeZone(geocodingResult.features[0].properties)
        }else{
            resultcontainer.classList.add("hide")
            error.classList.remove("hide")
        }
    });
    return false;
}
function yourTimeZone(data,lat,lon){
    const name = document.getElementById("name")
    const lati = document.getElementById("lati")
    const longi = document.getElementById("longi")
    const offSTD = document.getElementById("offSTD")
    const offSTDsec = document.getElementById("offSTDsec")
    const offDST = document.getElementById("offDST")
    const offDSTsec = document.getElementById("offDSTsec")
    const country = document.getElementById("country")
    const city = document.getElementById("city")
    const post = document.getElementById("postt")
    name.innerHTML = data.timezone.name;
    lati.innerHTML = lat;
    longi.innerHTML = lon;
    offSTD.innerHTML = data.timezone.offset_DST;
    offSTDsec.innerHTML = data.timezone.offset_STD_seconds;
    offDST.innerHTML = data.timezone.offset_DST;
    offDSTsec.innerHTML = data.timezone.offset_DST_seconds;
    country.innerHTML = data.country;
    city.innerHTML = data.city;
    post.innerHTML = data.postcode;
}
document.addEventListener("DOMContentLoaded", getLocation);

