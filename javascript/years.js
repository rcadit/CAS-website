// https://www.ovoenergy.com/guides/energy-guides/how-much-electricity-does-a-home-use.html
$today = new Date();
$yesterday = new Date($today);
$yesterday.setDate($today.getDate() - 1); //setDate also supports negative values, which cau
var $dd = $yesterday.getDate();
var $mm = $yesterday.getMonth() + 1; //January is 0!
var $yyyy = $yesterday.getFullYear();
if ($dd < 10) {
    $dd = '0' + $dd
}
if ($mm < 10) {
    $mm = '0' + $mm
}
$yesterday = $yyyy + '-' + $mm + '-' + $dd;
var header = document.querySelector('header');
var section = document.querySelector('section');
var requestURL = 'https://v4.en-trak.com/apis/usages/tts/total/?date=' + $yesterday +
    '&format=json&period=day';
var request = new XMLHttpRequest();
request.open('GET', requestURL);
request.setRequestHeader("Authorization", "Bearer wRyu7NfHMzdfWFR5QuxKiT7YtxPTcb");
request.responseType = 'text';
request.send();
request.onload = function () {
    var $dataText = request.response;
    console.log($dataText);
    var $data = JSON.parse($dataText); // convert it to an object
    var $KWHday = $data['query_day'];
    var $KWHdayInt = parseInt($KWHday.total_kwh);
    // console.log($KWHdayInt);
    var $powerYear = Math.round($KWHdayInt) / 3940;
    var $powerMonths = $powerYear;
    $powerMonths = Math.floor($powerMonths * 12) % 12
    $powerYear = Math.floor($powerYear);
    var $coalKg = $KWHdayInt /2


    // replace all the divs with the data
    document.getElementById("kwh").innerHTML = $KWHdayInt + " kwh";
    if ($powerYear == 1) {
        document.getElementById("num-years").innerHTML = $powerYear + " year";
    }
    else {
        document.getElementById("num-years").innerHTML = $powerYear + " years";
    }
    if($powerMonths = 1){
        document.getElementById("num-months").innerHTML = $powerMonths + " month";

    }
    else{
        document.getElementById("num-months").innerHTML = $powerMonths + " months";
    }
    document.getElementById("coalKg").innerHTML = $coalKg + " kg"
    // console.log($powerYear);
}