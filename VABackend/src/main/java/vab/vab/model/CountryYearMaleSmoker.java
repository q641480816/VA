package vab.vab.model;

import org.springframework.stereotype.Component;

@Component
public class CountryYearMaleSmoker {

    private String countryName;

    private String countryCode;

    private String year;

    private double maleInPercent;

    public CountryYearMaleSmoker(){super();}

    public CountryYearMaleSmoker(CountryYear cy) {
        this.countryName = cy.getCountryName();
        this.countryCode = cy.getCountryCode();
        this.year = cy.getYear();
        this.maleInPercent = cy.getMaleInPercent();
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

    public double getMaleInPercent() {
        return maleInPercent;
    }

    public void setMaleInPercent(double maleInPercent) {
        this.maleInPercent = maleInPercent;
    }
}
