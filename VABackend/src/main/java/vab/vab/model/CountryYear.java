package vab.vab.model;

import org.springframework.stereotype.Component;

@Component
public class CountryYear {

    private String countryName;

    private String countryCode;

    private String year;

    private double prevalenceInPercent;

    private double maleInPercent;

    private double femaleInPercent;

    private double dailyConsumption;

    private int death;

    private double cancerDeathInPercent;

    public CountryYear(){
        super();
    }

    public String getCountryName() {
        return countryName;
    }

    public void setCountryName(String countryName) {
        this.countryName = countryName;
    }

    public String getCountryCode() {
        return countryCode;
    }

    public void setCountryCode(String countryCode) {
        this.countryCode = countryCode;
    }

    public String getYear() {
        return year;
    }

    public void setYear(String year) {
        this.year = year;
    }

    public double getPrevalenceInPercent() {
        return prevalenceInPercent;
    }

    public void setPrevalenceInPercent(double prevalenceInPercent) {
        this.prevalenceInPercent = prevalenceInPercent;
    }

    public double getMaleInPercent() {
        return maleInPercent;
    }

    public void setMaleInPercent(double maleInPercent) {
        this.maleInPercent = maleInPercent;
    }

    public double getFemaleInPercent() {
        return femaleInPercent;
    }

    public void setFemaleInPercent(double femaleInPercent) {
        this.femaleInPercent = femaleInPercent;
    }

    public double getDailyConsumption() {
        return dailyConsumption;
    }

    public void setDailyConsumption(double dailyConsumption) {
        this.dailyConsumption = dailyConsumption;
    }

    public int getDeath() {
        return death;
    }

    public void setDeath(int death) {
        this.death = death;
    }

    public double getCancerDeathInPercent() {
        return cancerDeathInPercent;
    }

    public void setCancerDeathInPercent(double cancerDeathInPercent) {
        this.cancerDeathInPercent = cancerDeathInPercent;
    }

    public String getKey(){
        return this.countryName + this.year;
    }
}
