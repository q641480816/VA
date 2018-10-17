package vab.vab.model;

import org.springframework.stereotype.Component;

@Component
public class CountryYearPrevalence {

    private String countryName;

    private String countryCode;

    private String year;

    private double prevalenceInPercent;

    public CountryYearPrevalence(){super();}

    public CountryYearPrevalence(CountryYear cy){
        this.countryName = cy.getCountryName();
        this.countryCode = cy.getCountryCode();
        this.year = cy.getYear();
        this.prevalenceInPercent = cy.getPrevalenceInPercent();
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
}
