const utilData= {
    fetchUrl: "http://www.callmedady.com:8080/vab/bootstrap/getAll",
    //fetchUrl: "http://localhost:8080/bootstrap/getAll",
    allData: null,
    typePair: {
        prevalenceInPercent : {
            display: "Prevalence",
            key: 'prevalenceInPercent',
            description: 'Prevalence Rate in '
        },
        maleInPercent : {
            display: "Male Smoker",
            key: 'maleInPercent',
            description: 'Male adult smoking percent in '
        },
        femaleInPercent : {
            display: "Female Smoker",
            key: 'femaleInPercent',
            description: 'Female adult smoking percent in '
        },
        dailyConsumption : {
            display: "Daily Tobacco Consumption",
            key: 'dailyConsumption',
            description: 'Average daily consumption in '
        },
        death: {
            display: 'Death due to smoke',
            key: 'death',
            description: 'Death due to smoking in '
        },
        cancerDeathInPercent: {
            display: 'Cancer contribution',
            key: 'cancerDeathInPercent',
            description: 'Cancer contribution to smoking Death in '
        }
    }
};

export default utilData;

// sudo cp -a . /var/www/
