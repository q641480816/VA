package vab.vab.services;

import org.springframework.beans.factory.annotation.Value;
import org.springframework.cache.annotation.Cacheable;
import org.springframework.stereotype.Service;
import org.springframework.util.ResourceUtils;
import vab.vab.exception.VAException;
import vab.vab.model.CountryYear;

import java.io.File;
import java.io.InputStream;
import java.nio.file.Files;
import java.nio.file.Paths;
import java.util.ArrayList;
import java.util.Comparator;
import java.util.HashMap;
import java.util.List;
import java.util.stream.Collectors;
import java.util.stream.Stream;

@Service
public class BootstrapService {

    @Value("${data.smokers}")
    private String smokers;

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

    private List<CountryYear> dataSet;

    @Cacheable("bootstrapData")
    public List<CountryYear> bootstrap() throws Exception{

        //get smoke
        List<CountryYear> smokers = getSmokers();
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

        return aggregateCountryYear(smokers, maleSmokers, femaleSmokers, dailySmokeConsumption, smokeDeath, cancerSmokeDeath);
    }

    public List<CountryYear> getDataSet() throws Exception{
        return dataSet == null ? bootstrap() : dataSet;
    }

    private List<CountryYear> aggregateCountryYear(List<CountryYear> smokers, List<CountryYear> maleSmokers, List<CountryYear> femaleSmokers,
                                                   List<CountryYear> dailySmokeConsumption, List<CountryYear> smokeDeath, List<CountryYear> cancerSmokeDeath){

        //Clean up key
        HashMap<String, CountryYear> countryYearSet = new HashMap<>();
        //do smoker
        for (CountryYear cy: smokers){
            if(countryYearSet.containsKey(cy.getKey())){
                CountryYear cyExist = countryYearSet.get(cy.getKey());
                cyExist.setPrevalenceInPercent(cy.getPrevalenceInPercent());
                countryYearSet.put(cy.getKey(), cyExist);
            }else {
                countryYearSet.put(cy.getKey(), cy);
            }
        }
        //do male smoker
        for (CountryYear cy: maleSmokers){
            if(countryYearSet.containsKey(cy.getKey())){
                CountryYear cyExist = countryYearSet.get(cy.getKey());
                cyExist.setMaleInPercent(cy.getMaleInPercent());
                countryYearSet.put(cy.getKey(), cyExist);
            }else {
                countryYearSet.put(cy.getKey(), cy);
            }
        }
        //do female smoker
        for (CountryYear cy: femaleSmokers){
            if(countryYearSet.containsKey(cy.getKey())){
                CountryYear cyExist = countryYearSet.get(cy.getKey());
                cyExist.setFemaleInPercent(cy.getFemaleInPercent());
                countryYearSet.put(cy.getKey(), cyExist);
            }else {
                countryYearSet.put(cy.getKey(), cy);
            }
        }
        //do dailySmokeConsumption
        for (CountryYear cy: dailySmokeConsumption){
            if(countryYearSet.containsKey(cy.getKey())){
                CountryYear cyExist = countryYearSet.get(cy.getKey());
                cyExist.setDailyConsumption(cy.getDailyConsumption());
                countryYearSet.put(cy.getKey(), cyExist);
            }else {
                countryYearSet.put(cy.getKey(), cy);
            }
        }
        //do smokeDeath
        for (CountryYear cy: smokeDeath){
            if(countryYearSet.containsKey(cy.getKey())){
                CountryYear cyExist = countryYearSet.get(cy.getKey());
                cyExist.setDeath(cy.getDeath());
                countryYearSet.put(cy.getKey(), cyExist);
            }else {
                countryYearSet.put(cy.getKey(), cy);
            }
        }
        //do smokeDeath
        for (CountryYear cy: cancerSmokeDeath){
            if(countryYearSet.containsKey(cy.getKey())){
                CountryYear cyExist = countryYearSet.get(cy.getKey());
                cyExist.setCancerDeathInPercent(cy.getCancerDeathInPercent());
                countryYearSet.put(cy.getKey(), cyExist);
            }else {
                countryYearSet.put(cy.getKey(), cy);
            }
        }

         dataSet = countryYearSet.values().stream()
                 .parallel()
                 .filter(a -> a.getYear().length() > 0)
                .sorted(Comparator.comparing(CountryYear::getKey)).collect(Collectors.toList());

        return dataSet;
    }

    private List<CountryYear> getSmokers()throws Exception{
         return readLines("smokers")
                .parallel()
                .skip(1)
                .map(a -> a.split(","))
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
