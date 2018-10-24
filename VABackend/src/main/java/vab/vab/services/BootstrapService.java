package vab.vab.services;

import org.springframework.beans.factory.annotation.Value;
import org.springframework.cache.annotation.Cacheable;
import org.springframework.stereotype.Service;
import org.springframework.util.ResourceUtils;
import vab.vab.exception.VAException;
import vab.vab.model.*;

import java.io.File;
import java.io.InputStream;
import java.nio.file.Files;
import java.nio.file.Paths;
import java.util.*;
import java.util.stream.Collectors;
import java.util.stream.Stream;

@Service
public class BootstrapService {

    @Value("${data.prevalenceInPercent}")
    private String prevalenceInPercent;

    @Value("${data.maleSmoker}")
    private String maleSmoker;

    @Value("${data.femaleSmoker}")
    private String femaleSmoker;

    @Value("${data.dailySmokeConsumption}")
    private String dailySmokeConsumption;

    @Value("${data.smokerCancerDeath}")
    private String smokerCancerDeath;

    @Value("${data.smokeDeath}")
    private String smokeDeath;

    private static String YEAR = "years";

    private static String DATA = "data";

    private static String LEGEND = "legend";

    private static String LEGENDSEPRATOR = "legendSeparator";

    private Map<String, Object> alldata;

    @Cacheable("bootstrapData")
    public Map<String, Object> bootstrap() throws Exception{

        //get smoke
        List<CountryYear> prevalenceInPercent = getSmokers();
        //get male smoker
        List<CountryYear> maleSmokers = getMaleSmokers();
        //get female smoker
        List<CountryYear> femaleSmokers = getFemaleSmokers();
        //get daily consumption
        List<CountryYear> dailySmokeConsumption = getDailySmokeConsumption();
        //get death
        List<CountryYear> smokeDeath = getSmokeDeath();
        //get cancer smoke death
        List<CountryYear> cancerSmokeDeath = getCancerSmokeDeath();

        return aggregateCountryYear(prevalenceInPercent, maleSmokers, femaleSmokers, dailySmokeConsumption, smokeDeath, cancerSmokeDeath);
    }

    public Map<String, Object> getDataSet() throws Exception{
        return alldata == null ? bootstrap() : alldata;
    }

    private Map<String, Object> aggregateCountryYear(List<CountryYear> prevalenceInPercent, List<CountryYear> maleSmokers, List<CountryYear> femaleSmokers,
                                                   List<CountryYear> dailySmokeConsumption, List<CountryYear> smokeDeath, List<CountryYear> cancerSmokeDeath){

        //Clean up key
        Map<String, Map<String, Object>> typeYearSet = new HashMap<>();
        HashMap<String, CountryYear> countryYearSet = new HashMap<>();

        //do prevalenceInPercent
        HashMap<String, Object> prevalenceInPercentData = new HashMap<>();
        HashMap<String, List<CountryYearPrevalence>> prevalenceYearlyData = new HashMap<>();
        List<String> prevalenceYears = new ArrayList<>();
        for (CountryYear cy: prevalenceInPercent){
            //type year
            CountryYearPrevalence cyp = new CountryYearPrevalence(cy);
            if (!prevalenceYearlyData.containsKey(cy.getYear().trim())){
                prevalenceYears.add(cy.getYear().trim());
                List<CountryYearPrevalence> data = new ArrayList<>();
                data.add(cyp);
                prevalenceYearlyData.put(cy.getYear().trim(), data);
            }else {
                List<CountryYearPrevalence> data = prevalenceYearlyData.get(cy.getYear().trim());
                data.add(cyp);
                prevalenceYearlyData.put(cy.getYear().trim(), data);
            }
            //all
            if(countryYearSet.containsKey(cy.getKey())){
                CountryYear cyExist = countryYearSet.get(cy.getKey());
                cyExist.setPrevalenceInPercent(cy.getPrevalenceInPercent());
                countryYearSet.put(cy.getKey(), cyExist);
            }else {
                countryYearSet.put(cy.getKey(), cy);
            }
        }
        Collections.sort(prevalenceYears);
        int[] prevalenceInPercentLegend = new int[]{0, 10, 20, 30, 40, 50};
        prevalenceInPercentData.put(YEAR, prevalenceYears);
        prevalenceInPercentData.put(DATA, prevalenceYearlyData);
        prevalenceInPercentData.put(LEGEND, prevalenceInPercentLegend);
        prevalenceInPercentData.put(LEGENDSEPRATOR, "%");
        typeYearSet.put(this.prevalenceInPercent, prevalenceInPercentData);

        //do male smoker
        HashMap<String, Object> maleSmokerData = new HashMap<>();
        HashMap<String, List<CountryYearMaleSmoker>> maleSmokerYearlyData = new HashMap<>();
        List<String> maleSmokerYears = new ArrayList<>();
        for (CountryYear cy: maleSmokers){
            //type year
            CountryYearMaleSmoker cyms = new CountryYearMaleSmoker(cy);
            if (!maleSmokerYearlyData.containsKey(cy.getYear().trim())){
                maleSmokerYears.add(cy.getYear().trim());
                List<CountryYearMaleSmoker> data = new ArrayList<>();
                data.add(cyms);
                maleSmokerYearlyData.put(cy.getYear().trim(), data);
            }else {
                List<CountryYearMaleSmoker> data = maleSmokerYearlyData.get(cy.getYear().trim());
                data.add(cyms);
                maleSmokerYearlyData.put(cy.getYear().trim(), data);
            }
            //all
            if(countryYearSet.containsKey(cy.getKey())){
                CountryYear cyExist = countryYearSet.get(cy.getKey());
                cyExist.setMaleInPercent(cy.getMaleInPercent());
                countryYearSet.put(cy.getKey(), cyExist);
            }else {
                countryYearSet.put(cy.getKey(), cy);
            }
        }
        Collections.sort(maleSmokerYears);
        int[] maleSmokerLegend = new int[]{0, 10, 20, 30, 40, 50};
        maleSmokerData.put(YEAR, maleSmokerYears);
        maleSmokerData.put(DATA, maleSmokerYearlyData);
        maleSmokerData.put(LEGEND, maleSmokerLegend);
        maleSmokerData.put(LEGENDSEPRATOR, "%");
        typeYearSet.put(this.maleSmoker, maleSmokerData);

        //do female smoker
        HashMap<String, Object> femaleSmokerData = new HashMap<>();
        HashMap<String, List<CountryYearFemaleSmoker>> femaleSmokerYearlyData = new HashMap<>();
        List<String> femaleSmokerYears = new ArrayList<>();
        for (CountryYear cy: femaleSmokers){
            //type year
            CountryYearFemaleSmoker cyfs = new CountryYearFemaleSmoker(cy);
            if (!femaleSmokerYearlyData.containsKey(cy.getYear().trim())){
                femaleSmokerYears.add(cy.getYear().trim());
                List<CountryYearFemaleSmoker> data = new ArrayList<>();
                data.add(cyfs);
                femaleSmokerYearlyData.put(cy.getYear().trim(), data);
            }else {
                List<CountryYearFemaleSmoker> data = femaleSmokerYearlyData.get(cy.getYear().trim());
                data.add(cyfs);
                femaleSmokerYearlyData.put(cy.getYear().trim(), data);
            }
            //all
            if(countryYearSet.containsKey(cy.getKey())){
                CountryYear cyExist = countryYearSet.get(cy.getKey());
                cyExist.setFemaleInPercent(cy.getFemaleInPercent());
                countryYearSet.put(cy.getKey(), cyExist);
            }else {
                countryYearSet.put(cy.getKey(), cy);
            }
        }
        Collections.sort(femaleSmokerYears);
        int[] femaleSmokerLegend = new int[]{0, 10, 20, 30, 40, 50};
        femaleSmokerData.put(YEAR, femaleSmokerYears);
        femaleSmokerData.put(DATA, femaleSmokerYearlyData);
        femaleSmokerData.put(LEGEND, femaleSmokerLegend);
        femaleSmokerData.put(LEGENDSEPRATOR, "%");
        typeYearSet.put(this.femaleSmoker, femaleSmokerData);

        //do dailySmokeConsumption
        HashMap<String, Object> dailySmokeConsumptionData = new HashMap<>();
        HashMap<String, List<CountryYearDailyConsumption>> dailySmokeConsumptionYearlyData = new HashMap<>();
        List<String> dailySmokeConsumptionYears = new ArrayList<>();
        for (CountryYear cy: dailySmokeConsumption){
            //type year
            CountryYearDailyConsumption cydc = new CountryYearDailyConsumption(cy);
            if (!dailySmokeConsumptionYearlyData.containsKey(cy.getYear().trim())){
                dailySmokeConsumptionYears.add(cy.getYear().trim());
                List<CountryYearDailyConsumption> data = new ArrayList<>();
                data.add(cydc);
                dailySmokeConsumptionYearlyData.put(cy.getYear().trim(), data);
            }else {
                List<CountryYearDailyConsumption> data = dailySmokeConsumptionYearlyData.get(cy.getYear().trim());
                data.add(cydc);
                dailySmokeConsumptionYearlyData.put(cy.getYear().trim(), data);
            }
            //all
            if(countryYearSet.containsKey(cy.getKey())){
                CountryYear cyExist = countryYearSet.get(cy.getKey());
                cyExist.setDailyConsumption(cy.getDailyConsumption());
                countryYearSet.put(cy.getKey(), cyExist);
            }else {
                countryYearSet.put(cy.getKey(), cy);
            }
        }
        Collections.sort(dailySmokeConsumptionYears);
        int[] dailySmokeConsumptionLegend = new int[]{0, 10, 20, 30, 40, 50};
        dailySmokeConsumptionData.put(YEAR, dailySmokeConsumptionYears);
        dailySmokeConsumptionData.put(DATA, dailySmokeConsumptionYearlyData);
        dailySmokeConsumptionData.put(LEGEND, dailySmokeConsumptionLegend);
        dailySmokeConsumptionData.put(LEGENDSEPRATOR, "");
        typeYearSet.put(this.dailySmokeConsumption, dailySmokeConsumptionData);

        //do smokeDeath
        HashMap<String, Object> smokeDeathData = new HashMap<>();
        HashMap<String, List<CountryYearSmokeDeath>> smokeDeathYearlyData = new HashMap<>();
        List<String> smokeDeathYears = new ArrayList<>();
        for (CountryYear cy: smokeDeath){
            //type year
            CountryYearSmokeDeath cysd = new CountryYearSmokeDeath(cy);
            if (!smokeDeathYearlyData.containsKey(cy.getYear().trim())){
                smokeDeathYears.add(cy.getYear().trim());
                List<CountryYearSmokeDeath> data = new ArrayList<>();
                data.add(cysd);
                smokeDeathYearlyData.put(cy.getYear().trim(), data);
            }else {
                List<CountryYearSmokeDeath> data = smokeDeathYearlyData.get(cy.getYear().trim());
                data.add(cysd);
                smokeDeathYearlyData.put(cy.getYear().trim(), data);
            }
            //all
            if(countryYearSet.containsKey(cy.getKey())){
                CountryYear cyExist = countryYearSet.get(cy.getKey());
                cyExist.setDeath(cy.getDeath());
                countryYearSet.put(cy.getKey(), cyExist);
            }else {
                countryYearSet.put(cy.getKey(), cy);
            }
        }
        Collections.sort(smokeDeathYears);
        smokeDeathData.put(YEAR, smokeDeathYears);
        smokeDeathData.put(DATA, smokeDeathYearlyData);
        typeYearSet.put(this.smokeDeath, smokeDeathData);

        //do smokeCancerDeath
        HashMap<String, Object> cancerSmokeDeathData = new HashMap<>();
        HashMap<String, List<CountryYearCancerSmokeDeath>> cancerSmokeDeathYearlyData = new HashMap<>();
        List<String> cancerSmokeDeathYears = new ArrayList<>();
        for (CountryYear cy: cancerSmokeDeath){
            //type year
            CountryYearCancerSmokeDeath cycsd = new CountryYearCancerSmokeDeath(cy);
            if (!cancerSmokeDeathYearlyData.containsKey(cy.getYear().trim())){
                cancerSmokeDeathYears.add(cy.getYear().trim());
                List<CountryYearCancerSmokeDeath> data = new ArrayList<>();
                data.add(cycsd);
                cancerSmokeDeathYearlyData.put(cy.getYear().trim(), data);
            }else {
                List<CountryYearCancerSmokeDeath> data = cancerSmokeDeathYearlyData.get(cy.getYear().trim());
                data.add(cycsd);
                cancerSmokeDeathYearlyData.put(cy.getYear().trim(), data);
            }
            //all
            if(countryYearSet.containsKey(cy.getKey())){
                CountryYear cyExist = countryYearSet.get(cy.getKey());
                cyExist.setCancerDeathInPercent(cy.getCancerDeathInPercent());
                countryYearSet.put(cy.getKey(), cyExist);
            }else {
                countryYearSet.put(cy.getKey(), cy);
            }
        }
        Collections.sort(cancerSmokeDeathYears);
        int[] cancerSmokerDeathLegend = new int[]{0, 10, 20, 30, 40, 50};
        cancerSmokeDeathData.put(YEAR, cancerSmokeDeathYears);
        cancerSmokeDeathData.put(DATA, cancerSmokeDeathYearlyData);
        cancerSmokeDeathData.put(LEGEND, cancerSmokerDeathLegend);
        cancerSmokeDeathData.put(LEGENDSEPRATOR, "%");
        typeYearSet.put(this.smokerCancerDeath, cancerSmokeDeathData);

         List<CountryYear> dataSet = countryYearSet.values().stream()
                 .parallel()
                 .filter(a -> a.getYear().length() > 0)
                .sorted(Comparator.comparing(CountryYear::getKey)).collect(Collectors.toList());

         HashMap<String, Object> allData = new HashMap<>();
         allData.put("dataSet", dataSet);
         allData.put("typeYearDataSet", typeYearSet);
         this.alldata = allData;
         return allData;
    }

    private List<CountryYear> getSmokers()throws Exception{
         return readLines("smokers")
                .parallel()
                .skip(1)
                .map(a -> a.split(","))
                .filter(a -> !a[0].contains("World"))
                .filter(a -> (a[2]).length()> 0 && (a[1]).length() > 0)
                .map(a -> {
                    CountryYear cy = new CountryYear();
                    cy.setCountryName(a[0]);
                    cy.setCountryCode(a[1]);
                    cy.setYear(a[2]);
                    cy.setPrevalenceInPercent(Double.parseDouble(a[3]));
                    return cy;
                }).collect(Collectors.toList());
    }

    private List<CountryYear> getMaleSmokers()throws Exception{
        return readLines("maleSmoker")
                .parallel()
                .skip(1)
                .map(a -> a.split(","))
                .filter(a -> !a[0].contains("World"))
                .filter(a -> (a[2]).length()> 0 && (a[1]).length() > 0)
                .map(a -> {
                    CountryYear cy = new CountryYear();
                    cy.setCountryName(a[0]);
                    cy.setCountryCode(a[1]);
                    cy.setYear(a[2]);
                    cy.setMaleInPercent(Double.parseDouble(a[3]));
                    return cy;
                }).collect(Collectors.toList());
    }

    private List<CountryYear> getFemaleSmokers()throws Exception{
        return readLines("femaleSmoker")
                .parallel()
                .skip(1)
                .map(a -> a.split(","))
                .filter(a -> !a[0].contains("World"))
                .filter(a -> (a[2]).length()> 0 && (a[1]).length() > 0)
                .map(a -> {
                    CountryYear cy = new CountryYear();
                    cy.setCountryName(a[0]);
                    cy.setCountryCode(a[1]);
                    cy.setYear(a[2]);
                    cy.setFemaleInPercent(Double.parseDouble(a[3]));
                    return cy;
                }).collect(Collectors.toList());
    }

    private List<CountryYear> getSmokeDeath()throws Exception{
        return readLines("smokeDeath")
                .parallel()
                .skip(1)
                .map(a -> a.split(","))
                .filter(a -> !a[0].contains("World"))
                .filter(a -> (a[2]).length()> 0 && (a[1]).length() > 0)
                .map(a -> {
                    CountryYear cy = new CountryYear();
                    cy.setCountryName(a[0]);
                    cy.setCountryCode(a[1]);
                    cy.setYear(a[2]);
                    cy.setDeath(Integer.parseInt(a[3]));
                    return cy;
                }).collect(Collectors.toList());
    }

    private List<CountryYear> getDailySmokeConsumption()throws Exception{
        return readLines("dailySmokeConsumption")
                .parallel()
                .skip(1)
                .map(a -> a.split(","))
                .filter(a -> !a[0].contains("World"))
                .filter(a -> (a[2]).length()> 0 && (a[1]).length() > 0)
                .map(a -> {
                    CountryYear cy = new CountryYear();
                    cy.setCountryName(a[0]);
                    cy.setCountryCode(a[1]);
                    cy.setYear(a[2]);
                    cy.setDailyConsumption(Double.parseDouble(a[3]));
                    return cy;
                }).collect(Collectors.toList());
    }

    private List<CountryYear> getCancerSmokeDeath()throws Exception{
        return readLines("smokerCancerDeath")
                .parallel()
                .skip(1)
                .map(a -> a.split(","))
                .filter(a -> !a[0].contains("World"))
                .filter(a -> (a[2]).length()> 0 && (a[1]).length() > 0)
                .map(a -> {
                    CountryYear cy = new CountryYear();
                    cy.setCountryName(a[0]);
                    cy.setCountryCode(a[1]);
                    cy.setYear(a[2]);
                    cy.setCancerDeathInPercent(Double.parseDouble(a[3]));
                    return cy;
                }).collect(Collectors.toList());
    }

    private Stream<String> readLines(String name) throws Exception{
        File file = ResourceUtils.getFile("classpath:static/" + name + ".csv");
        //File file = new File(ClassLoader.getSystemClassLoader().getResource("static/" + name + ".csv").getFile());
        return Files.lines(file.toPath());
    }
}
