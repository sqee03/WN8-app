// -----------------------------------------------------------------------------------------------------------------
// Searching in JSON

// testing - sample JSON data
var sampleJSON = 	{"data":[
    { "IDNum" : 1, "expFrag" : 1, "expDmg" : 1 },
    { "IDNum" : 365, "expFrag" : 2222, "expDmg" : 2333 },
    { "IDNum" : 16641, "expFrag" : 3.44, "expDmg" : 2.1 },
    { "IDNum" : 88, "expFrag" : 654, "expDmg" : 8283 }
]
};

var newData = null;
var sampleSource = sampleJSON.data;

$scope.newData = searchJSON.findObj(sampleSource,'IDNum','16641');

// for testing
$scope.callSearch = function () {
    console.log("loaded 'callSearch'");

    if (newData == null)
        newData = searchJSON.findObj(sampleSource,'IDNum','16641')
            .then(function(searchResponse) {
                console.debug("callSearch - newData: " + searchResponse)
            })
    else {
        console.error("callSearch failed")
    }

    return newData
}