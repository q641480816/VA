const utilData= {
    fetchUrl: "http://localhost:8080/bootstrap/getAll",
    allData: null,
    typePair: {
        prevalenceInPercent : {
            display: "Prevalence",
            key: 'prevalenceInPercent'
        },
        maleInPercent : {
            display: "Male Smoker",
            key: 'maleInPercent'
        },
        femaleInPercent : {
            display: "Female Smoker",
            key: 'femaleInPercent'
        },
        dailyConsumption : {
            display: "Daily Tobacco Consumption",
            key: 'dailyConsumption'
        },
        death: {
            display: 'Death due to smoke',
            key: 'death'
        },
        cancerDeathInPercent: {
            display: 'Cancer contribution',
            key: 'cancerDeathInPercent'
        }
    }
};

export default utilData;
