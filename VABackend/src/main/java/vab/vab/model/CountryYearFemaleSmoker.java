package vab.vab.model;

import org.springframework.stereotype.Component;

@Component
public class CountryYearFemaleSmoker {

    private String countryName;

    private String countryCode;

    private String year;

    private double femaleInPercent;

    public CountryYearFemaleSmoker(){super();}

    public CountryYearFemaleSmoker(CountryYear cy){
        this.countryName = cy.getCountryName();
        this.countryCode = cy.getCountryCode();
        this.year = cy.getYear();
        this.femaleInPercent = cy.getFemaleInPercent();
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

    public double getFemaleInPercent() {
        return femaleInPercent;
    }

    public void setFemaleInPercent(double femaleInPercent) {
        this.femaleInPercent = femaleInPercent;
    }
}
