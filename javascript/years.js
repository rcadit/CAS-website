function convertNumberToWords(amount) {
    var words = new Array();
    words[0] = '';
    words[1] = 'One';
    words[2] = 'Two';
    words[3] = 'Three';
    words[4] = 'Four';
    words[5] = 'Five';
    words[6] = 'Six';
    words[7] = 'Seven';
    words[8] = 'Eight';
    words[9] = 'Nine';
    words[10] = 'Ten';
    words[11] = 'Eleven';
    words[12] = 'Twelve';
    words[13] = 'Thirteen';
    words[14] = 'Fourteen';
    words[15] = 'Fifteen';
    words[16] = 'Sixteen';
    words[17] = 'Seventeen';
    words[18] = 'Eighteen';
    words[19] = 'Nineteen';
    words[20] = 'Twenty';
    words[30] = 'Thirty';
    words[40] = 'Forty';
    words[50] = 'Fifty';
    words[60] = 'Sixty';
    words[70] = 'Seventy';
    words[80] = 'Eighty';
    words[90] = 'Ninety';
    amount = amount.toString();
    var atemp = amount.split(".");
    var number = atemp[0].split(",").join("");
    var n_length = number.length;
    var words_string = "";
    if (n_length <= 9) {
        var n_array = new Array(0, 0, 0, 0, 0, 0, 0, 0, 0);
        var received_n_array = new Array();
        for (var i = 0; i < n_length; i++) {
            received_n_array[i] = number.substr(i, 1);
        }
        for (var i = 9 - n_length, j = 0; i < 9; i++, j++) {
            n_array[i] = received_n_array[j];
        }
        for (var i = 0, j = 1; i < 9; i++, j++) {
            if (i == 0 || i == 2 || i == 4 || i == 7) {
                if (n_array[i] == 1) {
                    n_array[j] = 10 + parseInt(n_array[j]);
                    n_array[i] = 0;
                }
            }
        }
        value = "";
        for (var i = 0; i < 9; i++) {
            if (i == 0 || i == 2 || i == 4 || i == 7) {
                value = n_array[i] * 10;
            } else {
                value = n_array[i];
            }
            if (value != 0) {
                words_string += words[value] + " ";
            }
            if ((i == 1 && value != 0) || (i == 0 && value != 0 && n_array[i + 1] == 0)) {
                words_string += "Crores ";
            }
            if ((i == 3 && value != 0) || (i == 2 && value != 0 && n_array[i + 1] == 0)) {
                words_string += "Lakhs ";
            }
            if ((i == 5 && value != 0) || (i == 4 && value != 0 && n_array[i + 1] == 0)) {
                words_string += "Thousand ";
            }
            if (i == 6 && value != 0 && (n_array[i + 1] != 0 && n_array[i + 2] != 0)) {
                words_string += "Hundred and ";
            } else if (i == 6 && value != 0) {
                words_string += "Hundred ";
            }
        }
        words_string = words_string.split("  ").join(" ");
    }
    return words_string;
}

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
    var $coalKg = Math.floor($KWHdayInt / 2);
    var $dollars = $KWHdayInt * 0.2156;
    $dollars = $dollars.toFixed(2);


    $kwhfact = Math.round($KWHdayInt / 1000) * 1000;

$kwhText = convertNumberToWords($kwhfact);

    // replace all the divs with the data
    document.getElementById("kwh").innerHTML =  $kwhText + " kwh";
    if ($powerYear == 1) {
        document.getElementById("num-years").innerHTML = $powerYear + " year";
    }
    else {
        document.getElementById("num-years").innerHTML = $powerYear + " years";
    }
    if ($powerMonths = 1) {
        document.getElementById("num-months").innerHTML = $powerMonths + " month";

    }
    else {
        document.getElementById("num-months").innerHTML = $powerMonths + " months";
    }
    // document.getElementById("coalKg").innerHTML = $coalKg + " kg";

    if ($dollars >= 1000 && $dollars < 2000) {
        $dollarsText = "a thousand dollars"
    }
    if ($dollars >= 2000 && $dollars < 3000) {
        $dollarsText = "2 thousand dollars"
    }
    if ($dollars >= 3000 && $dollars < 4000) {
        $dollarsText = "3 thousand dollars"
    }
    if ($dollars >= 4000 && $dollars < 5000) {
        $dollarsText = "4 thousand dollars"
    }
    if ($dollars >= 5000 && $dollars < 6000) {
        $dollarsText = "5 thousand dollars"
    }
    if ($dollars >= 6000 && $dollars < 7000) {
        $dollarsText = "6 thousand dollars"
    }
    if ($dollars >= 7000 && $dollars < 8000) {
        $dollarsText = "7 thousand dollars"
    }
    console.log($dollars);
    document.getElementById("dollars").innerHTML = $dollarsText;
    // console.log($powerYear);
}
