//- Data Url given by ThinkTAc
const url = "https://gist.githubusercontent.com/manzooralam/4b6aca6e1aa794c57c0cb6e7a2605109/raw/694828a0b1084ef63ff507ed85de3db6e3931e99/list.json";

//- Initilize angular application here
let app = angular.module('myApp', []);

//- Controller code here all variables & methods
app.controller('myCtrl', ($scope, $http) => {

    //- Initilize scope variables here
    $scope.title = "ThinkTac"; //- Get title from backend so that we can change ot dynamically
    $scope.languageList = ["Hindi", "English"]; //- for laguange selecet filter
    let defaultData = []; //- storing data on loading

    //- function to get default data starts here
    $scope.getDefaultData = () => {

        $http.get(url).then((response) => {
            //- sucess code here
            $scope.allData = defaultData = [...response.data, ...response.data, ...response.data]; //- just to show more data beacuse api only giving 4 objects
            $scope.uniqueSubject = ["All", ...new Set(response.data.map((e) => {
                return e.Version;
            }))];
        }, (error) => {
            //- failure code here
            alert("There is some error. Data is not present.");
        });
    }

    //- function is triggered when user selects a subject
    $scope.getSubjectData = (selectedSubject) => {
        if (selectedSubject) {
            selectedSubject == "All" ? ($scope.allData = defaultData) : (
                $scope.allData = defaultData.filter((e) => {
                    return e.Version == selectedSubject;
                }));
        }
    }

    //- function is triggered when user selects a language
    $scope.getLanguageData = (selectedLanguage) => {
    }

    //- function is triggered when user searches name
    $scope.getSearchData = (searchTxt) => {
        if (searchTxt) {
            $scope.allData = defaultData.filter((e) => {
                return e.Name.includes(searchTxt);
            });
        } else {
            $scope.allData = defaultData;
        }
    }
    
    //- calling function to get default data on loading 
    $scope.getDefaultData();

});