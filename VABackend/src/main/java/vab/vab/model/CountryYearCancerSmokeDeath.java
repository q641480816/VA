package vab.vab.model;

import org.springframework.stereotype.Component;

@Component
public class CountryYearCancerSmokeDeath {

    private String countryName;

    private String countryCode;

    private String year;

    private double cancerDeathInPercent;

    public CountryYearCancerSmokeDeath(){super();}

    public CountryYearCancerSmokeDeath(CountryYear cy){
        this.countryName = cy.getCountryName();
        this.countryCode = cy.getCountryCode();
        this.year = cy.getYear();
        this.cancerDeathInPercent = cy.getCancerDeathInPercent();
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

    public double getCancerDeathInPercent() {
        return cancerDeathInPercent;
    }

    public void setCancerDeathInPercent(double cancerDeathInPercent) {
        this.cancerDeathInPercent = cancerDeathInPercent;
    }
}
