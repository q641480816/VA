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
    },
    mapProjection: {
        world: {
            key: 'world',
            display: 'World',
            projection: 'translate(0,0)scale(1)'
        },
        asia: {
            key: 'asia',
            display: 'Asia',
            projection: 'translate(-700,-70)scale(1.85)'
        },
        OceaniaASEAN: {
            key: 'OceaniaASEAN',
            display: 'Oceania & ASEAN',
            projection: 'translate(-1250,-350)scale(1.95)'
        },
        europe: {
            key: 'europe',
            display: 'Europe',
            projection: 'translate(-850,0)scale(2.4)'
        },
        africa: {
            key: 'africa',
            display: 'Africa',
            projection: 'translate(-650,-280)scale(2)'
        },
        northAmerica: {
            key: 'northAmerica',
            display: 'North America',
            projection: 'translate(150,-60)scale(1.85)'
        },
        southAmerica: {
            key: 'southAmerica',
            display: 'South America',
            projection: 'translate(-100,-420)scale(1.98)'
        }
    },
    colors: {
        world: {
            dark: '#072F66',
            main: "#0B3D82",
            medium: '#3266AD',
            light: '#5481BE',
        },
        country: {
            dark: '#8F480D',
            main: "#B56726",
            medium: '#F5AE73',
            light: '#FFCDA3',
        },
        highlight: {
            dark: '#FCE20A',
            main: "#FFEA39",
            medium: '#FFF181',
            light: '#FFF6AF',
        }
    }
};

export default utilData;

// sudo cp -a . /var/www/
