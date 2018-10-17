package vab.vab.model;

import org.springframework.stereotype.Component;

@Component
public class CountryYearDailyConsumption {

    private String countryName;

    private String countryCode;

    private String year;

    private double dailyConsumption;

    public CountryYearDailyConsumption(){super();}

    public CountryYearDailyConsumption(CountryYear cy){
        this.countryName = cy.getCountryName();
        this.countryCode = cy.getCountryCode();
        this.year = cy.getYear();
        this.dailyConsumption = cy.getDailyConsumption();
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

    public double getDailyConsumption() {
        return dailyConsumption;
    }

    public void setDailyConsumption(double dailyConsumption) {
        this.dailyConsumption = dailyConsumption;
    }
}
