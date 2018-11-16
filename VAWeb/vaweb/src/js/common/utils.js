const utilData= {
    fetchUrl: "http://www.callmedady.com:8080/vab/bootstrap/getAll",
    //fetchUrl: "http://localhost:8080/bootstrap/getAll",
    allData: null,
    typePair: {
        prevalenceInPercent : {
            display: "Prevalence",
            key: 'prevalenceInPercent',
            description: 'Prevalence Rate '
        },
        maleInPercent : {
            display: "Male Smoker",
            key: 'maleInPercent',
            description: 'Male adult smoking percent '
        },
        femaleInPercent : {
            display: "Female Smoker",
            key: 'femaleInPercent',
            description: 'Female adult smoking percent '
        },
        dailyConsumption : {
            display: "Daily Tobacco Consumption",
            key: 'dailyConsumption',
            description: 'Average daily consumption '
        },
        death: {
            display: 'Death due to smoke',
            key: 'death',
            description: 'Death due to smoking '
        },
        cancerDeathInPercent: {
            display: 'Cancer contribution',
            key: 'cancerDeathInPercent',
            description: 'Cancer contribution to smoking Death '
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
            projection: 'translate(-700,-70)scale(1.85)',
            countries: ['AFG','AZE','BHR','BGD','ARM','BTN','IOT','LKA','CHN','TWN','CXR','CCK','CYP','GEO','PSE','HKG','IND','IRN','IRQ','ISR','JPN','KAZ','JOR','PRK','KOR','KWT','KGZ','LBN','MAC','MDV','MNG','OMN','NPL','PAK','TLS','QAT','RUS','SAU','SYR','TJK','ARE','TUR','TKM','UZB','YEM']
        },
        OceaniaASEAN: {
            key: 'OceaniaASEAN',
            display: 'Oceania & ASEAN',
            projection: 'translate(-1250,-350)scale(1.95)',
            countries: ['THA','VNM','LAO' ,'SGP','PHL','MMR','KHM','MYS','IDN','BRN','ASM','AUS','SLB','COK','FJI','PYF','KIR','GUM','NRU','NCL','VUT','NZL','NIU','NFK','MNP','UMI','FSM','MHL','PLW','PNG','PCN','TKL','TON','TUV','WLF','WSM']
        },
        europe: {
            key: 'europe',
            display: 'Europe',
            projection: 'translate(-850,0)scale(2.4)',
            countries: ['ALB','AND','AZE','AUT','ARM','BEL','BIH','BGR','BLR','HRV','CYP','CZE','DNK','EST','FRO','FIN','ALA','FRA','GEO','DEU','GIB','GRC','VAT','HUN','ISL','IRL','ITA','KAZ','LVA','LIE','LTU','LUX','MLT','MCO','MDA','MNE','NLD','NOR','POL','PRT','ROU','RUS','SMR','SRB','SVK','SVN','ESP','SJM','SWE','CHE','TUR','UKR','MKD','GBR','GGY','JEY','IMN']
        },
        africa: {
            key: 'africa',
            display: 'Africa',
            projection: 'translate(-650,-280)scale(2)',
            countries: ['DZA','AGO','BWA','BDI','CMR','CPV','CAF','TCD','COM','MYT','COG','COD','BEN','GNQ','ETH','ERI','DJI','GAB','GMB','GHA','GIN','CIV','KEN','LSO','LBR','LBY','MDG','MWI','MLI','MRT','MUS','MAR','MOZ','NAM','NER','NGA','GNB','REU','RWA','SHN','STP','SEN','SYC','SLE','SOM','ZAF','ZWE','SSD','SDN','ESH','SWZ','TGO','TUN','UGA','EGY','TZA','BFA','ZMB']
        },
        northAmerica: {
            key: 'northAmerica',
            display: 'North America',
            projection: 'translate(150,-60)scale(1.85)',
            countries: ['ATG','BHS','BRB','BMU','BLZ','VGB','CAN','CYM','CRI','CUB','DMA','DOM','SLV','GRL','GRD','GLP','GTM','HTI','HND','JAM','MTQ','MEX','MSR','ANT','CUW','ABW','SXM','BES','NIC','UMI','PAN','PRI','BLM','KNA','AIA','LCA','MAF','SPM','VCT','TTO','TCA','USA','VIR']
        },
        southAmerica: {
            key: 'southAmerica',
            display: 'South America',
            projection: 'translate(-100,-420)scale(1.98)',
            countries: ['ARG','BOL','BRA','CHL','COL','ECU','FLK','GUF','GUY','PRY','PER','SUR','URY','VEN']
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
