const utilData= {
    fetchUrl: "http://www.callmedady.com:8080/vab/bootstrap/getAll",
    //fetchUrl: "http://localhost:8080/bootstrap/getAll",
    allData: null,
    typePair: {
        prevalenceInPercent : {
            display: "Prevalence",
            key: 'prevalenceInPercent',
            description: 'Prevalence Rate ',
            separator: ["%"]
        },
        maleInPercent : {
            display: "Male Smoker",
            key: 'maleInPercent',
            description: 'Male adult smoking percent ',
            separator: ["%"]
        },
        femaleInPercent : {
            display: "Female Smoker",
            key: 'femaleInPercent',
            description: 'Female adult smoking percent ',
            separator: ["%"]
        },
        dailyConsumption : {
            display: "Daily Tobacco Consumption",
            key: 'dailyConsumption',
            description: 'Average daily consumption ',
            separator: []
        },
        death: {
            display: 'Death due to smoke',
            key: 'death',
            description: 'Death due to smoking ',
            separator: ["‱","‰"]
        },
        cancerDeathInPercent: {
            display: 'Cancer contribution',
            key: 'cancerDeathInPercent',
            description: 'Cancer contribution to smoking Death ',
            separator: ["%"]
        }
    },
    mapProjection: {
        world: {
            key: 'world',
            display: 'World',
            //projection: 'translate(0,0)scale(1)'
            projection: {
                x: 0,
                y: 0,
                scale: 1
            }
        },
        asia: {
            key: 'asia',
            display: 'Asia',
            //projection: 'translate(-700,-70)scale(1.85)',
            projection: {
                x: -700,
                y: -70,
                scale: 1.85
            },
            countries: ['AFG','AZE','BHR','BGD','ARM','BTN','IOT','LKA','CHN','TWN','CXR','CCK','CYP','GEO','PSE','HKG','IND','IRN','IRQ','ISR','JPN','KAZ','JOR','PRK','KOR','KWT','KGZ','LBN','MAC','MDV','MNG','OMN','NPL','PAK','TLS','QAT','RUS','SAU','SYR','TJK','ARE','TUR','TKM','UZB','YEM']
        },
        OceaniaASEAN: {
            key: 'OceaniaASEAN',
            display: 'Oceania & ASEAN',
            //projection: 'translate(-1250,-350)scale(1.95)',
            projection: {
                x: -1250,
                y: -350,
                scale: 1.95
            },
            countries: ['THA','VNM','LAO' ,'SGP','PHL','MMR','KHM','MYS','IDN','BRN','ASM','AUS','SLB','COK','FJI','PYF','KIR','GUM','NRU','NCL','VUT','NZL','NIU','NFK','MNP','UMI','FSM','MHL','PLW','PNG','PCN','TKL','TON','TUV','WLF','WSM']
        },
        europe: {
            key: 'europe',
            display: 'Europe',
            //projection: 'translate(-850,0)scale(2.4)',
            projection: {
                x: -850,
                y: 0,
                scale: 2.4
            },
            countries: ['ALB','AND','AZE','AUT','ARM','BEL','BIH','BGR','BLR','HRV','CYP','CZE','DNK','EST','FRO','FIN','ALA','FRA','GEO','DEU','GIB','GRC','VAT','HUN','ISL','IRL','ITA','KAZ','LVA','LIE','LTU','LUX','MLT','MCO','MDA','MNE','NLD','NOR','POL','PRT','ROU','RUS','SMR','SRB','SVK','SVN','ESP','SJM','SWE','CHE','TUR','UKR','MKD','GBR','GGY','JEY','IMN']
        },
        africa: {
            key: 'africa',
            display: 'Africa',
            //projection: 'translate(-650,-280)scale(2)',
            projection: {
                x: -650,
                y: -280,
                scale: 2
            },
            countries: ['DZA','AGO','BWA','BDI','CMR','CPV','CAF','TCD','COM','MYT','COG','COD','BEN','GNQ','ETH','ERI','DJI','GAB','GMB','GHA','GIN','CIV','KEN','LSO','LBR','LBY','MDG','MWI','MLI','MRT','MUS','MAR','MOZ','NAM','NER','NGA','GNB','REU','RWA','SHN','STP','SEN','SYC','SLE','SOM','ZAF','ZWE','SSD','SDN','ESH','SWZ','TGO','TUN','UGA','EGY','TZA','BFA','ZMB']
        },
        northAmerica: {
            key: 'northAmerica',
            display: 'North America',
            //projection: 'translate(150,-60)scale(1.85)',
            projection: {
                x: 150,
                y: -60,
                scale: 1.85
            },
            countries: ['ATG','BHS','BRB','BMU','BLZ','VGB','CAN','CYM','CRI','CUB','DMA','DOM','SLV','GRL','GRD','GLP','GTM','HTI','HND','JAM','MTQ','MEX','MSR','ANT','CUW','ABW','SXM','BES','NIC','UMI','PAN','PRI','BLM','KNA','AIA','LCA','MAF','SPM','VCT','TTO','TCA','USA','VIR']
        },
        southAmerica: {
            key: 'southAmerica',
            display: 'South America',
            //projection: 'translate(-100,-420)scale(1.98)',
            projection: {
                x: -100,
                y: -420,
                scale: 1.98
            },
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
    },
    resizeFactor: {
        width: 1041.04,
        height: 473.2
    },
    resizeDimension: (projection, dimension) => {
        let dims = {
            y: dimension.height / utilData.resizeFactor.height * projection.y,
            x: dimension.width / utilData.resizeFactor.width * projection.x,
            scale: projection.scale
        };
        return dims;
    },
    countryCodeISO: ['AFG','ALA','ALB','DZA','ASM','AND','AGO','AIA','ATA','ATG','ARG','ARM','ABW','AUS','AUT','AZE','BHS','BHR','BGD','BRB','BLR','BEL','BLZ','BEN','BMU','BTN','BOL','BQ','BIH','BWA','BVT','BRA','IOT','BRN','BGR','BFA','BDI','CPV','KHM','CMR','CAN','CYM','CAF','TCD','CHL','CHN','CXR','CCK','COL','COM','COG','COD','COK','CRI','CIV','HRV','CUB','CUW','CYP','CZE','DNK','DJI','DMA','DOM','ECU','EGY','SLV','GNQ','ERI','EST','SWZ','ETH','FLK','FRO','FJI','FIN','FRA','GUF','PYF','ATF','GAB','GMB','GEO','DEU','GHA','GIB','GRC','GRL','GRD','GLP','GUM','GTM','GGY','GIN','GNB','GUY','HTI','HMD','VAT','HND','HKG','HUN','ISL','IND','IDN','IRN','IRQ','IRL','IMN','ISR','ITA','JAM','JPN','JEY','JOR','KAZ','KEN','KIR','PRK','KOR','KWT','KGZ','LAO','LVA','LBN','LSO','LBR','LBY','LIE','LTU','LUX','MAC','MKD','MDG','MWI','MYS','MDV','MLI','MLT','MHL','MTQ','MRT','MUS','MYT','MEX','FSM','MDA','MCO','MNG','MNE','MSR','MAR','MOZ','MMR','NAM','NRU','NPL','NLD','NCL','NZL','NIC','NER','NGA','NIU','NFK','MNP','NOR','OMN','PAK','PLW','PS','PAN','PNG','PRY','PER','PHL','PCN','POL','PRT','PRI','QAT','REU','ROU','RUS','RWA','BLM','SH','KNA','LCA','MAF','SPM','VCT','WSM','SMR','STP','SAU','SEN','SRB','SYC','SLE','SGP','SXM','SVK','SVN','SLB','SOM','ZAF','SGS','SSD','ESP','LKA','SDN','SUR','SJM','SWE','CHE','SYR','TW','TJK','TZ','THA','TLS','TGO','TKL','TON','TTO','TUN','TUR','TKM','TCA','TUV','UGA','UKR','ARE','GBR','USA','UMI','URY','UZB','VUT','VEN','VNM','VGB','VIR','WLF','ESH','YEM','ZMB','ZWE']
};

export default utilData;
